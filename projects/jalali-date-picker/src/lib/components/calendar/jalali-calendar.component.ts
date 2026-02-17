import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliDateService } from '../../core/services/jalali-date.service';
import { HolidaysService } from '../../core/services/holidays.service';
import { DayInfo } from '../../core/models/jalali-date.model';

@Component({
  selector: 'jalali-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <div class="header-left">
          <button class="nav-btn" (click)="previousMonth()">
            ‹
          </button>
          <span class="current-month">{{ currentMonthName }}</span>
          <span class="current-year">{{ currentYear }}</span>
          <button class="nav-btn" (click)="nextMonth()">
            ›
          </button>
        </div>
        
        <div class="header-right">
          <button class="today-btn" (click)="goToToday()">
            امروز
          </button>
        </div>
      </div>
      
      <div class="calendar-days">
        <div 
          class="calendar-day header"
          *ngFor="let day of weekDays">
          {{ day }}
        </div>
        
        <div 
          class="calendar-day other-month"
          *ngFor="let empty of previousMonthEmptyDays">
        </div>
        
        <div 
          class="calendar-day"
          *ngFor="let date of currentMonthDates"
          [class.today]="isToday(date)"
          [class.holiday]="isHoliday(date)"
          [class.weekend]="isWeekend(date)"
          [class.selected]="isSelected(date)"
          [class.official-holiday]="isOfficialHoliday(date)"
          [class.non-official-holiday]="isNonOfficialHoliday(date)"
          (click)="selectDate(date)">
          <span class="day-number">{{ getDayNumber(date) }}</span>
          <span class="holiday-dot" *ngIf="isHoliday(date)"></span>
        </div>
        
        <div 
          class="calendar-day other-month"
          *ngFor="let empty of nextMonthEmptyDays">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      background: var(--background);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .nav-btn {
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
      font-size: 16px;
      transition: all 0.2s;
      
      &:hover {
        background: var(--secondary-color);
        color: white;
        border-color: var(--secondary-color);
      }
    }
    
    .current-month {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-color);
    }
    
    .current-year {
      font-size: 18px;
      color: var(--text-muted);
    }
    
    .header-right {
      display: flex;
      align-items: center;
    }
    
    .today-btn {
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
      
      &:hover {
        background: var(--secondary-color);
      }
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }
    
    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--background);
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      
      &.header {
        font-weight: 600;
        color: var(--text-color);
        background: var(--background-light);
        border: none;
        cursor: default;
        padding: 8px;
      }
      
      &.other-month {
        background: var(--background-light);
        border: none;
        cursor: default;
        color: var(--text-muted);
      }
      
      &.today {
        border-color: var(--primary-color);
        background: rgba(59, 130, 246, 0.1);
        font-weight: 600;
      }
      
      &.selected {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
      
      &.holiday {
        border-color: var(--accent-color);
        background: rgba(245, 158, 11, 0.1);
      }
      
      &.weekend {
        background: rgba(239, 68, 68, 0.1);
        border-color: var(--error-color);
      }
      
      &.official-holiday {
        background: rgba(59, 130, 246, 0.15);
        border-color: var(--primary-color);
      }
      
      &.non-official-holiday {
        background: rgba(245, 158, 11, 0.1);
        border-color: var(--accent-color);
      }
      
      &:hover:not(.header):not(.other-month) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }
    
    .day-number {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-color);
      
      .selected & {
        color: white;
      }
    }
    
    .holiday-dot {
      width: 4px;
      height: 4px;
      background: var(--accent-color);
      border-radius: 50%;
      margin-top: 4px;
    }
    
    @media (max-width: 600px) {
      .calendar-container {
        padding: 12px;
      }
      
      .calendar-header {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
      
      .header-left {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .current-month,
      .current-year {
        font-size: 16px;
      }
      
      .day-number {
        font-size: 14px;
      }
    }
  `]
})
export class JalaliCalendarComponent implements OnInit {
  @Input() calendarType: 'jalali' | 'gregorian' = 'jalali';
  @Input() selectedDate: Date;
  @Output() dateSelect = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<{ year: number; month: number }>();

  currentYear: number;
  currentMonth: number;
  currentMonthName: string;
  weekDays: string[] = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  currentMonthDates: Date[] = [];
  previousMonthEmptyDays: number[] = [];
  nextMonthEmptyDays: number[] = [];

  constructor(
    private jalaliDateService: JalaliDateService,
    private holidaysService: HolidaysService
  ) { }

  ngOnInit() {
    this.goToToday();
  }

  goToToday() {
    const today = this.jalaliDateService.today();
    if (this.calendarType === 'jalali') {
      const jalaliDate = this.jalaliDateService.gregorianToJalali(today);
      this.currentYear = jalaliDate.year;
      this.currentMonth = jalaliDate.month;
    } else {
      this.currentYear = today.getFullYear();
      this.currentMonth = today.getMonth() + 1;
    }
    this.updateCalendar();
  }

  previousMonth() {
    if (this.calendarType === 'jalali') {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    } else {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.calendarType === 'jalali') {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    } else {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    }
    this.updateCalendar();
  }

  updateCalendar() {
    if (this.calendarType === 'jalali') {
      this.currentMonthName = this.jalaliDateService.getJalaliMonthName(this.currentMonth);
      this.generateJalaliDates();
    } else {
      this.currentMonthName = [
        'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
        'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
      ][this.currentMonth - 1];
      this.generateGregorianDates();
    }
    this.monthChange.emit({ year: this.currentYear, month: this.currentMonth });
  }

  generateJalaliDates() {
    const daysInMonth = this.jalaliDateService.getDaysInJalaliMonth(this.currentYear, this.currentMonth);
    const firstDay = this.jalaliDateService.getFirstDayOfJalaliMonth(this.currentYear, this.currentMonth);

    this.previousMonthEmptyDays = Array(firstDay).fill(0);
    this.currentMonthDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const gregorianDate = this.jalaliDateService.jalaliToGregorian(this.currentYear, this.currentMonth, day);
      this.currentMonthDates.push(new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day));
    }

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
      this.currentMonthDates.push(new Date(this.currentYear, this.currentMonth - 1, day));
    }

    const totalDays = (firstDay + 1) % 7 + daysInMonth;
    const nextMonthDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    this.nextMonthEmptyDays = Array(nextMonthDays).fill(0);
  }

  selectDate(date: Date) {
    this.dateSelect.emit(date);
  }

  isToday(date: Date): boolean {
    const today = this.jalaliDateService.today();
    return this.jalaliDateService.isSameDay(date, today);
  }

  isSelected(date: Date): boolean {
    return this.selectedDate && this.jalaliDateService.isSameDay(date, this.selectedDate);
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
    }
    return date.getDate();
  }
}

