import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayInfo } from '../../core/models/jalali-date.model';

@Component({
  selector: 'jalali-day-info-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ dayInfo.jalali.dayName }}</h3>
          <button class="close-btn" (click)="close()">×</button>
        </div>
        
        <div class="modal-body">
          <!-- تاریخ‌ها -->
          <div class="date-section">
            <div class="date-item jalali">
              <span class="label">جلالی</span>
              <span class="value">{{ dayInfo.jalali.formatted }}</span>
            </div>
            <div class="date-item gregorian">
              <span class="label">میلادی</span>
              <span class="value">{{ dayInfo.gregorian.formatted }}</span>
            </div>
            <div class="date-item hijri">
              <span class="label">قمری</span>
              <span class="value">{{ dayInfo.hijri.formatted }}</span>
            </div>
          </div>
          
          <!-- وضعیت تعطیلی -->
          <div class="holiday-section" *ngIf="dayInfo.isHoliday">
            <span class="holiday-badge" [class.official]="dayInfo.holidayType === 'official'">
              {{ dayInfo.holidayType === 'official' ? 'تعطیل رسمی' : 'تعطیل غیررسمی' }}
            </span>
          </div>
          
          <!-- رویدادها -->
          <div class="events-section" *ngIf="dayInfo.events.length > 0">
            <h4>رویدادها</h4>
            <ul>
              <li *ngFor="let event of dayInfo.events">{{ event }}</li>
            </ul>
          </div>
          
          <!-- اطلاعات اضافی -->
          <div class="info-section">
            <span class="season">{{ dayInfo.season }}</span>
            <span class="week">هفته {{ dayInfo.weekNumber }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
      background: var(--background);
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h3 {
      margin: 0;
      color: var(--text-color);
      font-size: 20px;
      font-weight: 600;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--text-color);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
      
      &:hover {
        background: var(--secondary-color);
        color: white;
      }
    }
    
    .modal-body {
      padding: 24px;
    }
    
    .date-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .date-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--background-light);
      border-radius: 8px;
      border: 1px solid var(--border-color);
      
      &.jalali {
        border-left: 3px solid var(--primary-color);
      }
      
      &.gregorian {
        border-left: 3px solid var(--secondary-color);
      }
      
      &.hijri {
        border-left: 3px solid var(--accent-color);
      }
    }
    
    .date-item .label {
      font-size: 14px;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    .date-item .value {
      font-size: 16px;
      color: var(--text-color);
      font-weight: 600;
    }
    
    .holiday-section {
      margin-bottom: 24px;
    }
    
    .holiday-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      
      &.official {
        background: var(--primary-color);
      }
      
      &:not(.official) {
        background: var(--accent-color);
      }
    }
    
    .events-section {
      margin-bottom: 24px;
    }
    
    .events-section h4 {
      margin: 0 0 12px 0;
      color: var(--text-color);
      font-size: 16px;
      font-weight: 600;
    }
    
    .events-section ul {
      margin: 0;
      padding-left: 20px;
      list-style: none;
    }
    
    .events-section li {
      padding: 8px 0;
      color: var(--text-color);
      font-size: 14px;
      position: relative;
      
      &:before {
        content: '•';
        position: absolute;
        left: -15px;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
    
    .info-section {
      display: flex;
      justify-content: space-between;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      font-size: 14px;
      color: var(--text-muted);
    }
    
    .season {
      display: flex;
      align-items: center;
    }
    
    .week {
      display: flex;
      align-items: center;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class DayInfoModalComponent {
  @Input() dayInfo: DayInfo;
  @Output() closed = new EventEmitter<void>();
  
  close() {
    this.closed.emit();
  }
}
