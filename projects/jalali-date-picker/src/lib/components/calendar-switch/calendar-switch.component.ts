import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jalali-calendar-switch',
  standalone: true,
  template: `
    <div class="calendar-switch">
      <button 
        class="switch-btn" 
        [class.active]="calendarType === 'jalali'"
        (click)="switchCalendar('jalali')">
        <span class="label">جلالی</span>
      </button>
      
      <div class="switch-divider"></div>
      
      <button 
        class="switch-btn" 
        [class.active]="calendarType === 'gregorian'"
        (click)="switchCalendar('gregorian')">
        <span class="label">میلادی</span>
      </button>
    </div>
  `,
  styles: [`
    .calendar-switch {
      display: flex;
      align-items: center;
      background: var(--background);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 4px;
      transition: all 0.3s ease;
    }
    
    .switch-btn {
      padding: 8px 16px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
      color: var(--text-color);
      font-size: 14px;
      font-weight: 500;
      
      &.active {
        background: var(--primary-color);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      &:hover {
        background: var(--secondary-color);
        color: white;
      }
    }
    
    .switch-divider {
      width: 1px;
      height: 24px;
      background: var(--border-color);
      margin: 0 8px;
    }
  `]
})
export class CalendarSwitchComponent {
  @Input() calendarType: 'jalali' | 'gregorian' = 'jalali';
  @Output() calendarChange = new EventEmitter<'jalali' | 'gregorian'>();
  
  switchCalendar(type: 'jalali' | 'gregorian') {
    this.calendarType = type;
    this.calendarChange.emit(type);
  }
}
