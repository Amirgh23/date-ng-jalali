import {
  Component,
  DestroyRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  DatePickerValue,
  DateRange,
  DayInfo,
  SelectionMode,
} from '../../core/models/jalali-date.model';
import { ColorPalette, ThemeConfig } from '../../core/models/theme.model';
import { JalaliDateService } from '../../core/services/jalali-date.service';
import { ThemeService } from '../../core/services/theme.service';

import { JalaliCalendarComponent } from '../calendar/jalali-calendar.component';
import { CalendarSwitchComponent } from '../calendar-switch/calendar-switch.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { DayInfoModalComponent } from '../day-info-modal/day-info-modal.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'jalali-date-picker',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JalaliDatePickerComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    CalendarSwitchComponent,
    ColorPickerComponent,
    ThemeSelectorComponent,
    JalaliCalendarComponent,
    DayInfoModalComponent,
  ],
  template: `
    <div
      class="jalali-date-picker date-picker-container"
      [attr.data-theme]="currentTheme?.name"
      [style.--primary-color]="currentPalette?.primary"
      [style.--secondary-color]="currentPalette?.secondary"
      [style.--accent-color]="currentPalette?.accent"
      [style.--background]="currentPalette?.background"
      [style.--text-color]="currentPalette?.text"
      [style.--border-color]="currentPalette?.border"
      [style.--background-light]="backgroundLight"
      [style.--text-muted]="textMuted">
      <!-- input field -->
      <div class="date-input-container">
        <input
          type="text"
          class="date-input"
          [value]="formattedDate"
          placeholder="انتخاب تاریخ"
          (click)="openCalendar()"
          (focus)="openCalendar()"
          [disabled]="isDisabled"
          readonly />
        <button class="date-input-btn" (click)="toggleCalendar()">📅</button>
      </div>

      <!-- calendar popup -->
      <div class="calendar-popup" [class.visible]="isCalendarVisible">
        <!-- calendar switch -->
        <div class="calendar-header">
          <jalali-calendar-switch
            [calendarType]="calendarType"
            (calendarChange)="onCalendarChange($event)"></jalali-calendar-switch>

          <button class="theme-btn" (click)="toggleThemeSelector()">🎨</button>
        </div>

        <!-- theme selector -->
        <div class="theme-panel" [class.visible]="isThemeSelectorVisible">
          <jalali-theme-selector></jalali-theme-selector>
          <jalali-color-picker></jalali-color-picker>
        </div>

        <!-- calendar -->
        <jalali-calendar
          [calendarType]="calendarType"
          [selectedDate]="selectedDate"
          [selectionMode]="selectionMode"
          [selectedRange]="selectedRange"
          [selectedDates]="selectedDates"
          [minDate]="minDate"
          [maxDate]="maxDate"
          (dateSelect)="onDateSelect($event)"
          (monthChange)="onMonthChange($event)"></jalali-calendar>

        <!-- day info modal -->
        <jalali-day-info-modal
          *ngIf="selectedDayInfo"
          [dayInfo]="selectedDayInfo"
          (closed)="selectedDayInfo = null"></jalali-day-info-modal>
      </div>
    </div>
  `,
  styles: [
    `
      .date-picker-container {
        position: relative;
        display: inline-block;
        width: 100%;
        max-width: 300px;
      }

      .date-input-container {
        position: relative;
      }

      .date-input {
        width: 100%;
        padding: 12px 40px 12px 16px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--background);
        color: var(--text-color);
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .date-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .date-input-btn {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        background: var(--background-light);
        border: none;
        border-radius: 6px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-color);
        transition: all 0.2s;
      }

      .date-input-btn:hover {
        background: var(--secondary-color);
        color: white;
      }

      .calendar-popup {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 8px;
        background: var(--background);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 100;
        min-width: 320px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
      }

      .calendar-popup.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--border-color);
      }

      .theme-btn {
        background: var(--background-light);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-color);
        transition: all 0.2s;
      }

      .theme-btn:hover {
        background: var(--secondary-color);
        color: white;
        border-color: var(--secondary-color);
      }

      .theme-panel {
        padding: 16px;
        border-top: 1px solid var(--border-color);
        max-height: 200px;
        overflow-y: auto;
        opacity: 0;
        visibility: hidden;
        max-height: 0;
        transition: all 0.3s ease;
      }

      .theme-panel.visible {
        opacity: 1;
        visibility: visible;
        max-height: 200px;
      }

      @media (max-width: 600px) {
        .date-picker-container {
          max-width: 100%;
        }

        .calendar-popup {
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
          min-width: 90vw;
          max-width: 90vw;
        }

        .calendar-popup.visible {
          transform: translateX(-50%) translateY(0);
        }
      }

      @media (max-width: 600px) {
        .calendar-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          max-height: 80vh;
          overflow-y: auto;
          z-index: 1000;
        }

        .calendar-popup.visible {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `,
  ],
})
export class JalaliDatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() selectedDate: Date;
  @Input() selectionMode: SelectionMode = 'single';
  @Input() selectedRange: DateRange | null = null;
  @Input() selectedDates: Date[] = [];
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  @Output() dateSelect = new EventEmitter<Date>();
  @Output() rangeSelect = new EventEmitter<DateRange>();
  @Output() multipleSelect = new EventEmitter<Date[]>();
  @Output() calendarTypeChange = new EventEmitter<'jalali' | 'gregorian' | 'hijri'>();

  isCalendarVisible = false;
  isThemeSelectorVisible = false;
  calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  selectedDayInfo: DayInfo;

  isDisabled = false;

  currentTheme: ThemeConfig;
  currentPalette: ColorPalette;

  private readonly destroyRef = inject(DestroyRef);
  private onChange: (value: DatePickerValue) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private jalaliDateService: JalaliDateService,
    private themeService: ThemeService
  ) {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.currentPalette = this.themeService.getCurrentPalette();

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.currentTheme = theme;
      });

    this.themeService.colorPalette$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(palette => {
        this.currentPalette = palette;
      });
  }

  get backgroundLight(): string {
    return this.currentTheme?.isDark ? '#374151' : '#f8fafc';
  }

  get textMuted(): string {
    return this.currentTheme?.isDark ? '#9ca3af' : '#6b7280';
  }

  ngOnInit() {
    if (!this.selectedDate) {
      this.selectedDate = this.jalaliDateService.today();
    }

    if (this.selectionMode === 'range' && !this.selectedRange) {
      this.selectedRange = { start: null, end: null };
    }

    if (this.selectionMode === 'multiple' && !this.selectedDates) {
      this.selectedDates = [];
    }
  }

  // ControlValueAccessor
  writeValue(value: DatePickerValue): void {
    if (this.selectionMode === 'range') {
      if (value && typeof value === 'object' && !Array.isArray(value) && 'start' in value && 'end' in value) {
        this.selectedRange = value as DateRange;
      } else {
        this.selectedRange = { start: null, end: null };
      }
      return;
    }

    if (this.selectionMode === 'multiple') {
      this.selectedDates = Array.isArray(value) ? (value as Date[]) : [];
      return;
    }

    this.selectedDate = value instanceof Date ? value : this.jalaliDateService.today();
  }

  registerOnChange(fn: (value: DatePickerValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.isCalendarVisible = false;
      this.isThemeSelectorVisible = false;
    }
  }

  get formattedDate(): string {
    if (this.selectionMode === 'range') {
      const start = this.selectedRange?.start;
      const end = this.selectedRange?.end;
      if (start && end) {
        return `${this.formatForCurrentCalendar(start)} - ${this.formatForCurrentCalendar(end)}`;
      }
      if (start) {
        return `از ${this.formatForCurrentCalendar(start)} ...`;
      }
      return '';
    }

    if (this.selectionMode === 'multiple') {
      const count = (this.selectedDates || []).length;
      if (count === 0) return '';
      if (count === 1) return this.formatForCurrentCalendar(this.selectedDates[0]);
      return `${count} تاریخ انتخاب شده`;
    }

    if (!this.selectedDate) return '';
    return this.formatForCurrentCalendar(this.selectedDate);
  }

  private formatForCurrentCalendar(date: Date): string {
    if (this.calendarType === 'jalali') {
      return this.jalaliDateService.gregorianToJalali(date).formatted;
    }

    if (this.calendarType === 'hijri') {
      return this.jalaliDateService.gregorianToHijri(date).formatted;
    }

    return date.toLocaleDateString('fa-IR');
  }

  toggleCalendar() {
    if (this.isDisabled) return;
    this.isCalendarVisible = !this.isCalendarVisible;
    if (this.isCalendarVisible) {
      this.isThemeSelectorVisible = false;
    }
  }

  openCalendar() {
    if (this.isDisabled) return;
    this.isCalendarVisible = true;
    this.isThemeSelectorVisible = false;
  }

  toggleThemeSelector() {
    if (this.isDisabled) return;
    this.isThemeSelectorVisible = !this.isThemeSelectorVisible;
  }

  onCalendarChange(type: 'jalali' | 'gregorian' | 'hijri') {
    this.calendarType = type;
    this.calendarTypeChange.emit(type);
  }

  onDateSelect(date: Date) {
    if (this.selectionMode === 'range') {
      const range = this.selectedRange ?? { start: null, end: null };

      if (!range.start || (range.start && range.end)) {
        this.selectedRange = { start: date, end: null };
        return;
      }

      const start = range.start;
      const end = date;
      const normalized: DateRange =
        start.getTime() <= end.getTime() ? { start, end } : { start: end, end: start };

      this.selectedRange = normalized;
      this.rangeSelect.emit(normalized);
      this.onChange(normalized);
      this.onTouched();
      this.isCalendarVisible = false;
      return;
    }

    if (this.selectionMode === 'multiple') {
      const prev = this.selectedDates ?? [];
      const exists = prev.some(d => this.jalaliDateService.isSameDay(d, date));
      const next = exists ? prev.filter(d => !this.jalaliDateService.isSameDay(d, date)) : [...prev, date];
      this.selectedDates = next;
      this.multipleSelect.emit(next);
      this.onChange(next);
      return;
    }

    this.selectedDate = date;
    this.selectedDayInfo = this.jalaliDateService.getDayInfo(date);
    this.dateSelect.emit(date);
    this.onChange(date);
    this.onTouched();
    this.isCalendarVisible = false;
  }

  onMonthChange(event: { year: number; month: number }) {
    console.log('Month changed:', event);
  }

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.date-picker-container')) {
      this.isCalendarVisible = false;
      this.isThemeSelectorVisible = false;
      this.onTouched();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isCalendarVisible || this.isThemeSelectorVisible) {
      this.onClickOutside(event);
    }
  }
}
