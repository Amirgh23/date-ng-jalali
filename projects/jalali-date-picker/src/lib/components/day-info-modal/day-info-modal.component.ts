import { Component, Input, Output, EventEmitter, HostListener, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DayInfo } from '../../core/models/jalali-date.model';
import { DayInfoModalPassThroughOptions, PassThroughMethodOptions } from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';
import { GlobalPTConfigService } from '../../core/services/global-pt-config.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'jalali-day-info-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  template: `
    <div [class]="getOverlayClasses()" [ngStyle]="getOverlayStyles()" (click)="close()" *ngIf="isOpen" role="presentation" aria-hidden="false">
      <div [class]="getModalClasses()" [ngStyle]="getModalStyles()" (click)="$event.stopPropagation()" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div [class]="getHeaderClasses()" [ngStyle]="getHeaderStyles()">
          <h3 [class]="getTitleClasses()" [ngStyle]="getTitleStyles()" id="modal-title">{{ dayInfo.jalali.dayName }}</h3>
          <button 
            [class]="getCloseButtonClasses()" 
            [ngStyle]="getCloseButtonStyles()"
            (click)="close()" 
            aria-label="بستن پنجره اطلاعات روز"
            (keydown.enter)="close()"
            (keydown.space)="close()">×</button>
        </div>
        
        <div [class]="getContentClasses()" [ngStyle]="getContentStyles()">
          <!-- تاریخ‌ها -->
          <div [class]="getDateInfoClasses()" [ngStyle]="getDateInfoStyles()" role="region" aria-label="تاریخ‌های مختلف">
            <div class="date-item jalali" role="group" aria-labelledby="jalali-label">
              <span class="label" id="jalali-label">جلالی</span>
              <span class="value" aria-live="polite">{{ dayInfo.jalali.formatted }}</span>
            </div>
            <div class="date-item gregorian" role="group" aria-labelledby="gregorian-label">
              <span class="label" id="gregorian-label">میلادی</span>
              <span class="value" aria-live="polite">{{ dayInfo.gregorian.formatted }}</span>
            </div>
            <div class="date-item hijri" role="group" aria-labelledby="hijri-label">
              <span class="label" id="hijri-label">قمری</span>
              <span class="value" aria-live="polite">{{ dayInfo.hijri.formatted }}</span>
            </div>
          </div>
          
          <!-- وضعیت تعطیلی -->
          <div [class]="getHolidayInfoClasses()" [ngStyle]="getHolidayInfoStyles()" *ngIf="dayInfo.isHoliday" role="region" aria-label="وضعیت تعطیلی">
            <span [class]="getHolidayNameClasses()" [ngStyle]="getHolidayNameStyles()" [class.official]="dayInfo.holidayType === 'official'" aria-label="این روز تعطیل است">
              {{ dayInfo.holidayType === 'official' ? 'تعطیل رسمی' : 'تعطیل غیررسمی' }}
            </span>
          </div>
          
          <!-- رویدادها -->
          <div class="events-section" *ngIf="dayInfo.events.length > 0" role="region" aria-label="رویدادهای روز">
            <h4 id="events-title">رویدادها</h4>
            <ul role="list" aria-labelledby="events-title">
              <li *ngFor="let event of dayInfo.events" role="listitem">{{ event }}</li>
            </ul>
          </div>
          
          <!-- اطلاعات اضافی -->
          <div class="info-section" role="region" aria-label="اطلاعات اضافی">
            <span class="season" aria-label="فصل">{{ dayInfo.season }}</span>
            <span class="week" aria-label="شماره هفته">هفته {{ dayInfo.weekNumber }}</span>
          </div>

          <!-- یادداشت‌ها -->
          <div class="notes-section" *ngIf="showNotes" role="region" aria-label="یادداشت‌های روز">
            <h4 id="notes-title">یادداشت‌ها</h4>
            <textarea 
              class="note-input"
              [(ngModel)]="noteText"
              placeholder="یادداشت خود را اینجا بنویسید..."
              rows="4"
              aria-labelledby="notes-title"
              aria-describedby="notes-help"
              (keydown.escape)="close()"></textarea>
            <span id="notes-help" class="sr-only">برای ذخیره یادداشت، دکمه ذخیره را کلیک کنید</span>
            <div [class]="getFooterClasses()" [ngStyle]="getFooterStyles()">
              <button 
                [class]="getActionButtonClasses()" 
                [ngStyle]="getActionButtonStyles()"
                (click)="saveNote(noteText)"
                aria-label="ذخیره یادداشت"
                (keydown.enter)="saveNote(noteText)"
                (keydown.space)="saveNote(noteText)">ذخیره</button>
              <button 
                [class]="getActionButtonClasses()" 
                [ngStyle]="getActionButtonStyles()"
                (click)="deleteNote()" 
                *ngIf="noteText"
                aria-label="حذف یادداشت"
                (keydown.enter)="deleteNote()"
                (keydown.space)="deleteNote()">حذف</button>
            </div>
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

    .notes-section {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }

    .notes-section h4 {
      margin: 0 0 12px 0;
      color: var(--text-color);
      font-size: 16px;
      font-weight: 600;
    }

    .note-input {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: var(--background-light);
      color: var(--text-color);
      font-family: inherit;
      font-size: 14px;
      resize: vertical;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }

    .note-actions {
      display: flex;
      gap: 12px;
      margin-top: 12px;
    }

    .btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;

      &.primary {
        background: var(--primary-color);
        color: white;

        &:hover {
          background: var(--secondary-color);
        }
      }

      &.secondary {
        background: var(--background-light);
        color: var(--text-color);
        border: 1px solid var(--border-color);

        &:hover {
          background: var(--border-color);
        }
      }

      &:active {
        transform: scale(0.98);
      }
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
  `]
})
export class DayInfoModalComponent {
  @Input() dayInfo: DayInfo;
  @Input() showNotes: boolean = true;
  @Input() pt?: DayInfoModalPassThroughOptions;
  @Input() unstyled = false;
  @Output() closed = new EventEmitter<void>();
  @Output() noteSaved = new EventEmitter<string>();

  isOpen: boolean = true;
  noteText: string = '';

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly styleClassService = inject(StyleClassService);
  private readonly globalPTConfig = inject(GlobalPTConfigService);
  private readonly themeService = inject(ThemeService);

  ngOnInit() {
    if (this.dayInfo?.notes) {
      this.noteText = this.dayInfo.notes;
    }
  }

  // Pass-Through helper methods
  private getPTOptions(): DayInfoModalPassThroughOptions {
    const globalPT = this.globalPTConfig.getComponentConfig('dayInfoModal');
    const themePT = (this.themeService as any).themePT?.value?.dayInfoModal || {};
    
    // Merge: global < theme < component (component has highest priority)
    return {
      ...globalPT,
      ...themePT,
      ...this.pt
    };
  }

  private getPTContext(): PassThroughMethodOptions {
    return {
      instance: this,
      props: {
        unstyled: this.unstyled,
        visible: this.isOpen,
        showNotes: this.showNotes
      },
      state: {
        selectedDate: this.dayInfo,
        hasHoliday: this.dayInfo?.isHoliday || false,
        isOpen: this.isOpen
      },
      context: {
        date: this.dayInfo,
        holiday: this.dayInfo?.isHoliday ? {
          type: this.dayInfo.holidayType,
          events: this.dayInfo.events
        } : null,
        isVisible: this.isOpen
      }
    };
  }

  getRootClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getRootStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
    return resolved?.style || {};
  }

  getOverlayClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.overlay, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.overlay, this.getPTContext());
    return this.styleClassService.mergeClasses('modal-overlay', resolved?.class);
  }

  getOverlayStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.overlay, this.getPTContext());
    return resolved?.style || {};
  }

  getModalClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.modal, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.modal, this.getPTContext());
    return this.styleClassService.mergeClasses('modal-content', resolved?.class);
  }

  getModalStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.modal, this.getPTContext());
    return resolved?.style || {};
  }

  getHeaderClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.header, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.header, this.getPTContext());
    return this.styleClassService.mergeClasses('modal-header', resolved?.class);
  }

  getHeaderStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.header, this.getPTContext());
    return resolved?.style || {};
  }

  getTitleClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.title, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.title, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getTitleStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.title, this.getPTContext());
    return resolved?.style || {};
  }

  getCloseButtonClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.closeButton, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.closeButton, this.getPTContext());
    return this.styleClassService.mergeClasses('close-btn', resolved?.class);
  }

  getCloseButtonStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.closeButton, this.getPTContext());
    return resolved?.style || {};
  }

  getContentClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.content, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.content, this.getPTContext());
    return this.styleClassService.mergeClasses('modal-body', resolved?.class);
  }

  getContentStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.content, this.getPTContext());
    return resolved?.style || {};
  }

  getDateInfoClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.dateInfo, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.dateInfo, this.getPTContext());
    return this.styleClassService.mergeClasses('date-section', resolved?.class);
  }

  getDateInfoStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.dateInfo, this.getPTContext());
    return resolved?.style || {};
  }

  getHolidayInfoClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayInfo, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayInfo, this.getPTContext());
    return this.styleClassService.mergeClasses('holiday-section', resolved?.class);
  }

  getHolidayInfoStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayInfo, this.getPTContext());
    return resolved?.style || {};
  }

  getHolidayNameClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayName, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayName, this.getPTContext());
    return this.styleClassService.mergeClasses('holiday-badge', resolved?.class);
  }

  getHolidayNameStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayName, this.getPTContext());
    return resolved?.style || {};
  }

  getHolidayDescriptionClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayDescription, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayDescription, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getHolidayDescriptionStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.holidayDescription, this.getPTContext());
    return resolved?.style || {};
  }

  getFooterClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.footer, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.footer, this.getPTContext());
    return this.styleClassService.mergeClasses('note-actions', resolved?.class);
  }

  getFooterStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.footer, this.getPTContext());
    return resolved?.style || {};
  }

  getActionButtonClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.actionButton, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.actionButton, this.getPTContext());
    return this.styleClassService.mergeClasses('btn', resolved?.class);
  }

  getActionButtonStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.actionButton, this.getPTContext());
    return resolved?.style || {};
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
    this.cdr.markForCheck();
  }

  open(dayInfo: DayInfo): void {
    this.dayInfo = dayInfo;
    this.isOpen = true;
    if (dayInfo?.notes) {
      this.noteText = dayInfo.notes;
    }
    this.cdr.markForCheck();
  }

  saveNote(note: string): void {
    this.noteSaved.emit(note);
    if (this.dayInfo) {
      this.dayInfo.notes = note;
    }
    this.cdr.markForCheck();
  }

  deleteNote(): void {
    this.noteText = '';
    if (this.dayInfo) {
      this.dayInfo.notes = '';
    }
    this.noteSaved.emit('');
    this.cdr.markForCheck();
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
