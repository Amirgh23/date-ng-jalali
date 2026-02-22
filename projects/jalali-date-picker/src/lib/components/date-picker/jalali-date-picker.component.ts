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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { DatePickerPassThroughOptions, PassThroughMethodOptions, CalendarPassThroughOptions, PassThroughType, PassThroughElementOptions } from '../../core/models/pass-through.model';
import { JalaliDateService } from '../../core/services/jalali-date.service';
import { ThemeService } from '../../core/services/theme.service';
import { StyleClassService } from '../../core/services/style-class.service';

import { JalaliCalendarComponent } from '../calendar/jalali-calendar.component';
import { CalendarSwitchComponent } from '../calendar-switch/calendar-switch.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { DayInfoModalComponent } from '../day-info-modal/day-info-modal.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'jalali-date-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      [class]="getRootClasses()"
      [ngStyle]="getRootStyles()"
      [attr.data-theme]="currentTheme?.name"
      [style.--primary-color]="currentPalette?.primary"
      [style.--secondary-color]="currentPalette?.secondary"
      [style.--accent-color]="currentPalette?.accent"
      [style.--background]="currentPalette?.background"
      [style.--text-color]="currentPalette?.text"
      [style.--border-color]="currentPalette?.border"
      [style.--background-light]="backgroundLight"
      [style.--text-muted]="textMuted">
      
      <!-- Input Container -->
      <div class="jdp-date-picker-input-container">
        <label [attr.id]="'date-picker-label'" class="sr-only">
          انتخاب تاریخ
        </label>
        
        <!-- Input Field -->
        <input
          type="text"
          [class]="getInputClasses()"
          [ngStyle]="getInputStyles()"
          [value]="formattedDate"
          [placeholder]="placeholder"
          (click)="openCalendar()"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="handleInputKeydown($event)"
          [disabled]="disabled || isDisabled"
          readonly
          [attr.aria-label]="'انتخاب تاریخ'"
          [attr.aria-labelledby]="'date-picker-label'"
          [attr.aria-expanded]="isCalendarVisible"
          [attr.aria-controls]="isCalendarVisible ? 'calendar-popup' : null"
          [attr.aria-describedby]="'date-picker-help'" />
        
        <span id="date-picker-help" class="sr-only">
          برای انتخاب تاریخ، روی دکمه کلیک کنید یا Enter را فشار دهید
        </span>
        
        <!-- Calendar Button -->
        <button 
          type="button"
          [class]="getButtonClasses()"
          [ngStyle]="getButtonStyles()"
          (click)="toggleCalendar()"
          (keydown.enter)="toggleCalendar()"
          (keydown.space)="toggleCalendar()"
          [disabled]="disabled || isDisabled"
          [attr.aria-label]="'باز کردن تقویم'"
          [attr.aria-pressed]="isCalendarVisible">
          📅
        </button>
      </div>

      <!-- Calendar Popup Panel -->
      <div 
        [class]="getPanelClasses()"
        [ngStyle]="getPanelStyles()"
        [attr.id]="'calendar-popup'"
        role="dialog"
        [attr.aria-label]="'تقویم تاریخ'"
        [attr.aria-modal]="isCalendarVisible">
        
        <!-- Calendar Header -->
        <div class="jdp-date-picker-panel-header">
          <jalali-calendar-switch
            [calendarType]="calendarType"
            (calendarChange)="onCalendarChange($event)"
            [attr.aria-label]="'انتخاب نوع تقویم'">
          </jalali-calendar-switch>

          <button 
            type="button"
            class="jdp-date-picker-theme-button"
            (click)="toggleThemeSelector()"
            (keydown.enter)="toggleThemeSelector()"
            (keydown.space)="toggleThemeSelector()"
            [attr.aria-label]="'انتخاب تم'"
            [attr.aria-pressed]="isThemeSelectorVisible">
            🎨
          </button>
        </div>

        <!-- Theme Panel -->
        @if (isThemeSelectorVisible) {
          <div 
            class="jdp-date-picker-theme-panel"
            role="region"
            [attr.aria-label]="'انتخاب تم و رنگ'">
            <jalali-theme-selector></jalali-theme-selector>
            <jalali-color-picker></jalali-color-picker>
          </div>
        }

        <!-- Calendar Component -->
        <jalali-calendar
          [calendarType]="calendarType"
          [selectedDate]="selectedDate"
          [selectionMode]="selectionMode"
          [selectedRange]="selectedRange"
          [selectedDates]="selectedDates"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [pt]="getCalendarPT()"
          [unstyled]="unstyled"
          (dateSelect)="onDateSelect($event)"
          (monthChange)="onMonthChange($event)"
          role="grid"
          [attr.aria-label]="'تقویم'">
        </jalali-calendar>

        <!-- Day Info Modal -->
        @if (selectedDayInfo) {
          <jalali-day-info-modal
            [dayInfo]="selectedDayInfo"
            (closed)="selectedDayInfo = null"
            role="dialog"
            [attr.aria-label]="'اطلاعات روز'">
          </jalali-day-info-modal>
        }
      </div>
    </div>
  `,
  styles: [
    `
      /* Screen Reader Only */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      /* Root Container */
      .jdp-date-picker {
        position: relative;
        display: inline-block;
        width: 100%;
        font-family: Arial, sans-serif;
      }

      /* Input Container */
      .jdp-date-picker-input-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      /* Input Field */
      .jdp-date-picker-input {
        width: 100%;
        padding: 12px 50px 12px 16px;
        border: 2px solid var(--border-color, #e5e7eb);
        border-radius: 8px;
        background: var(--background, #ffffff);
        color: var(--text-color, #1f2937);
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }

      .jdp-date-picker-input:hover {
        border-color: var(--primary-color, #3b82f6);
      }

      .jdp-date-picker-input:focus {
        outline: none;
        border-color: var(--primary-color, #3b82f6);
        box-shadow: 0 0 0 3px var(--primary-color, rgba(59, 130, 246, 0.1));
      }

      .jdp-date-picker-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--background-light, #f9fafb);
      }

      /* Calendar Button */
      .jdp-date-picker-button {
        position: absolute;
        left: 8px;
        background: var(--background-light, #f9fafb);
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 6px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-color, #1f2937);
        transition: all 0.2s;
        font-size: 18px;
      }

      .jdp-date-picker-button:hover {
        background: var(--primary-color, #3b82f6);
        color: var(--background, white);
        border-color: var(--primary-color, #3b82f6);
      }

      .jdp-date-picker-button:focus {
        outline: 2px solid var(--primary-color, #3b82f6);
        outline-offset: 2px;
      }

      .jdp-date-picker-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Calendar Popup Panel */
      .jdp-date-picker-panel {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: var(--background, #ffffff);
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        min-width: 400px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        padding: 16px;
      }

      .jdp-date-picker-panel--visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      /* Panel Header */
      .jdp-date-picker-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--border-color, #e5e7eb);
      }

      /* Theme Button */
      .jdp-date-picker-theme-button {
        background: var(--background-light, #f9fafb);
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 6px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-color, #1f2937);
        transition: all 0.2s;
        font-size: 18px;
      }

      .jdp-date-picker-theme-button:hover {
        background: var(--secondary-color, #6366f1);
        color: var(--background, white);
        border-color: var(--secondary-color, #6366f1);
      }

      .jdp-date-picker-theme-button:focus {
        outline: 2px solid var(--primary-color, #3b82f6);
        outline-offset: 2px;
      }

      /* Theme Panel */
      .jdp-date-picker-theme-panel {
        padding: 12px;
        margin-bottom: 12px;
        background: var(--background-light, #f9fafb);
        border-radius: 8px;
        border: 1px solid var(--border-color, #e5e7eb);
        max-height: 400px;
        overflow-y: auto;
        
        /* Custom Scrollbar */
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color, #3b82f6) var(--background-light, #f9fafb);
      }
      
      .jdp-date-picker-theme-panel::-webkit-scrollbar {
        width: 8px;
      }
      
      .jdp-date-picker-theme-panel::-webkit-scrollbar-track {
        background: var(--background-light, #f9fafb);
        border-radius: 4px;
      }
      
      .jdp-date-picker-theme-panel::-webkit-scrollbar-thumb {
        background: var(--primary-color, #3b82f6);
        border-radius: 4px;
        transition: background 0.2s;
      }
      
      .jdp-date-picker-theme-panel::-webkit-scrollbar-thumb:hover {
        background: var(--secondary-color, #6366f1);
      }

      /* Responsive */
      @media (max-width: 600px) {
        .jdp-date-picker {
          max-width: 100%;
        }

        .jdp-date-picker-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          right: auto;
          transform: translate(-50%, -50%) scale(0.9);
          min-width: 90vw;
          max-width: 90vw;
          max-height: 80vh;
          overflow-y: auto;
        }

        .jdp-date-picker-panel--visible {
          transform: translate(-50%, -50%) scale(1);
        }
      }
      
      /* Theme-Specific Styles */
      
      /* HUD Theme */
      [data-theme="hud"] .jdp-date-picker-panel {
        background: rgba(0, 20, 40, 0.95);
        border: 2px solid var(--primary-color, #00ff88);
        box-shadow: 0 0 30px var(--primary-color, #00ff88), inset 0 0 20px rgba(0, 255, 136, 0.1);
      }
      
      [data-theme="hud"] .jdp-date-picker-input {
        background: rgba(0, 20, 40, 0.8);
        border: 2px solid var(--primary-color, #00ff88);
        color: var(--primary-color, #00ff88);
        text-shadow: 0 0 5px var(--primary-color, #00ff88);
      }
      
      [data-theme="hud"] .jdp-date-picker-button {
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid var(--primary-color, #00ff88);
        box-shadow: 0 0 10px var(--primary-color, #00ff88);
      }
      
      /* Neon Theme */
      [data-theme="neon"] .jdp-date-picker-panel {
        background: #0a0a0a;
        border: 2px solid var(--primary-color, #ff00ff);
        box-shadow: 0 0 20px var(--primary-color, #ff00ff), 0 0 40px var(--secondary-color, #00ffff);
      }
      
      [data-theme="neon"] .jdp-date-picker-input {
        background: #0a0a0a;
        border: 2px solid var(--primary-color, #ff00ff);
        color: var(--primary-color, #ff00ff);
        text-shadow: 0 0 8px var(--primary-color, #ff00ff);
      }
      
      [data-theme="neon"] .jdp-date-picker-button {
        background: rgba(255, 0, 255, 0.1);
        border: 2px solid var(--primary-color, #ff00ff);
        box-shadow: 0 0 15px var(--primary-color, #ff00ff);
      }
      
      /* Glassmorphism Theme */
      [data-theme="glassmorphism"] .jdp-date-picker-panel {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      [data-theme="glassmorphism"] .jdp-date-picker-input {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      /* Sci-Fi Theme */
      [data-theme="sci-fi"] .jdp-date-picker-panel,
      [data-theme="scifi"] .jdp-date-picker-panel {
        background: linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(0, 40, 80, 0.95));
        border: 2px solid var(--primary-color, #00d4ff);
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1);
      }
      
      [data-theme="sci-fi"] .jdp-date-picker-input,
      [data-theme="scifi"] .jdp-date-picker-input {
        background: rgba(0, 20, 40, 0.8);
        border: 2px solid var(--primary-color, #00d4ff);
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
      }
      
      /* Terminal Theme */
      [data-theme="terminal"] .jdp-date-picker-panel {
        background: #000000;
        border: 2px solid var(--primary-color, #00ff00);
        font-family: 'Courier New', monospace;
      }
      
      [data-theme="terminal"] .jdp-date-picker-input {
        background: #000000;
        border: 2px solid var(--primary-color, #00ff00);
        color: var(--primary-color, #00ff00);
        font-family: 'Courier New', monospace;
      }
      
      /* Gradient Theme */
      [data-theme="gradient"] .jdp-date-picker-panel {
        background: linear-gradient(135deg, var(--primary-color, #667eea) 0%, var(--secondary-color, #764ba2) 100%);
        border: none;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
      }
      
      [data-theme="gradient"] .jdp-date-picker-input {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border: 2px solid var(--primary-color, #667eea);
      }
      
      /* Luxury Theme */
      [data-theme="luxury"] .jdp-date-picker-panel {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 2px solid var(--accent-color, #d4af37);
        box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
      }
      
      [data-theme="luxury"] .jdp-date-picker-input {
        background: rgba(26, 26, 46, 0.8);
        border: 2px solid var(--accent-color, #d4af37);
        color: var(--accent-color, #d4af37);
      }
      
      /* Win95 Theme */
      [data-theme="win95"] .jdp-date-picker-panel {
        background: #c0c0c0;
        border: 2px outset #ffffff;
        box-shadow: none;
        border-radius: 0;
      }
      
      [data-theme="win95"] .jdp-date-picker-input {
        background: #ffffff;
        border: 2px inset #808080;
        border-radius: 0;
        color: #000000;
      }
      
      [data-theme="win95"] .jdp-date-picker-button {
        background: #c0c0c0;
        border: 2px outset #ffffff;
        border-radius: 0;
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
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'تاریخ را انتخاب کنید';
  @Input() format: string = 'YYYY/MM/DD';
  @Input() locale: string = 'fa';
  @Input() readonly: boolean = false;
  
  // Pass Through & Styling
  @Input() unstyled: boolean = false;
  @Input() pt?: DatePickerPassThroughOptions;
  @Input() styleClass?: string;
  @Input() style?: { [key: string]: any };

  @Output() dateSelect = new EventEmitter<Date>();
  @Output() rangeSelect = new EventEmitter<DateRange>();
  @Output() multipleSelect = new EventEmitter<Date[]>();
  @Output() calendarTypeChange = new EventEmitter<'jalali' | 'gregorian' | 'hijri'>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() change = new EventEmitter<Date | Date[] | DateRange>();

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
    private themeService: ThemeService,
    private styleClassService: StyleClassService,
    private cdr: ChangeDetectorRef
  ) {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.currentPalette = this.themeService.getCurrentPalette();

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.currentTheme = theme;
        this.cdr.markForCheck();
      });

    this.themeService.colorPalette$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(palette => {
        this.currentPalette = palette;
        this.cdr.markForCheck();
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

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.blur.emit();
    this.onTouched();
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isCalendarVisible = false;
      this.isThemeSelectorVisible = false;
      this.onBlur();
    }
    if (event.key === 'Enter' && !this.isCalendarVisible) {
      this.openCalendar();
    }
  }

  handleInputKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.openCalendar();
        break;
      case ' ':
        event.preventDefault();
        this.openCalendar();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isCalendarVisible) {
          this.openCalendar();
        }
        break;
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
    this.cdr.markForCheck();
  }

  openCalendar() {
    if (this.isDisabled) return;
    this.isCalendarVisible = true;
    this.isThemeSelectorVisible = false;
    this.cdr.markForCheck();
  }

  toggleThemeSelector() {
    if (this.isDisabled) return;
    this.isThemeSelectorVisible = !this.isThemeSelectorVisible;
    this.cdr.markForCheck();
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
        this.cdr.markForCheck();
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
      this.cdr.markForCheck();
      return;
    }

    if (this.selectionMode === 'multiple') {
      const prev = this.selectedDates ?? [];
      const exists = prev.some(d => this.jalaliDateService.isSameDay(d, date));
      const next = exists ? prev.filter(d => !this.jalaliDateService.isSameDay(d, date)) : [...prev, date];
      this.selectedDates = next;
      this.multipleSelect.emit(next);
      this.onChange(next);
      this.cdr.markForCheck();
      return;
    }

    this.selectedDate = date;
    this.selectedDayInfo = this.jalaliDateService.getDayInfo(date);
    this.dateSelect.emit(date);
    this.onChange(date);
    this.onTouched();
    this.isCalendarVisible = false;
    this.cdr.markForCheck();
  }

  onMonthChange(event: { year: number; month: number }) {
    console.log('Month changed:', event);
  }

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.jdp-date-picker')) {
      this.isCalendarVisible = false;
      this.isThemeSelectorVisible = false;
      this.onTouched();
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isCalendarVisible || this.isThemeSelectorVisible) {
      this.onClickOutside(event);
    }
  }

  open(): void {
    if (!this.disabled && !this.isDisabled) {
      this.openCalendar();
    }
  }

  close(): void {
    this.isCalendarVisible = false;
    this.isThemeSelectorVisible = false;
  }

  clear(): void {
    if (this.selectionMode === 'range') {
      this.selectedRange = { start: null, end: null };
      this.onChange(this.selectedRange);
    } else if (this.selectionMode === 'multiple') {
      this.selectedDates = [];
      this.onChange(this.selectedDates);
    } else {
      this.selectedDate = null;
      this.onChange(null);
    }
    this.change.emit(null);
  }

  setDate(date: Date): void {
    if (date) {
      this.selectedDate = date;
      this.onChange(date);
      this.change.emit(date);
    }
  }

  getSelectedDate(): Date | DateRange | Date[] | null {
    if (this.selectionMode === 'range') {
      return this.selectedRange;
    }
    if (this.selectionMode === 'multiple') {
      return this.selectedDates;
    }
    return this.selectedDate || null;
  }
  
  // ============================================
  // Pass Through Methods
  // ============================================
  
  private getPTOptions(elementName: keyof Omit<DatePickerPassThroughOptions, 'calendar'>, context?: any): PassThroughElementOptions | undefined {
    const ptOption = this.pt?.[elementName];
    if (!ptOption) return undefined;
    
    const methodOptions: PassThroughMethodOptions = {
      instance: this,
      props: {
        unstyled: this.unstyled,
        styleClass: this.styleClass,
        style: this.style,
        disabled: this.disabled,
        readonly: this.readonly
      },
      state: {
        isCalendarVisible: this.isCalendarVisible,
        isThemeSelectorVisible: this.isThemeSelectorVisible
      },
      context
    };
    
    return this.styleClassService.resolvePassThrough(ptOption as PassThroughType, methodOptions);
  }
  
  getRootClasses(): string {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementClasses(
      'jdp-date-picker',
      ptOptions,
      {
        'jdp-unstyled': this.unstyled,
        [this.styleClass || '']: !!this.styleClass
      }
    );
  }
  
  getRootStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementStyles(this.style, ptOptions);
  }
  
  getInputClasses(): string {
    const ptOptions = this.getPTOptions('input');
    return this.styleClassService.getElementClasses('jdp-date-picker-input', ptOptions);
  }
  
  getInputStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('input');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  getButtonClasses(): string {
    const ptOptions = this.getPTOptions('button');
    return this.styleClassService.getElementClasses('jdp-date-picker-button', ptOptions);
  }
  
  getButtonStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('button');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  getPanelClasses(): string {
    const ptOptions = this.getPTOptions('panel');
    return this.styleClassService.getElementClasses(
      'jdp-date-picker-panel',
      ptOptions,
      {
        'jdp-date-picker-panel--visible': this.isCalendarVisible
      }
    );
  }
  
  getPanelStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('panel');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  getCalendarPT(): CalendarPassThroughOptions | undefined {
    return this.pt?.calendar;
  }
}
