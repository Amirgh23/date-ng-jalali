import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliDateService } from '../../core/services/jalali-date.service';
import { HolidaysService } from '../../core/services/holidays.service';
import { LocaleService, SupportedLocale } from '../../core/services/locale.service';
import { JalaliCalendarUtils } from '../../core/utils/jalali-calendar.utils';
import { DateRange, SelectionMode } from '../../core/models/jalali-date.model';
import { CalendarPassThroughOptions, PassThroughMethodOptions } from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';

@Component({
  selector: 'jalali-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="getRootClasses()"
      [ngStyle]="getRootStyles()"
      [attr.data-calendar-type]="calendarType"
      [attr.data-selection-mode]="selectionMode">
      
      <!-- Header -->
      <div 
        [class]="getHeaderClasses()"
        [ngStyle]="getHeaderStyles()">
        
        <!-- Header Left -->
        <div 
          [class]="getHeaderLeftClasses()"
          [ngStyle]="getHeaderLeftStyles()">
          
          <!-- Previous Button -->
          <button
            type="button"
            [class]="getPreviousButtonClasses()"
            [ngStyle]="getPreviousButtonStyles()"
            (click)="previousMonth()"
            [disabled]="false"
            [attr.aria-label]="localeService.translate('previous_month')">
            ‹
          </button>
          
          <!-- Title -->
          <div 
            [class]="getTitleClasses()"
            [ngStyle]="getTitleStyles()">
            
            <!-- Month Name -->
            <span 
              [class]="getMonthNameClasses()"
              [ngStyle]="getMonthNameStyles()">
              {{ currentMonthName }}
            </span>
            
            <!-- Year Name -->
            <span 
              [class]="getYearNameClasses()"
              [ngStyle]="getYearNameStyles()">
              {{ currentYear }}
            </span>
          </div>
          
          <!-- Next Button -->
          <button
            type="button"
            [class]="getNextButtonClasses()"
            [ngStyle]="getNextButtonStyles()"
            (click)="nextMonth()"
            [disabled]="false"
            [attr.aria-label]="localeService.translate('next_month')">
            ›
          </button>
        </div>
        
        <!-- Header Right -->
        <div 
          [class]="getHeaderRightClasses()"
          [ngStyle]="getHeaderRightStyles()">
          
          <!-- Today Button -->
          <button
            type="button"
            [class]="getTodayButtonClasses()"
            [ngStyle]="getTodayButtonStyles()"
            (click)="goToToday()"
            [attr.aria-label]="localeService.translate('today')">
            {{ localeService.translate('today') }}
          </button>
        </div>
      </div>
      
      <!-- Grid -->
      <div 
        [class]="getGridClasses()"
        [ngStyle]="getGridStyles()">
        
        <!-- Day Headers -->
        @for (day of weekDays; track day) {
          <div 
            [class]="getDayHeaderClasses()"
            [ngStyle]="getDayHeaderStyles()">
            {{ day }}
          </div>
        }
        
        <!-- Previous Month Empty Days -->
        @for (empty of previousMonthEmptyDays; track $index) {
          <div class="jdp-calendar-day-cell jdp-calendar-day-cell--other-month"></div>
        }
        
        <!-- Current Month Days -->
        @for (date of currentMonthDates; track $index) {
          <div 
            [class]="getDayCellClasses(date)"
            [ngStyle]="getDayCellStyles(date)"
            [attr.data-date]="date.toISOString()"
            [attr.role]="'button'"
            [attr.tabindex]="isDisabled(date) ? -1 : 0"
            [attr.aria-selected]="isSelected(date)"
            [attr.aria-disabled]="isDisabled(date)"
            [attr.aria-label]="getDayLabel(date)"
            (click)="selectDate(date)"
            (keydown.enter)="selectDate(date)"
            (keydown.space)="selectDate(date); $event.preventDefault()">
            
            <!-- Day Number -->
            <span 
              [class]="getDayNumberClasses(date)"
              [ngStyle]="getDayNumberStyles(date)">
              {{ getDayNumber(date) }}
            </span>
            
            <!-- Holiday Dot -->
            @if (isHoliday(date)) {
              <span 
                [class]="getHolidayDotClasses(date)"
                [ngStyle]="getHolidayDotStyles(date)">
              </span>
            }
            
            <!-- Selection Indicator -->
            @if (isDateSelected(date)) {
              <span 
                [class]="getSelectionIndicatorClasses(date)"
                [ngStyle]="getSelectionIndicatorStyles(date)">
              </span>
            }
          </div>
        }
        
        <!-- Next Month Empty Days -->
        @for (empty of nextMonthEmptyDays; track $index) {
          <div class="jdp-calendar-day-cell jdp-calendar-day-cell--other-month"></div>
        }
      </div>
      
      <!-- Footer (if needed) -->
      @if (showFooter) {
        <div 
          [class]="getFooterClasses()"
          [ngStyle]="getFooterStyles()">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    /* Root Container */
    .jdp-calendar {
      background: var(--background, #ffffff);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
    
    /* Header */
    .jdp-calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
    }
    
    .jdp-calendar-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .jdp-calendar-header-right {
      display: flex;
      align-items: center;
    }
    
    /* Navigation Buttons */
    .jdp-calendar-nav-button {
      background: var(--background-light, #f9fafb);
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 6px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-color, #1f2937);
      font-size: 20px;
      transition: all 0.2s;
    }
    
    .jdp-calendar-nav-button:hover {
      background: var(--secondary-color, #6366f1);
      color: var(--background, white);
      border-color: var(--secondary-color, #6366f1);
    }
    
    /* Title */
    .jdp-calendar-title {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    
    .jdp-calendar-month-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-color, #1f2937);
    }
    
    .jdp-calendar-year-name {
      font-size: 18px;
      color: var(--text-muted, #6b7280);
    }
    
    /* Today Button */
    .jdp-calendar-today-button {
      background: var(--primary-color, #3b82f6);
      color: var(--background, white);
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .jdp-calendar-today-button:hover {
      background: var(--secondary-color, #6366f1);
    }
    
    /* Grid */
    .jdp-calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }
    
    /* Day Header */
    .jdp-calendar-day-header {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--text-color, #1f2937);
      background: var(--background-light, #f9fafb);
      border-radius: 8px;
      padding: 8px;
      font-size: 14px;
    }
    
    /* Day Cell */
    .jdp-calendar-day-cell {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 8px;
      background: var(--background, #ffffff);
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      padding: 4px;
    }
    
    .jdp-calendar-day-cell:hover:not(.jdp-calendar-day-cell--other-month):not(.jdp-calendar-day-cell--disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: var(--primary-color, #3b82f6);
    }
    
    .jdp-calendar-day-cell--other-month {
      background: var(--background-light, #f9fafb);
      border: none;
      cursor: default;
    }
    
    .jdp-calendar-day-cell--today {
      border-color: var(--primary-color, #3b82f6);
      background: var(--primary-color, rgba(59, 130, 246, 0.1));
      font-weight: 600;
    }
    
    .jdp-calendar-day-cell--selected {
      background: var(--primary-color, #3b82f6) !important;
      color: var(--background, white);
      border-color: var(--primary-color, #3b82f6);
    }
    
    .jdp-calendar-day-cell--selected .jdp-calendar-day-number {
      color: var(--background, white);
    }
    
    .jdp-calendar-day-cell--in-range {
      background: var(--primary-color, rgba(59, 130, 246, 0.12));
      border-color: var(--primary-color, rgba(59, 130, 246, 0.25));
    }
    
    .jdp-calendar-day-cell--range-start,
    .jdp-calendar-day-cell--range-end {
      background: var(--primary-color, #3b82f6) !important;
      color: var(--background, white);
      border-color: var(--primary-color, #3b82f6);
    }
    
    .jdp-calendar-day-cell--disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    
    .jdp-calendar-day-cell--holiday {
      border-color: var(--accent-color, #f59e0b);
      background: var(--accent-color, rgba(245, 158, 11, 0.1));
    }
    
    .jdp-calendar-day-cell--weekend {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
    }
    
    .jdp-calendar-day-cell--official-holiday {
      background: var(--primary-color, rgba(59, 130, 246, 0.15));
      border-color: var(--primary-color, #3b82f6);
    }
    
    .jdp-calendar-day-cell--multiple-selected {
      background: var(--primary-color, rgba(59, 130, 246, 0.2));
      border-color: var(--primary-color, #3b82f6);
    }
    
    /* Day Number */
    .jdp-calendar-day-number {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-color, #1f2937);
    }
    
    /* Holiday Dot */
    .jdp-calendar-holiday-dot {
      width: 4px;
      height: 4px;
      background: var(--accent-color, #f59e0b);
      border-radius: 50%;
      margin-top: 4px;
    }
    
    /* Selection Indicator */
    .jdp-calendar-selection-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 6px;
      height: 6px;
      background: var(--primary-color, #3b82f6);
      border-radius: 50%;
    }
    
    /* Footer */
    .jdp-calendar-footer {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color, #e5e7eb);
    }
    
    /* Responsive */
    @media (max-width: 600px) {
      .jdp-calendar {
        padding: 12px;
      }
      
      .jdp-calendar-header {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
      
      .jdp-calendar-header-left {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .jdp-calendar-month-name,
      .jdp-calendar-year-name {
        font-size: 16px;
      }
      
      .jdp-calendar-day-number {
        font-size: 14px;
      }
    }
    
    /* Theme-Specific Styles */
    
    /* HUD Theme */
    [data-theme="hud"] .jdp-calendar {
      background: rgba(0, 20, 40, 0.95);
      border: 2px solid var(--primary-color, #00ff88);
      box-shadow: 0 0 30px var(--primary-color, #00ff88), inset 0 0 20px rgba(0, 255, 136, 0.1);
    }
    
    [data-theme="hud"] .jdp-calendar-day-cell {
      background: rgba(0, 255, 136, 0.05);
      border: 1px solid rgba(0, 255, 136, 0.3);
    }
    
    [data-theme="hud"] .jdp-calendar-day-cell:hover {
      box-shadow: 0 0 15px var(--primary-color, #00ff88);
    }
    
    [data-theme="hud"] .jdp-calendar-day-number {
      text-shadow: 0 0 5px var(--primary-color, #00ff88);
    }
    
    /* Neon Theme */
    [data-theme="neon"] .jdp-calendar {
      background: #0a0a0a;
      border: 2px solid var(--primary-color, #ff00ff);
      box-shadow: 0 0 20px var(--primary-color, #ff00ff), 0 0 40px var(--secondary-color, #00ffff);
    }
    
    [data-theme="neon"] .jdp-calendar-day-cell {
      background: rgba(255, 0, 255, 0.05);
      border: 1px solid rgba(255, 0, 255, 0.3);
    }
    
    [data-theme="neon"] .jdp-calendar-day-cell:hover {
      box-shadow: 0 0 15px var(--primary-color, #ff00ff);
    }
    
    [data-theme="neon"] .jdp-calendar-day-number {
      text-shadow: 0 0 8px var(--primary-color, #ff00ff);
    }
    
    /* Glassmorphism Theme */
    [data-theme="glassmorphism"] .jdp-calendar {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="glassmorphism"] .jdp-calendar-day-cell {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Sci-Fi Theme */
    [data-theme="sci-fi"] .jdp-calendar,
    [data-theme="scifi"] .jdp-calendar {
      background: linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(0, 40, 80, 0.95));
      border: 2px solid var(--primary-color, #00d4ff);
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1);
    }
    
    [data-theme="sci-fi"] .jdp-calendar-day-cell,
    [data-theme="scifi"] .jdp-calendar-day-cell {
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid rgba(0, 212, 255, 0.3);
    }
    
    /* Terminal Theme */
    [data-theme="terminal"] .jdp-calendar {
      background: #000000;
      border: 2px solid var(--primary-color, #00ff00);
      font-family: 'Courier New', monospace;
    }
    
    [data-theme="terminal"] .jdp-calendar-day-cell {
      background: #000000;
      border: 1px solid rgba(0, 255, 0, 0.3);
      font-family: 'Courier New', monospace;
    }
    
    [data-theme="terminal"] .jdp-calendar-day-number {
      font-family: 'Courier New', monospace;
    }
    
    /* Gradient Theme */
    [data-theme="gradient"] .jdp-calendar {
      background: linear-gradient(135deg, var(--primary-color, #667eea) 0%, var(--secondary-color, #764ba2) 100%);
      border: none;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
    }
    
    [data-theme="gradient"] .jdp-calendar-day-cell {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Luxury Theme */
    [data-theme="luxury"] .jdp-calendar {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 2px solid var(--accent-color, #d4af37);
      box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
    }
    
    [data-theme="luxury"] .jdp-calendar-day-cell {
      background: rgba(212, 175, 55, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.3);
    }
    
    /* Win95 Theme */
    [data-theme="win95"] .jdp-calendar {
      background: #c0c0c0;
      border: 2px outset #ffffff;
      box-shadow: none;
      border-radius: 0;
    }
    
    [data-theme="win95"] .jdp-calendar-day-cell {
      background: #ffffff;
      border: 2px outset #ffffff;
      border-radius: 0;
    }
    
    [data-theme="win95"] .jdp-calendar-nav-button {
      background: #c0c0c0;
      border: 2px outset #ffffff;
      border-radius: 0;
    }
    
    [data-theme="win95"] .jdp-calendar-today-button {
      background: #c0c0c0;
      border: 2px outset #ffffff;
      border-radius: 0;
      color: #000000;
    }
  `]
})
export class JalaliCalendarComponent implements OnInit, OnChanges {
  @Input() calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  @Input() selectedDate: Date;
  @Input() selectionMode: SelectionMode = 'single';
  @Input() selectedRange: DateRange | null = null;
  @Input() selectedDates: Date[] = [];
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() disabledDates: Date[] = [];
  @Input() locale: SupportedLocale = 'fa';
  
  // Pass Through & Styling
  @Input() unstyled: boolean = false;
  @Input() pt?: CalendarPassThroughOptions;
  @Input() styleClass?: string;
  @Input() style?: { [key: string]: any };
  @Input() showFooter: boolean = false;
  
  @Output() dateSelect = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<{ year: number; month: number }>();
  @Output() rangeSelect = new EventEmitter<DateRange>();
  @Output() multipleSelect = new EventEmitter<Date[]>();

  currentYear: number;
  currentMonth: number;
  currentMonthName: string;
  weekDays: string[] = [];

  currentMonthDates: Date[] = [];
  previousMonthEmptyDays: number[] = [];
  nextMonthEmptyDays: number[] = [];

  // نماهای مختلف
  currentView: 'day' | 'month' | 'year' | 'decade' = 'day';
  monthsForView: string[] = [];
  yearsForView: number[] = [];

  constructor(
    private jalaliDateService: JalaliDateService,
    private holidaysService: HolidaysService,
    private styleClassService: StyleClassService,
    public localeService: LocaleService
  ) { }

  ngOnInit() {
    // Set locale
    if (this.locale) {
      this.localeService.setLocale(this.locale);
    }
    
    // Set week days based on locale
    this.weekDays = this.localeService.getWeekDaysShort();
    
    const initDate = this.selectedDate || this.jalaliDateService.today();
    console.log('🔍 ngOnInit - initDate:', initDate);
    this.goToDate(initDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['calendarType'] && !changes['calendarType'].firstChange) {
      this.goToDate(this.selectedDate || this.jalaliDateService.today());
    }
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.goToDate(this.selectedDate || this.jalaliDateService.today());
    }
    if (changes['locale'] && !changes['locale'].firstChange) {
      this.localeService.setLocale(this.locale);
      this.weekDays = this.localeService.getWeekDaysShort();
      this.updateCalendar();
    }
  }

  goToToday() {
    const today = this.jalaliDateService.today();
    this.goToDate(today);
    this.selectDate(today);
  }

  goToDate(date: Date) {
    const target = date;
    console.log('🔍 goToDate - input date:', target);
    console.log('🔍 goToDate - calendarType:', this.calendarType);
    
    if (this.calendarType === 'jalali') {
      const jalaliDate = this.jalaliDateService.gregorianToJalali(target);
      console.log('🔍 goToDate - jalaliDate:', jalaliDate);
      this.currentYear = jalaliDate.year;
      this.currentMonth = jalaliDate.month;
      console.log('🔍 goToDate - set currentYear:', this.currentYear, 'currentMonth:', this.currentMonth);
    } else if (this.calendarType === 'gregorian') {
      this.currentYear = target.getFullYear();
      this.currentMonth = target.getMonth() + 1;
    } else {
      const hijriDate = this.jalaliDateService.gregorianToHijri(target);
      this.currentYear = hijriDate.year;
      this.currentMonth = hijriDate.month;
    }
    this.updateCalendar();
  }

  previousMonth() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  previousYear() {
    this.currentYear--;
    this.updateCalendar();
  }

  nextYear() {
    this.currentYear++;
    this.updateCalendar();
  }

  updateCalendar() {
    console.log('🔍 updateCalendar - START - currentYear:', this.currentYear, 'currentMonth:', this.currentMonth, 'calendarType:', this.calendarType);
    
    if (this.calendarType === 'jalali') {
      this.currentMonthName = this.localeService.getJalaliMonthName(this.currentMonth);
      console.log('🔍 updateCalendar - currentMonthName:', this.currentMonthName);
      this.generateJalaliDates();
    } else if (this.calendarType === 'gregorian') {
      this.currentMonthName = this.localeService.getGregorianMonthName(this.currentMonth);
      this.generateGregorianDates();
    } else {
      this.currentMonthName = this.localeService.getHijriMonthName(this.currentMonth);
      this.generateHijriDates();
    }
    this.monthChange.emit({ year: this.currentYear, month: this.currentMonth });
  }

  generateHijriDates() {
    const daysInMonth = this.jalaliDateService.getDaysInHijriMonth(this.currentYear, this.currentMonth);
    const firstDay = this.jalaliDateService.getFirstDayOfHijriMonth(this.currentYear, this.currentMonth);

    this.previousMonthEmptyDays = Array(firstDay).fill(0);
    this.currentMonthDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const gregorianDate = this.jalaliDateService.hijriToGregorian(this.currentYear, this.currentMonth, day);
      this.currentMonthDates.push(gregorianDate);
    }

    const totalDays = firstDay + daysInMonth;
    const nextMonthDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    this.nextMonthEmptyDays = Array(nextMonthDays).fill(0);
  }

  generateJalaliDates() {
    console.log('🔍 generateJalaliDates - currentYear:', this.currentYear, 'currentMonth:', this.currentMonth);
    const daysInMonth = this.jalaliDateService.getDaysInJalaliMonth(this.currentYear, this.currentMonth);
    const firstDay = this.jalaliDateService.getFirstDayOfJalaliMonth(this.currentYear, this.currentMonth);

    console.log('🔍 generateJalaliDates - daysInMonth:', daysInMonth, 'firstDay:', firstDay);

    this.previousMonthEmptyDays = Array(firstDay).fill(0);
    this.currentMonthDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const gregorianDate = this.jalaliDateService.jalaliToGregorian(this.currentYear, this.currentMonth, day);
      if (day === 1 || day === 30) {
        console.log(`🔍 Day ${day} - Jalali: ${this.currentYear}/${this.currentMonth}/${day} → Gregorian:`, gregorianDate);
      }
      // Create date at noon to avoid timezone issues
      const date = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day, 12, 0, 0, 0);
      this.currentMonthDates.push(date);
    }

    console.log('🔍 First date in calendar:', this.currentMonthDates[0]);
    console.log('🔍 Last date in calendar:', this.currentMonthDates[this.currentMonthDates.length - 1]);

    const totalDays = firstDay + daysInMonth;
    const nextMonthDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    this.nextMonthEmptyDays = Array(nextMonthDays).fill(0);
  }

  generateGregorianDates() {
    const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    this.previousMonthEmptyDays = Array((firstDay + 1) % 7).fill(0);
    this.currentMonthDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      // Create date at noon to avoid timezone issues
      const date = new Date(this.currentYear, this.currentMonth - 1, day, 12, 0, 0, 0);
      this.currentMonthDates.push(date);
    }

    const totalDays = (firstDay + 1) % 7 + daysInMonth;
    const nextMonthDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    this.nextMonthEmptyDays = Array(nextMonthDays).fill(0);
  }

  selectDate(date: Date) {
    if (this.isDisabled(date)) {
      return;
    }
    console.log('📅 Selected date:', date);
    console.log('📅 Date details:', {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      iso: date.toISOString()
    });
    this.dateSelect.emit(date);
  }

  isToday(date: Date): boolean {
    const today = this.jalaliDateService.today();
    return this.jalaliDateService.isSameDay(date, today);
  }

  isSelected(date: Date): boolean {
    if (this.selectionMode === 'multiple') {
      return (this.selectedDates || []).some(d => this.jalaliDateService.isSameDay(d, date));
    }

    if (this.selectionMode === 'range') {
      const start = this.selectedRange?.start;
      const end = this.selectedRange?.end;
      return !!(
        (start && this.jalaliDateService.isSameDay(date, start)) ||
        (end && this.jalaliDateService.isSameDay(date, end))
      );
    }

    return !!(this.selectedDate && this.jalaliDateService.isSameDay(date, this.selectedDate));
  }

  isInRange(date: Date): boolean {
    if (this.selectionMode !== 'range') return false;
    const start = this.selectedRange?.start;
    const end = this.selectedRange?.end;
    if (!start || !end) return false;
    const t = date.getTime();
    const a = start.getTime();
    const b = end.getTime();
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return t > min && t < max;
  }

  isRangeStart(date: Date): boolean {
    if (this.selectionMode !== 'range') return false;
    const start = this.selectedRange?.start;
    return !!(start && this.jalaliDateService.isSameDay(date, start));
  }

  isRangeEnd(date: Date): boolean {
    if (this.selectionMode !== 'range') return false;
    const end = this.selectedRange?.end;
    return !!(end && this.jalaliDateService.isSameDay(date, end));
  }

  isDisabled(date: Date): boolean {
    if (this.minDate && date.getTime() < this.minDate.getTime()) return true;
    if (this.maxDate && date.getTime() > this.maxDate.getTime()) return true;
    return false;
  }

  isHoliday(date: Date): boolean {
    return this.holidaysService.getHolidayInfo(date).isHoliday;
  }

  isOfficialHoliday(date: Date): boolean {
    return this.holidaysService.isOfficialHoliday(date);
  }

  isNonOfficialHoliday(date: Date): boolean {
    return this.holidaysService.isNonOfficialHoliday(date);
  }

  isWeekend(date: Date): boolean {
    return this.holidaysService.isWeekend(date);
  }

  getDayNumber(date: Date): number {
    if (this.calendarType === 'jalali') {
      const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
      return jalaliDate.day;
    } else if (this.calendarType === 'gregorian') {
      return date.getDate();
    } else {
      const hijriDate = this.jalaliDateService.gregorianToHijri(date);
      return hijriDate.day;
    }
  }

  getDayLabel(date: Date): string {
    const dayNum = this.getDayNumber(date);
    const monthName = this.currentMonthName;
    const year = this.currentYear;
    return `${dayNum} ${monthName} ${year}`;
  }

  // متدهای تغییر نما
  switchToDayView(): void {
    this.currentView = 'day';
  }

  switchToMonthView(): void {
    this.currentView = 'month';
    this.generateMonthsForView();
  }

  switchToYearView(): void {
    this.currentView = 'year';
    this.generateYearsForView();
  }

  switchToDecadeView(): void {
    this.currentView = 'decade';
    this.generateDecadeForView();
  }

  // تولید ماه‌ها برای نمای ماه
  generateMonthsForView(): void {
    const months = this.calendarType === 'jalali'
      ? ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
      : ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
    this.monthsForView = months;
  }

  // تولید سال‌ها برای نمای سال
  generateYearsForView(): void {
    this.yearsForView = [];
    const startYear = Math.floor(this.currentYear / 10) * 10;
    for (let i = 0; i < 12; i++) {
      this.yearsForView.push(startYear + i);
    }
  }

  // تولید دهه برای نمای دهه
  generateDecadeForView(): void {
    this.yearsForView = [];
    const startYear = Math.floor(this.currentYear / 100) * 100;
    for (let i = 0; i < 12; i++) {
      this.yearsForView.push(startYear + (i * 10));
    }
  }

  // انتخاب ماه از نمای ماه
  selectMonth(month: number): void {
    this.currentMonth = month;
    this.switchToDayView();
    this.updateCalendar();
  }

  // انتخاب سال از نمای سال
  selectYear(year: number): void {
    this.currentYear = year;
    this.switchToMonthView();
  }

  // Keyboard Navigation
  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.currentView === 'day') {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.previousMonth();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.nextMonth();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.previousMonth();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.nextMonth();
          break;
        case 'Enter':
          event.preventDefault();
          this.goToToday();
          break;
      }
    } else if (this.currentView === 'month') {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.currentYear--;
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.currentYear++;
          break;
        case 'Escape':
          event.preventDefault();
          this.switchToDayView();
          break;
      }
    } else if (this.currentView === 'year') {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.currentYear -= 10;
          this.generateYearsForView();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.currentYear += 10;
          this.generateYearsForView();
          break;
        case 'Escape':
          event.preventDefault();
          this.switchToMonthView();
          break;
      }
    }
  }

  today(): void {
    this.goToToday();
  }

  // Validation Methods
  isDateValid(date: Date): boolean {
    return !this.isDateDisabled(date) && this.isDateInRange(date);
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date.getTime() < this.minDate.getTime()) return true;
    if (this.maxDate && date.getTime() > this.maxDate.getTime()) return true;
    if (this.disabledDates?.some(d => this.jalaliDateService.isSameDay(d, date))) return true;
    return false;
  }

  isDateInRange(date: Date): boolean {
    if (!this.minDate && !this.maxDate) return true;
    const t = date.getTime();
    if (this.minDate && t < this.minDate.getTime()) return false;
    if (this.maxDate && t > this.maxDate.getTime()) return false;
    return true;
  }

  validateDateRange(start: Date, end: Date): boolean {
    if (!this.isDateValid(start) || !this.isDateValid(end)) return false;
    return start.getTime() <= end.getTime();
  }

  // Range Selection Methods
  selectDateRange(startDate: Date, endDate: Date): void {
    if (this.validateDateRange(startDate, endDate)) {
      this.selectedRange = { start: startDate, end: endDate };
      this.rangeSelect.emit(this.selectedRange);
    }
  }

  clearRange(): void {
    this.selectedRange = { start: null, end: null };
  }

  // Multiple Selection Methods
  toggleDateSelection(date: Date): void {
    if (this.isDateValid(date)) {
      const exists = this.selectedDates.some(d => this.jalaliDateService.isSameDay(d, date));
      
      if (exists) {
        this.selectedDates = this.selectedDates.filter(d => !this.jalaliDateService.isSameDay(d, date));
      } else {
        this.selectedDates = [...this.selectedDates, date];
      }
      this.multipleSelect.emit(this.selectedDates);
    }
  }

  clearMultipleSelection(): void {
    this.selectedDates = [];
  }

  isDateSelected(date: Date): boolean {
    return this.selectedDates.some(d => this.jalaliDateService.isSameDay(d, date));
  }

  getSelectedDates(): Date[] {
    return [...this.selectedDates];
  }
  
  // ============================================
  // Pass Through Methods
  // ============================================
  
  /**
   * Get PT options for a specific element
   */
  private getPTOptions(elementName: keyof CalendarPassThroughOptions, context?: any) {
    const ptOption = this.pt?.[elementName];
    if (!ptOption) return undefined;
    
    const methodOptions: PassThroughMethodOptions = {
      instance: this,
      props: {
        unstyled: this.unstyled,
        styleClass: this.styleClass,
        style: this.style,
        calendarType: this.calendarType,
        selectionMode: this.selectionMode
      },
      state: {
        currentMonth: this.currentMonth,
        currentYear: this.currentYear,
        currentView: this.currentView
      },
      context
    };
    
    return this.styleClassService.resolvePassThrough(ptOption, methodOptions);
  }
  
  /**
   * Get classes for root element
   */
  getRootClasses(): string {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementClasses(
      'jdp-calendar',
      ptOptions,
      {
        'jdp-unstyled': this.unstyled,
        [this.styleClass || '']: !!this.styleClass
      }
    );
  }
  
  /**
   * Get styles for root element
   */
  getRootStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementStyles(this.style, ptOptions);
  }
  
  /**
   * Get attributes for root element
   */
  getRootAttrs(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementAttrs(ptOptions);
  }
  
  /**
   * Get classes for header
   */
  getHeaderClasses(): string {
    const ptOptions = this.getPTOptions('header');
    return this.styleClassService.getElementClasses('jdp-calendar-header', ptOptions);
  }
  
  getHeaderStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('header');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for navigation buttons
   */
  getPreviousButtonClasses(): string {
    const ptOptions = this.getPTOptions('previousButton');
    return this.styleClassService.getElementClasses('jdp-calendar-nav-button', ptOptions);
  }
  
  getPreviousButtonStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('previousButton');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  getNextButtonClasses(): string {
    const ptOptions = this.getPTOptions('nextButton');
    return this.styleClassService.getElementClasses('jdp-calendar-nav-button', ptOptions);
  }
  
  getNextButtonStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('nextButton');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for title
   */
  getTitleClasses(): string {
    const ptOptions = this.getPTOptions('title');
    return this.styleClassService.getElementClasses('jdp-calendar-title', ptOptions);
  }
  
  getTitleStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('title');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for grid
   */
  getGridClasses(): string {
    const ptOptions = this.getPTOptions('grid');
    return this.styleClassService.getElementClasses('jdp-calendar-grid', ptOptions);
  }
  
  getGridStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('grid');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for day header
   */
  getDayHeaderClasses(): string {
    const ptOptions = this.getPTOptions('dayHeader');
    return this.styleClassService.getElementClasses('jdp-calendar-day-header', ptOptions);
  }
  
  getDayHeaderStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('dayHeader');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for day cell
   */
  getDayCellClasses(date: Date): string {
    const ptOptions = this.getPTOptions('dayCell', { date });
    
    return this.styleClassService.getElementClasses(
      'jdp-calendar-day-cell',
      ptOptions,
      {
        'jdp-calendar-day-cell--today': this.isToday(date),
        'jdp-calendar-day-cell--selected': this.isSelected(date),
        'jdp-calendar-day-cell--in-range': this.isInRange(date),
        'jdp-calendar-day-cell--range-start': this.isRangeStart(date),
        'jdp-calendar-day-cell--range-end': this.isRangeEnd(date),
        'jdp-calendar-day-cell--disabled': this.isDisabled(date),
        'jdp-calendar-day-cell--weekend': this.isWeekend(date),
        'jdp-calendar-day-cell--holiday': this.isHoliday(date),
        'jdp-calendar-day-cell--official-holiday': this.isOfficialHoliday(date),
        'jdp-calendar-day-cell--multiple-selected': this.isDateSelected(date)
      }
    );
  }
  
  getDayCellStyles(date: Date): { [key: string]: any } {
    const ptOptions = this.getPTOptions('dayCell', { date });
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  getDayCellAttrs(date: Date): { [key: string]: any } {
    const ptOptions = this.getPTOptions('dayCell', { date });
    const attrs = this.styleClassService.getElementAttrs(ptOptions);
    
    // Add default ARIA attributes
    return {
      ...attrs,
      'role': 'button',
      'tabindex': this.isDisabled(date) ? -1 : 0,
      'aria-selected': this.isSelected(date),
      'aria-disabled': this.isDisabled(date),
      'aria-label': this.getDayLabel(date)
    };
  }
  
  /**
   * Get classes for footer
   */
  getFooterClasses(): string {
    const ptOptions = this.getPTOptions('footer');
    return this.styleClassService.getElementClasses('jdp-calendar-footer', ptOptions);
  }
  
  getFooterStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('footer');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for header left section
   */
  getHeaderLeftClasses(): string {
    const ptOptions = this.getPTOptions('headerLeft');
    return this.styleClassService.getElementClasses('jdp-calendar-header-left', ptOptions);
  }
  
  getHeaderLeftStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('headerLeft');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for header right section
   */
  getHeaderRightClasses(): string {
    const ptOptions = this.getPTOptions('headerRight');
    return this.styleClassService.getElementClasses('jdp-calendar-header-right', ptOptions);
  }
  
  getHeaderRightStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('headerRight');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for month name
   */
  getMonthNameClasses(): string {
    const ptOptions = this.getPTOptions('monthName');
    return this.styleClassService.getElementClasses('jdp-calendar-month-name', ptOptions);
  }
  
  getMonthNameStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('monthName');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for year name
   */
  getYearNameClasses(): string {
    const ptOptions = this.getPTOptions('yearName');
    return this.styleClassService.getElementClasses('jdp-calendar-year-name', ptOptions);
  }
  
  getYearNameStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('yearName');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for today button
   */
  getTodayButtonClasses(): string {
    const ptOptions = this.getPTOptions('todayButton');
    return this.styleClassService.getElementClasses('jdp-calendar-today-button', ptOptions);
  }
  
  getTodayButtonStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('todayButton');
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for day number
   */
  getDayNumberClasses(date: Date): string {
    const ptOptions = this.getPTOptions('dayNumber', { date });
    return this.styleClassService.getElementClasses('jdp-calendar-day-number', ptOptions);
  }
  
  getDayNumberStyles(date: Date): { [key: string]: any } {
    const ptOptions = this.getPTOptions('dayNumber', { date });
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for holiday dot
   */
  getHolidayDotClasses(date: Date): string {
    const ptOptions = this.getPTOptions('holidayDot', { date });
    return this.styleClassService.getElementClasses('jdp-calendar-holiday-dot', ptOptions);
  }
  
  getHolidayDotStyles(date: Date): { [key: string]: any } {
    const ptOptions = this.getPTOptions('holidayDot', { date });
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  /**
   * Get classes for selection indicator
   */
  getSelectionIndicatorClasses(date: Date): string {
    const ptOptions = this.getPTOptions('selectionIndicator', { date });
    return this.styleClassService.getElementClasses('jdp-calendar-selection-indicator', ptOptions);
  }
  
  getSelectionIndicatorStyles(date: Date): { [key: string]: any } {
    const ptOptions = this.getPTOptions('selectionIndicator', { date });
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
}