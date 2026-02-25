/**
 * Vanilla JavaScript Example Application
 * Demonstrates comprehensive usage of Jalali Date Picker Web Component
 * without any framework dependencies
 */

// ============================================================================
// State Management
// ============================================================================

const AppState = {
  locale: 'fa',
  theme: 'light',
  calendarType: 'jalali',
  totalSelections: 0,
  eventCount: 0,

  update(key, value) {
    this[key] = value;
    this.totalSelections++;
    this.updateStateDisplay();
  },

  updateStateDisplay() {
    document.getElementById('state-locale').textContent = this.locale;
    document.getElementById('state-theme').textContent = this.theme;
    document.getElementById('state-calendar').textContent = this.calendarType;
    document.getElementById('state-selections').textContent = this.totalSelections;
  }
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format date for display
 */
function formatDate(date, locale = 'fa') {
  if (!date) return 'No date selected';
  return date.toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US');
}

/**
 * Calculate days between two dates
 */
function daysBetween(start, end) {
  if (!start || !end) return 0;
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((end - start) / msPerDay);
}

/**
 * Add days to a date
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get random date within a range
 */
function getRandomDate(start = new Date(2020, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Log event to event log
 */
function logEvent(eventType, message, type = 'info') {
  const eventLog = document.getElementById('event-log');
  const entry = document.createElement('div');
  entry.className = `event-log-entry ${type}`;

  const timestamp = new Date().toLocaleTimeString();
  entry.innerHTML = `
    <span class="timestamp">[${timestamp}]</span>
    <span class="event-type">${eventType}:</span>
    ${message}
  `;

  eventLog.insertBefore(entry, eventLog.firstChild);

  // Keep only last 50 entries
  while (eventLog.children.length > 50) {
    eventLog.removeChild(eventLog.lastChild);
  }

  AppState.eventCount++;
}

// ============================================================================
// Single Date Selection Example
// ============================================================================

function initSingleDateExample() {
  const picker = document.getElementById('single-picker');

  picker.addEventListener('dateSelect', (event) => {
    const { date, jalaliDate, gregorianDate } = event.detail;

    document.getElementById('single-date-display').textContent = formatDate(date);
    document.getElementById('single-iso-display').textContent = date.toISOString();
    document.getElementById('single-jalali-display').textContent = jalaliDate;
    document.getElementById('single-gregorian-display').textContent = gregorianDate;

    logEvent('dateSelect', `Date selected: ${formatDate(date)}`, 'success');
    AppState.update('lastSingleDate', date);
  });

  document.getElementById('single-reset-btn').addEventListener('click', () => {
    picker.reset();
    document.getElementById('single-date-display').textContent = 'No date selected';
    document.getElementById('single-iso-display').textContent = '-';
    document.getElementById('single-jalali-display').textContent = '-';
    document.getElementById('single-gregorian-display').textContent = '-';
    logEvent('reset', 'Single date picker reset', 'info');
  });
}

// ============================================================================
// Range Selection Example
// ============================================================================

function initRangeSelectionExample() {
  const picker = document.getElementById('range-picker');

  picker.addEventListener('rangeSelect', (event) => {
    const { range } = event.detail;
    const { start, end } = range;

    document.getElementById('range-start-display').textContent = formatDate(start);
    document.getElementById('range-end-display').textContent = formatDate(end);

    const duration = daysBetween(start, end);
    document.getElementById('range-duration-display').textContent = duration;

    logEvent('rangeSelect', `Range selected: ${formatDate(start)} to ${formatDate(end)}`, 'success');
    AppState.update('lastRange', range);
  });

  document.getElementById('range-reset-btn').addEventListener('click', () => {
    picker.reset();
    document.getElementById('range-start-display').textContent = 'No date selected';
    document.getElementById('range-end-display').textContent = 'No date selected';
    document.getElementById('range-duration-display').textContent = '-';
    logEvent('reset', 'Range picker reset', 'info');
  });
}

// ============================================================================
// Multiple Dates Selection Example
// ============================================================================

function initMultipleDatesExample() {
  const picker = document.getElementById('multiple-picker');

  picker.addEventListener('multipleSelect', (event) => {
    const { dates } = event.detail;

    document.getElementById('multiple-count-display').textContent = dates.length;

    const datesList = document.getElementById('multiple-dates-list');
    datesList.innerHTML = '';

    dates.forEach((date, index) => {
      const tag = document.createElement('div');
      tag.className = 'date-tag';
      tag.innerHTML = `
        ${formatDate(date)}
        <button class="remove-btn" data-index="${index}">×</button>
      `;

      tag.querySelector('.remove-btn').addEventListener('click', () => {
        picker.removeDate(date);
      });

      datesList.appendChild(tag);
    });

    logEvent('multipleSelect', `${dates.length} date(s) selected`, 'success');
    AppState.update('lastMultipleDates', dates);
  });

  document.getElementById('multiple-reset-btn').addEventListener('click', () => {
    picker.reset();
    document.getElementById('multiple-count-display').textContent = '0';
    document.getElementById('multiple-dates-list').innerHTML = '';
    logEvent('reset', 'Multiple dates picker reset', 'info');
  });
}

// ============================================================================
// Programmatic Control Example
// ============================================================================

function initProgrammaticControlExample() {
  const picker = document.getElementById('control-picker');
  const output = document.getElementById('control-output');

  function updateOutput(message) {
    output.innerHTML = `<p>${message}</p>`;
    logEvent('programmatic', message, 'info');
  }

  document.getElementById('set-today-btn').addEventListener('click', () => {
    const today = new Date();
    picker.setDate(today);
    updateOutput(`✓ Set to today: ${formatDate(today)}`);
  });

  document.getElementById('set-next-week-btn').addEventListener('click', () => {
    const nextWeek = addDays(new Date(), 7);
    picker.setDate(nextWeek);
    updateOutput(`✓ Set to next week: ${formatDate(nextWeek)}`);
  });

  document.getElementById('set-next-month-btn').addEventListener('click', () => {
    const nextMonth = addDays(new Date(), 30);
    picker.setDate(nextMonth);
    updateOutput(`✓ Set to next month: ${formatDate(nextMonth)}`);
  });

  document.getElementById('set-range-btn').addEventListener('click', () => {
    const start = new Date();
    const end = addDays(start, 30);
    picker.setRange(start, end);
    updateOutput(`✓ Set range: ${formatDate(start)} to ${formatDate(end)}`);
  });

  document.getElementById('add-date-btn').addEventListener('click', () => {
    const randomDate = getRandomDate();
    picker.addDate(randomDate);
    updateOutput(`✓ Added date: ${formatDate(randomDate)}`);
  });

  document.getElementById('remove-date-btn').addEventListener('click', () => {
    const dates = picker.selectedDates;
    if (dates.length > 0) {
      const lastDate = dates[dates.length - 1];
      picker.removeDate(lastDate);
      updateOutput(`✓ Removed date: ${formatDate(lastDate)}`);
    } else {
      updateOutput('No dates to remove');
    }
  });

  picker.addEventListener('multipleSelect', (event) => {
    const { dates } = event.detail;
    output.innerHTML = `<p><strong>Selected ${dates.length} date(s):</strong></p>
      <ul>${dates.map(d => `<li>${formatDate(d)}</li>`).join('')}</ul>`;
  });
}

// ============================================================================
// Event Handling Example
// ============================================================================

function initEventHandlingExample() {
  const picker = document.getElementById('event-picker');

  // Listen to all events
  picker.addEventListener('dateSelect', (event) => {
    logEvent('dateSelect', JSON.stringify(event.detail), 'success');
  });

  picker.addEventListener('rangeSelect', (event) => {
    logEvent('rangeSelect', JSON.stringify(event.detail), 'success');
  });

  picker.addEventListener('multipleSelect', (event) => {
    logEvent('multipleSelect', `${event.detail.dates.length} dates selected`, 'success');
  });

  picker.addEventListener('localeChange', (event) => {
    logEvent('localeChange', `Locale changed to: ${event.detail.locale}`, 'info');
  });

  picker.addEventListener('themeChange', (event) => {
    logEvent('themeChange', `Theme changed to: ${event.detail.theme}`, 'info');
  });

  document.getElementById('clear-log-btn').addEventListener('click', () => {
    document.getElementById('event-log').innerHTML = '';
    logEvent('clear', 'Event log cleared', 'info');
  });
}

// ============================================================================
// State Management Example
// ============================================================================

function initStateManagementExample() {
  const picker = document.getElementById('state-picker');

  picker.addEventListener('dateSelect', (event) => {
    AppState.update('lastStateDate', event.detail.date);
  });

  picker.addEventListener('localeChange', (event) => {
    AppState.update('locale', event.detail.locale);
  });

  picker.addEventListener('themeChange', (event) => {
    AppState.update('theme', event.detail.theme);
  });
}

// ============================================================================
// Form Integration Example
// ============================================================================

function initFormIntegrationExample() {
  const form = document.getElementById('date-form');
  const formOutput = document.getElementById('form-output');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('form-name').value;
    const birthDatePicker = document.getElementById('form-date');
    const travelDatesPicker = document.getElementById('form-range');

    const birthDate = birthDatePicker.selectedDate;
    const travelRange = travelDatesPicker.selectedRange;

    if (!name || !birthDate) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = {
      name,
      birthDate: formatDate(birthDate),
      birthDateISO: birthDate.toISOString(),
      travelStart: travelRange.start ? formatDate(travelRange.start) : null,
      travelEnd: travelRange.end ? formatDate(travelRange.end) : null,
      submittedAt: new Date().toLocaleString()
    };

    formOutput.classList.add('show');
    formOutput.innerHTML = `
      <h4>Form Data Submitted</h4>
      <pre>${JSON.stringify(formData, null, 2)}</pre>
    `;

    logEvent('formSubmit', `Form submitted by ${name}`, 'success');
  });

  form.addEventListener('reset', () => {
    formOutput.classList.remove('show');
    logEvent('formReset', 'Form reset', 'info');
  });
}

// ============================================================================
// Global Settings
// ============================================================================

function initGlobalSettings() {
  const localeSelect = document.getElementById('locale-select');
  const themeSelect = document.getElementById('theme-select');
  const calendarTypeSelect = document.getElementById('calendar-type-select');

  const pickers = document.querySelectorAll('jalali-date-picker');

  localeSelect.addEventListener('change', (event) => {
    const locale = event.target.value;
    AppState.update('locale', locale);

    pickers.forEach(picker => {
      picker.locale = locale;
    });

    logEvent('settingChange', `Locale changed to: ${locale}`, 'info');
  });

  themeSelect.addEventListener('change', (event) => {
    const theme = event.target.value;
    AppState.update('theme', theme);

    pickers.forEach(picker => {
      picker.theme = theme;
    });

    logEvent('settingChange', `Theme changed to: ${theme}`, 'info');
  });

  calendarTypeSelect.addEventListener('change', (event) => {
    const calendarType = event.target.value;
    AppState.update('calendarType', calendarType);

    pickers.forEach(picker => {
      picker.calendarType = calendarType;
    });

    logEvent('settingChange', `Calendar type changed to: ${calendarType}`, 'info');
  });
}

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize all examples when DOM is ready
 */
function initializeApp() {
  console.log('Initializing Jalali Date Picker Vanilla JS Examples...');

  // Initialize state display
  AppState.updateStateDisplay();

  // Initialize all examples
  initSingleDateExample();
  initRangeSelectionExample();
  initMultipleDatesExample();
  initProgrammaticControlExample();
  initEventHandlingExample();
  initStateManagementExample();
  initFormIntegrationExample();
  initGlobalSettings();

  logEvent('init', 'Application initialized successfully', 'success');
  console.log('✓ All examples initialized');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// ============================================================================
// Export for testing (if needed)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AppState,
    formatDate,
    daysBetween,
    addDays,
    getRandomDate,
    logEvent
  };
}
