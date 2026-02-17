import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliDateService } from '../../core/services/jalali-date.service';
import { DayInfo } from '../../core/models/jalali-date.model';
import { CalendarSwitchComponent } from '../calendar-switch/calendar-switch.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { JalaliCalendarComponent } from '../calendar/jalali-calendar.component';
import { DayInfoModalComponent } from '../day-info-modal/day-info-modal.component';

@Component({
  selector: 'jalali-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    CalendarSwitchComponent,
    ColorPickerComponent,
    JalaliCalendarComponent,
    DayInfoModalComponent
  ],
  template: `
    <div class="date-picker-container">
      <!-- input field -->
      <div class="date-input-container">
        <input 
          type="text" 
          class="date-input"
          [value]="formattedDate"
          placeholder="انتخاب تاریخ"
          (click)="toggleCalendar()"
          (focus)="toggleCalendar()"
          readonly>
        <button 
          class="date-input-btn"
          (click)="toggleCalendar()">
          📅
        </button>
      </div>

      <!-- calendar popup -->
      <div 
        class="calendar-popup"
        [class.visible]="isCalendarVisible">
        <!-- calendar switch -->
        <div class="calendar-header">
          <jalali-calendar-switch 
            [calendarType]="calendarType"
            (calendarChange)="onCalendarChange($event)">
          </jalali-calendar-switch>
          
          <button 
            class="theme-btn"
            (click)="toggleThemeSelector()">
            🎨
          </button>
        </div>

        <!-- theme selector -->
        <div 
          class="theme-panel"
          [class.visible]="isThemeSelectorVisible">
          <jalali-color-picker>
          </jalali-color-picker>
        </div>

        <!-- calendar -->
        <jalali-calendar 
          [calendarType]="calendarType"
          [selectedDate]="selectedDate"
          (dateSelect)="onDateSelect($event)"
          (monthChange)="onMonthChange($event)">
        </jalali-calendar>

        <!-- day info modal -->
        <jalali-day-info-modal 
          *ngIf="selectedDayInfo"
          [dayInfo]="selectedDayInfo"
          (closed)="selectedDayInfo = null">
        </jalali-day-info-modal>
      </div>
    </div>
  `,
  styles: [`
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
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
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
      
      &:hover {
        background: var(--secondary-color);
        color: white;
      }
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
      
      &.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
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
      
      &:hover {
        background: var(--secondary-color);
        color: white;
        border-color: var(--secondary-color);
      }
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
      
      &.visible {
        opacity: 1;
        visibility: visible;
        max-height: 200px;
        padding: 16px;
      }
    }
    
    /* Responsive design */
    @media (max-width: 600px) {
      .date-picker-container {
        max-width: 100%;
      }
      
      .calendar-popup {
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        min-width: 90vw;
        max-width: 90vw;
        
        &.visible {
          transform: translateX(-50%) translateY(0);
        }
      }
    }
    
    /* Close button on mobile */
    @media (max-width: 600px) {
      .calendar-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1000;
        
        &.visible {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  `]
})
export class JalaliDatePickerComponent implements OnInit {
  @Input() selectedDate: Date;
  @Output() dateSelect = new EventEmitter<Date>();
  @Output() calendarTypeChange = new EventEmitter<'jalali' | 'gregorian'>();

  isCalendarVisible = false;
  isThemeSelectorVisible = false;
  calendarType: 'jalali' | 'gregorian' = 'jalali';
  selectedDayInfo: DayInfo;

  constructor(private jalaliDateService: JalaliDateService) { }

  ngOnInit() {
    if (!this.selectedDate) {
      this.selectedDate = this.jalaliDateService.today();
    }
  }

  get formattedDate(): string {
    if (!this.selectedDate) return '';
    return this.jalaliDateService.formatDate(this.selectedDate, 'medium');
  }

  toggleCalendar() {
    this.isCalendarVisible = !this.isCalendarVisible;
    if (this.isCalendarVisible) {
      this.isThemeSelectorVisible = false;
    }
  }

  toggleThemeSelector() {
    this.isThemeSelectorVisible = !this.isThemeSelectorVisible;
  }

  onCalendarChange(type: 'jalali' | 'gregorian') {
    this.calendarType = type;
    this.calendarTypeChange.emit(type);
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.selectedDayInfo = this.jalaliDateService.getDayInfo(date);
    this.dateSelect.emit(date);
    this.isCalendarVisible = false;
  }

  onMonthChange(event: { year: number; month: number }) {
    console.log('Month changed:', event);
  }

  // Close calendar when clicking outside
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.date-picker-container')) {
      this.isCalendarVisible = false;
      this.isThemeSelectorVisible = false;
    }
  }
}
