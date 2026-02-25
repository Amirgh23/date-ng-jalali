<template>
  <div class="app">
    <header class="header">
      <h1>Jalali Date Picker - Vue Integration Examples</h1>
      <p>Comprehensive examples of using the Jalali Date Picker Web Component in Vue 3</p>
    </header>

    <main class="main">
      <!-- Single Date Selection Example -->
      <section class="example">
        <h2>Single Date Selection</h2>
        <div class="example-content">
          <div class="picker-wrapper">
            <JalaliDatePickerVue
              v-model="singleDate"
              locale="fa"
              theme="light"
              selection-mode="single"
              @dateSelect="onSingleDateSelect"
            />
          </div>
          <div class="info">
            <p v-if="singleDate">
              <strong>Selected Date:</strong> {{ formatDate(singleDate) }}
            </p>
            <p v-else>No date selected</p>
          </div>
        </div>
      </section>

      <!-- Date Range Selection Example -->
      <section class="example">
        <h2>Date Range Selection</h2>
        <div class="example-content">
          <div class="picker-wrapper">
            <JalaliDatePickerVue
              v-model:modelRange="dateRange"
              locale="fa"
              theme="light"
              selection-mode="range"
              @rangeSelect="onRangeSelect"
            />
          </div>
          <div class="info">
            <p v-if="dateRange.start && dateRange.end">
              <strong>Range:</strong> {{ formatDate(dateRange.start) }} to
              {{ formatDate(dateRange.end) }}
            </p>
            <p v-else>No range selected</p>
          </div>
        </div>
      </section>

      <!-- Multiple Dates Selection Example -->
      <section class="example">
        <h2>Multiple Dates Selection</h2>
        <div class="example-content">
          <div class="picker-wrapper">
            <JalaliDatePickerVue
              v-model:modelDates="multipleDates"
              locale="fa"
              theme="light"
              selection-mode="multiple"
              @multipleSelect="onMultipleSelect"
            />
          </div>
          <div class="info">
            <p v-if="multipleDates.length > 0">
              <strong>Selected Dates ({{ multipleDates.length }}):</strong>
            </p>
            <ul v-if="multipleDates.length > 0">
              <li v-for="(date, index) in multipleDates" :key="index">
                {{ formatDate(date) }}
              </li>
            </ul>
            <p v-else>No dates selected</p>
          </div>
        </div>
      </section>

      <!-- Form Integration Example -->
      <section class="example">
        <h2>Form Integration</h2>
        <div class="example-content">
          <form @submit.prevent="handleFormSubmit">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div class="form-group">
              <label for="birth-date">Birth Date:</label>
              <JalaliDatePickerVue
                v-model="formData.birthDate"
                locale="fa"
                theme="light"
                selection-mode="single"
              />
            </div>

            <div class="form-group">
              <label for="event-date">Event Date:</label>
              <JalaliDatePickerVue
                v-model="formData.eventDate"
                locale="fa"
                theme="light"
                selection-mode="single"
              />
            </div>

            <button type="submit" class="submit-btn">Submit</button>
          </form>

          <div v-if="formSubmitted" class="form-result">
            <h3>Form Data:</h3>
            <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>
      </section>

      <!-- Locale Switching Example -->
      <section class="example">
        <h2>Locale Switching</h2>
        <div class="example-content">
          <div class="controls">
            <button
              :class="{ active: currentLocale === 'fa' }"
              @click="currentLocale = 'fa'"
            >
              فارسی
            </button>
            <button
              :class="{ active: currentLocale === 'en' }"
              @click="currentLocale = 'en'"
            >
              English
            </button>
          </div>

          <div class="picker-wrapper">
            <JalaliDatePickerVue
              v-model="localeDate"
              :locale="currentLocale"
              theme="light"
              selection-mode="single"
              @localeChange="onLocaleChange"
            />
          </div>

          <div class="info">
            <p v-if="localeDate">
              <strong>Current Locale:</strong> {{ currentLocale }}
            </p>
            <p v-if="localeDate">
              <strong>Selected Date:</strong> {{ formatDate(localeDate) }}
            </p>
          </div>
        </div>
      </section>

      <!-- Theme Switching Example -->
      <section class="example">
        <h2>Theme Switching</h2>
        <div class="example-content">
          <div class="controls">
            <button
              v-for="themeName in availableThemes"
              :key="themeName"
              :class="{ active: currentTheme === themeName }"
              @click="currentTheme = themeName"
            >
              {{ themeName }}
            </button>
          </div>

          <div class="picker-wrapper">
            <JalaliDatePickerVue
              v-model="themeDate"
              locale="fa"
              :theme="currentTheme"
              selection-mode="single"
              @themeChange="onThemeChange"
            />
          </div>

          <div class="info">
            <p>
              <strong>Current Theme:</strong> {{ currentTheme }}
            </p>
          </div>
        </div>
      </section>

      <!-- Controlled vs Uncontrolled Example -->
      <section class="example">
        <h2>Controlled vs Uncontrolled</h2>
        <div class="example-content">
          <div class="two-column">
            <div>
              <h3>Controlled Component</h3>
              <JalaliDatePickerVue
                v-model="controlledDate"
                locale="fa"
                theme="light"
                selection-mode="single"
              />
              <p v-if="controlledDate">
                Selected: {{ formatDate(controlledDate) }}
              </p>
            </div>

            <div>
              <h3>Uncontrolled Component</h3>
              <JalaliDatePickerVue
                ref="uncontrolledPicker"
                locale="fa"
                theme="light"
                selection-mode="single"
              />
              <button @click="getUncontrolledValue">Get Value</button>
              <p v-if="uncontrolledValue">
                Selected: {{ uncontrolledValue }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Handling Example -->
      <section class="example">
        <h2>Event Handling</h2>
        <div class="example-content">
          <div class="picker-wrapper">
            <JalaliDatePickerVue
              v-model="eventDate"
              locale="fa"
              theme="light"
              selection-mode="single"
              @dateSelect="onDateSelectEvent"
              @localeChange="onLocaleChangeEvent"
              @themeChange="onThemeChangeEvent"
              @error="onErrorEvent"
            />
          </div>

          <div class="events-log">
            <h3>Events Log:</h3>
            <div class="log-content">
              <p v-for="(event, index) in eventLog" :key="index" class="log-entry">
                {{ event }}
              </p>
            </div>
            <button @click="clearEventLog" class="clear-btn">Clear Log</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type {
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  LocaleChangeDetail,
  ThemeChangeDetail,
  DateRange,
} from './types';

// Single date selection
const singleDate = ref<Date | null>(null);

// Date range selection
const dateRange = ref<DateRange>({
  start: null,
  end: null,
});

// Multiple dates selection
const multipleDates = ref<Date[]>([]);

// Form data
const formData = ref({
  name: '',
  birthDate: null as Date | null,
  eventDate: null as Date | null,
});
const formSubmitted = ref(false);

// Locale switching
const currentLocale = ref<'fa' | 'en'>('fa');
const localeDate = ref<Date | null>(null);

// Theme switching
const currentTheme = ref('light');
const themeDate = ref<Date | null>(null);
const availableThemes = [
  'light',
  'dark',
  'glassmorphism',
  'minimal',
  'luxury',
  'neon',
];

// Controlled vs Uncontrolled
const controlledDate = ref<Date | null>(null);
const uncontrolledPicker = ref<any>(null);
const uncontrolledValue = ref<string>('');

// Event handling
const eventDate = ref<Date | null>(null);
const eventLog = ref<string[]>([]);

// Helper function to format dates
const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return date.toLocaleDateString(currentLocale.value === 'fa' ? 'fa-IR' : 'en-US');
};

// Event handlers
const onSingleDateSelect = (detail: DateSelectDetail) => {
  console.log('Single date selected:', detail);
};

const onRangeSelect = (detail: RangeSelectDetail) => {
  console.log('Range selected:', detail);
};

const onMultipleSelect = (detail: MultipleSelectDetail) => {
  console.log('Multiple dates selected:', detail);
};

const handleFormSubmit = () => {
  if (!formData.value.birthDate || !formData.value.eventDate) {
    alert('Please select both dates');
    return;
  }
  formSubmitted.value = true;
  console.log('Form submitted:', formData.value);
};

const onLocaleChange = (detail: LocaleChangeDetail) => {
  console.log('Locale changed:', detail);
};

const onThemeChange = (detail: ThemeChangeDetail) => {
  console.log('Theme changed:', detail);
};

const getUncontrolledValue = () => {
  if (uncontrolledPicker.value) {
    uncontrolledValue.value = uncontrolledPicker.value.getValue();
  }
};

const onDateSelectEvent = (detail: DateSelectDetail) => {
  addEventLog(`dateSelect: ${detail.jalaliDate}`);
};

const onLocaleChangeEvent = (detail: LocaleChangeDetail) => {
  addEventLog(`localeChange: ${detail.locale}`);
};

const onThemeChangeEvent = (detail: ThemeChangeDetail) => {
  addEventLog(`themeChange: ${detail.theme}`);
};

const onErrorEvent = (error: Error) => {
  addEventLog(`error: ${error.message}`);
};

const addEventLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`[${timestamp}] ${message}`);
  if (eventLog.value.length > 10) {
    eventLog.value.pop();
  }
};

const clearEventLog = () => {
  eventLog.value = [];
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.example {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.example h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.example-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
}

.picker-wrapper {
  display: flex;
  justify-content: center;
}

.info {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info p {
  margin: 10px 0;
  color: #333;
}

.info ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.info li {
  padding: 8px 0;
  color: #555;
  border-bottom: 1px solid #ddd;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.controls button {
  padding: 10px 20px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.controls button:hover {
  background: #667eea;
  color: white;
}

.controls button.active {
  background: #667eea;
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.submit-btn {
  padding: 12px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.form-result {
  margin-top: 20px;
  padding: 20px;
  background: #f0f4ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.form-result h3 {
  margin-top: 0;
  color: #333;
}

.form-result pre {
  background: white;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  color: #333;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.two-column h3 {
  margin-top: 0;
  color: #333;
}

.two-column button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.two-column button:hover {
  background: #764ba2;
}

.events-log {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.events-log h3 {
  margin-top: 0;
  color: #333;
}

.log-content {
  background: white;
  padding: 15px;
  border-radius: 6px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.log-entry {
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  color: #555;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.clear-btn {
  padding: 8px 16px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #ff5252;
}

@media (max-width: 768px) {
  .example-content {
    grid-template-columns: 1fr;
  }

  .two-column {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .example {
    padding: 20px;
  }
}
</style>
