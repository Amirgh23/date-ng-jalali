import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarSwitchPassThroughOptions, PassThroughMethodOptions } from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';
import { GlobalPTConfigService } from '../../core/services/global-pt-config.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'jalali-calendar-switch',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      [class]="getRootClasses()" 
      [ngStyle]="getRootStyles()"
      role="group" 
      aria-label="انتخاب نوع تقویم">
      <button 
        [class]="getButtonClasses('jalali')"
        [ngStyle]="getButtonStyles('jalali')"
        (click)="switchCalendar('jalali')"
        [attr.aria-pressed]="calendarType === 'jalali'"
        aria-label="تقویم جلالی"
        (keydown.enter)="switchCalendar('jalali')"
        (keydown.space)="switchCalendar('jalali')"
        tabindex="0">
        <span 
          [class]="getButtonTextClasses('jalali')"
          [ngStyle]="getButtonTextStyles('jalali')">جلالی</span>
      </button>
      
      <div class="switch-divider" aria-hidden="true"></div>
      
      <button 
        [class]="getButtonClasses('gregorian')"
        [ngStyle]="getButtonStyles('gregorian')"
        (click)="switchCalendar('gregorian')"
        [attr.aria-pressed]="calendarType === 'gregorian'"
        aria-label="تقویم میلادی"
        (keydown.enter)="switchCalendar('gregorian')"
        (keydown.space)="switchCalendar('gregorian')"
        tabindex="0">
        <span 
          [class]="getButtonTextClasses('gregorian')"
          [ngStyle]="getButtonTextStyles('gregorian')">میلادی</span>
      </button>
      
      <div class="switch-divider" aria-hidden="true"></div>
      
      <button 
        [class]="getButtonClasses('hijri')"
        [ngStyle]="getButtonStyles('hijri')"
        (click)="switchCalendar('hijri')"
        [attr.aria-pressed]="calendarType === 'hijri'"
        aria-label="تقویم قمری"
        (keydown.enter)="switchCalendar('hijri')"
        (keydown.space)="switchCalendar('hijri')"
        tabindex="0">
        <span 
          [class]="getButtonTextClasses('hijri')"
          [ngStyle]="getButtonTextStyles('hijri')">قمری</span>
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
  @Input() calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  @Input() pt?: CalendarSwitchPassThroughOptions;
  @Input() unstyled = false;
  @Output() calendarChange = new EventEmitter<'jalali' | 'gregorian' | 'hijri'>();
  
  private readonly styleClassService = inject(StyleClassService);
  private readonly globalPTConfig = inject(GlobalPTConfigService);
  private readonly themeService = inject(ThemeService);
  
  switchCalendar(type: 'jalali' | 'gregorian' | 'hijri') {
    this.calendarType = type;
    this.calendarChange.emit(type);
  }
  
  // Pass-Through helper methods
  private getPTOptions(): CalendarSwitchPassThroughOptions {
    const globalPT = this.globalPTConfig.getComponentConfig('calendarSwitch');
    const themePT = (this.themeService as any).themePT?.value?.calendarSwitch || {};
    
    // Merge: global < theme < component (component has highest priority)
    return {
      ...globalPT,
      ...themePT,
      ...this.pt
    };
  }

  private getPTContext(calendarType?: string): PassThroughMethodOptions {
    return {
      instance: this,
      props: {
        unstyled: this.unstyled,
        calendarType: this.calendarType
      },
      state: {
        activeType: this.calendarType
      },
      context: {
        calendarType: calendarType,
        isActive: calendarType === this.calendarType
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
    return this.styleClassService.mergeClasses('calendar-switch', resolved?.class);
  }

  getRootStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
    return resolved?.style || {};
  }

  getLabelClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.label, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.label, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getLabelStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.label, this.getPTContext());
    return resolved?.style || {};
  }

  getButtonGroupClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.buttonGroup, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.buttonGroup, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getButtonGroupStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.buttonGroup, this.getPTContext());
    return resolved?.style || {};
  }

  getButtonClasses(type: 'jalali' | 'gregorian' | 'hijri'): string {
    const isActive = type === this.calendarType;
    const ptOptions = this.getPTOptions();
    
    // Use activeButton PT option if button is active, otherwise use button PT option
    const ptOption = isActive ? ptOptions.activeButton : ptOptions.button;
    const resolved = this.styleClassService.resolvePassThrough(ptOption, this.getPTContext(type));
    
    if (this.unstyled) {
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    return this.styleClassService.mergeClasses(
      'switch-btn',
      { 'active': isActive },
      resolved?.class
    );
  }

  getButtonStyles(type: 'jalali' | 'gregorian' | 'hijri'): any {
    const isActive = type === this.calendarType;
    const ptOptions = this.getPTOptions();
    
    // Use activeButton PT option if button is active, otherwise use button PT option
    const ptOption = isActive ? ptOptions.activeButton : ptOptions.button;
    const resolved = this.styleClassService.resolvePassThrough(ptOption, this.getPTContext(type));
    
    return resolved?.style || {};
  }

  getActiveButtonClasses(type: 'jalali' | 'gregorian' | 'hijri'): string {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.activeButton, this.getPTContext(type));
    
    if (this.unstyled) {
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    return this.styleClassService.mergeClasses('switch-btn active', resolved?.class);
  }

  getActiveButtonStyles(type: 'jalali' | 'gregorian' | 'hijri'): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.activeButton, this.getPTContext(type));
    return resolved?.style || {};
  }

  getIconClasses(type: 'jalali' | 'gregorian' | 'hijri'): string {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.icon, this.getPTContext(type));
    
    if (this.unstyled) {
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getIconStyles(type: 'jalali' | 'gregorian' | 'hijri'): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.icon, this.getPTContext(type));
    return resolved?.style || {};
  }

  getButtonTextClasses(type: 'jalali' | 'gregorian' | 'hijri'): string {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.buttonText, this.getPTContext(type));
    
    if (this.unstyled) {
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    return this.styleClassService.mergeClasses('label', resolved?.class);
  }

  getButtonTextStyles(type: 'jalali' | 'gregorian' | 'hijri'): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.buttonText, this.getPTContext(type));
    return resolved?.style || {};
  }
}
