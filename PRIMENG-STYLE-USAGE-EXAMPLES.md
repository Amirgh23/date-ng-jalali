# نمونه‌های استفاده از سیستم استایل‌دهی PrimeNG

این فایل شامل مثال‌های عملی برای استفاده از سیستم Pass Through و استایل‌دهی است.

## 1. استفاده پایه (Styled Mode)

### نصب و راه‌اندازی

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  // ...
};
```

```scss
// styles.scss
@import 'jalali-date-picker/themes/styled/lara-light-blue';
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { JalaliCalendarComponent } from 'jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JalaliCalendarComponent],
  template: `
    <jalali-calendar
      [(selectedDate)]="selectedDate"
      [calendarType]="'jalali'">
    </jalali-calendar>
  `
})
export class AppComponent {
  selectedDate = new Date();
}
```

## 2. استفاده از Pass Through با Tailwind CSS

### تنظیمات Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/jalali-date-picker/**/*.{html,ts}"
  ],
  theme: {
    extend: {}
  }
}
```

### کامپوننت با PT

```typescript
import { Component } from '@angular/core';
import { JalaliCalendarComponent, CalendarPassThroughOptions } from 'jalali-date-picker';

@Component({
  selector: 'app-tailwind-calendar',
  standalone: true,
  imports: [JalaliCalendarComponent],
  template: `
    <jalali-calendar
      [unstyled]="true"
      [pt]="passThrough"
      [(selectedDate)]="selectedDate">
    </jalali-calendar>
  `
})
export class TailwindCalendarComponent {
  selectedDate = new Date();
  
  passThrough: CalendarPassThroughOptions = {
    root: {
      class: 'bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md mx-auto'
    },
    header: {
      class: 'flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700'
    },
    title: {
      class: 'flex items-center gap-2'
    },
    monthName: {
      class: 'text-2xl font-bold text-gray-900 dark:text-white'
    },
    yearName: {
      class: 'text-2xl text-gray-600 dark:text-gray-400'
    },
    previousButton: {
      class: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
    },
    nextButton: {
      class: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
    },
    todayButton: {
      class: 'px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200'
    },
    grid: {
      class: 'grid grid-cols-7 gap-2'
    },
    dayHeader: {
      class: 'text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2'
    },
    dayCell: {
      class: [
        'aspect-square flex items-center justify-center',
        'rounded-lg cursor-pointer transition-all duration-200',
        'hover:bg-blue-50 dark:hover:bg-blue-900/20',
        'focus:outline-none focus:ring-2 focus:ring-blue-500'
      ]
    }
  };
}
```

## 3. Pass Through با توابع پویا

```typescript
import { Component } from '@angular/core';
import { CalendarPassThroughOptions } from 'jalali-date-picker';

@Component({
  selector: 'app-dynamic-calendar',
  template: `
    <jalali-calendar
      [unstyled]="true"
      [pt]="dynamicPT"
      [(selectedDate)]="selectedDate">
    </jalali-calendar>
  `
})
export class DynamicCalendarComponent {
  selectedDate = new Date();
  
  dynamicPT: CalendarPassThroughOptions = {
    root: {
      class: 'custom-calendar',
      style: { maxWidth: '400px', margin: '0 auto' }
    },
    
    // تابع پویا برای day cell
    dayCell: (options) => {
      const date = options.context?.date;
      const isWeekend = date?.getDay() === 5; // جمعه
      const isToday = this.isToday(date);
      
      return {
        class: [
          'day-cell',
          {
            'weekend': isWeekend,
            'today': isToday,
            'past': date < new Date()
          }
        ],
        style: {
          backgroundColor: isToday ? '#3b82f6' : undefined,
          color: isToday ? 'white' : undefined,
          fontWeight: isToday ? 'bold' : 'normal'
        },
        data: {
          date: date?.toISOString(),
          weekend: isWeekend
        }
      };
    }
  };
  
  private isToday(date: Date): boolean {
    const today = new Date();
    return date?.toDateString() === today.toDateString();
  }
}
```

## 4. استفاده با Bootstrap

```typescript
import { Component } from '@angular/core';
import { CalendarPassThroughOptions } from 'jalali-date-picker';

@Component({
  selector: 'app-bootstrap-calendar',
  template: `
    <jalali-calendar
      [unstyled]="true"
      [pt]="bootstrapPT"
      [(selectedDate)]="selectedDate">
    </jalali-calendar>
  `
})
export class BootstrapCalendarComponent {
  selectedDate = new Date();
  
  bootstrapPT: CalendarPassThroughOptions = {
    root: {
      class: 'card shadow-lg'
    },
    header: {
      class: 'card-header d-flex justify-content-between align-items-center'
    },
    title: {
      class: 'd-flex align-items-center gap-2'
    },
    monthName: {
      class: 'h4 mb-0 fw-bold'
    },
    yearName: {
      class: 'h4 mb-0 text-muted'
    },
    previousButton: {
      class: 'btn btn-outline-primary btn-sm'
    },
    nextButton: {
      class: 'btn btn-outline-primary btn-sm'
    },
    todayButton: {
      class: 'btn btn-primary btn-sm'
    },
    grid: {
      class: 'card-body'
    },
    dayHeader: {
      class: 'text-center fw-semibold text-secondary py-2'
    },
    dayCell: {
      class: 'btn btn-outline-secondary btn-sm m-1'
    }
  };
}
```

## 5. تم سفارشی با CSS Variables

```typescript
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'jalali-date-picker';

@Component({
  selector: 'app-custom-theme',
  template: `
    <div class="theme-customizer">
      <h3>ویرایشگر تم</h3>
      
      <div class="color-picker">
        <label>رنگ اصلی:</label>
        <input 
          type="color" 
          [(ngModel)]="primaryColor"
          (change)="updateTheme()">
      </div>
      
      <div class="color-picker">
        <label>رنگ پس‌زمینه:</label>
        <input 
          type="color" 
          [(ngModel)]="backgroundColor"
          (change)="updateTheme()">
      </div>
      
      <div class="slider">
        <label>شعاع گوشه: {{ borderRadius }}px</label>
        <input 
          type="range" 
          min="0" 
          max="20" 
          [(ngModel)]="borderRadius"
          (input)="updateTheme()">
      </div>
      
      <jalali-calendar [(selectedDate)]="selectedDate"></jalali-calendar>
    </div>
  `
})
export class CustomThemeComponent implements OnInit {
  selectedDate = new Date();
  primaryColor = '#3b82f6';
  backgroundColor = '#ffffff';
  borderRadius = 6;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.updateTheme();
  }
  
  updateTheme() {
    this.themeService.updateCSSVariables({
      'jdp-primary-500': this.primaryColor,
      'jdp-primary-600': this.adjustColor(this.primaryColor, -10),
      'jdp-surface-0': this.backgroundColor,
      'jdp-border-radius': `${this.borderRadius}px`
    });
  }
  
  private adjustColor(color: string, percent: number): string {
    // تبدیل hex به RGB و تنظیم روشنایی
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }
}
```

## 6. تغییر تم در زمان اجرا

```typescript
import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from 'jalali-date-picker';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <div class="theme-switcher-container">
      <div class="theme-buttons">
        <button 
          *ngFor="let theme of themes"
          (click)="switchTheme(theme.name)"
          [class.active]="currentTheme?.name === theme.name"
          class="theme-button">
          {{ theme.displayName }}
        </button>
      </div>
      
      <jalali-calendar [(selectedDate)]="selectedDate"></jalali-calendar>
    </div>
  `,
  styles: [`
    .theme-buttons {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    
    .theme-button {
      padding: 0.5rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .theme-button:hover {
      border-color: #3b82f6;
      background: #eff6ff;
    }
    
    .theme-button.active {
      border-color: #3b82f6;
      background: #3b82f6;
      color: white;
    }
  `]
})
export class ThemeSwitcherComponent implements OnInit {
  selectedDate = new Date();
  themes: Theme[] = [];
  currentTheme: Theme | null = null;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themes = this.themeService.getThemes();
    
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }
  
  switchTheme(themeName: string) {
    this.themeService.switchTheme(themeName)
      .then(() => {
        console.log('Theme switched successfully');
      })
      .catch(error => {
        console.error('Failed to switch theme:', error);
      });
  }
}
```

## 7. استفاده ترکیبی (Styled + PT Override)

```typescript
import { Component } from '@angular/core';
import { CalendarPassThroughOptions } from 'jalali-date-picker';

@Component({
  selector: 'app-hybrid-calendar',
  template: `
    <jalali-calendar
      [pt]="partialPT"
      [(selectedDate)]="selectedDate">
    </jalali-calendar>
  `
})
export class HybridCalendarComponent {
  selectedDate = new Date();
  
  // فقط بخش‌هایی که می‌خواهیم override کنیم
  partialPT: CalendarPassThroughOptions = {
    root: {
      class: 'my-custom-calendar',
      style: { 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px'
      }
    },
    
    dayCell: (options) => {
      const date = options.context?.date;
      const dayOfWeek = date?.getDay();
      
      return {
        class: {
          'friday-special': dayOfWeek === 5,
          'thursday-special': dayOfWeek === 4
        },
        style: {
          background: dayOfWeek === 5 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : undefined,
          color: dayOfWeek === 5 ? 'white' : undefined
        }
      };
    }
  };
}
```

```scss
// styles.scss
@import 'jalali-date-picker/themes/styled/lara-light-blue';

// Override در لایه overrides
@layer jdp-overrides {
  .my-custom-calendar {
    max-width: 500px;
    margin: 2rem auto;
  }
  
  .friday-special {
    font-weight: bold;
    position: relative;
    
    &::after {
      content: '🕌';
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: 10px;
    }
  }
  
  .thursday-special {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
    color: white !important;
  }
}
```

## 8. استفاده در فرم‌ها

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarPassThroughOptions } from 'jalali-date-picker';

@Component({
  selector: 'app-form-calendar',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>تاریخ تولد:</label>
        <jalali-calendar
          [pt]="formPT"
          formControlName="birthDate"
          [maxDate]="today">
        </jalali-calendar>
        <div *ngIf="form.get('birthDate')?.invalid && form.get('birthDate')?.touched">
          <small class="error">تاریخ تولد الزامی است</small>
        </div>
      </div>
      
      <button type="submit" [disabled]="form.invalid">ثبت</button>
    </form>
  `
})
export class FormCalendarComponent {
  today = new Date();
  form: FormGroup;
  
  formPT: CalendarPassThroughOptions = {
    root: {
      class: 'form-calendar'
    },
    dayCell: {
      class: 'form-day-cell'
    }
  };
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      birthDate: [null, Validators.required]
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

## نتیجه‌گیری

این مثال‌ها نشان می‌دهند که چگونه می‌توانید:

1. از تم‌های آماده استفاده کنید
2. با Pass Through کامل کنترل داشته باشید
3. با فریمورک‌های مختلف CSS کار کنید
4. تم‌های سفارشی ایجاد کنید
5. استایل‌ها را به صورت پویا تغییر دهید

سیستم Pass Through انعطاف‌پذیری کامل را فراهم می‌کند در حالی که تم‌های آماده سرعت توسعه را افزایش می‌دهند.
