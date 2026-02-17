# برنامه کامل - کتابخانه تقویم جلالی برای انگولار

## خلاصه

این پروژه یک کتابخانه کامل برای مدیریت تاریخ در انگولار است که شامل:
- تقویم‌های جلالی (شمسی) و میلادی
- پشتیبانی دو زبانه (فارسی/انگلیسی)
- کامپوننت انگولار و وب کامپوننت
- انتشار به عنوان پکیج npm

## معماری

```mermaid
graph TB
    subgraph هسته کتابخانه
        A[JalaliDateService] --> B[DateConversionService]
        A --> C[DateFormatService]
        B --> D[JalaliCalendarLogic]
        C --> E[LocaleService]
        F[HolidaysService] --> G[EventsDatabase]
    end
    
    subgraph کامپوننت‌ها
        H[JalaliDatePickerComponent] --> A
        I[JalaliCalendarComponent] --> A
        J[DayInfoModalComponent] --> F
        K[ThemeSelectorComponent] --> L[ThemeService]
    end
    
    subgraph سیستم تم‌ها
        L --> M[ThemeConfigs]
        M --> N[Sci-Fi Theme]
        M --> O[Glassmorphism Theme]
        M --> P[HUD Theme]
        M --> Q[Win95 Theme]
        M --> R[Minimal Theme]
    end
    
    subgraph وب کامپوننت‌ها
        S[Angular Elements] --> H
        S --> I
    end
```

## ساختار دایرکتوری

```
date-ng-jalali/
├── projects/
│   ├── jalali-date-picker/              # کتابخانه اصلی
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── core/
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── jalali-date.service.ts
│   │   │   │   │   │   ├── date-conversion.service.ts
│   │   │   │   │   │   ├── date-format.service.ts
│   │   │   │   │   │   ├── locale.service.ts
│   │   │   │   │   │   └── holidays.service.ts
│   │   │   │   │   ├── models/
│   │   │   │   │   │   ├── jalali-date.model.ts
│   │   │   │   │   │   ├── gregorian-date.model.ts
│   │   │   │   │   │   ├── hijri-date.model.ts
│   │   │   │   │   │   ├── day-info.model.ts
│   │   │   │   │   │   └── theme.model.ts
│   │   │   │   │   └── utils/
│   │   │   │   │       ├── jalali-calendar.utils.ts
│   │   │   │   │       ├── hijri-calendar.utils.ts
│   │   │   │   │       └── date-validators.utils.ts
│   │   │   │   ├── components/
│   │   │   │   │   ├── date-picker/
│   │   │   │   │   │   ├── jalali-date-picker.component.ts
│   │   │   │   │   │   ├── jalali-date-picker.component.html
│   │   │   │   │   │   └── jalali-date-picker.component.scss
│   │   │   │   │   ├── calendar/
│   │   │   │   │   │   ├── jalali-calendar.component.ts
│   │   │   │   │   │   └── ...
│   │   │   │   │   ├── day-info-modal/
│   │   │   │   │   │   ├── day-info-modal.component.ts
│   │   │   │   │   │   └── ...
│   │   │   │   │   └── theme-selector/
│   │   │   │   │       ├── theme-selector.component.ts
│   │   │   │   │       └── ...
│   │   │   │   └── themes/
│   │   │   │       ├── scifi-theme.scss
│   │   │   │       ├── glassmorphism-theme.scss
│   │   │   │       ├── hud-theme.scss
│   │   │   │       ├── win95-theme.scss
│   │   │   │       └── minimal-theme.scss
│   │   │   ├── assets/
│   │   │   │   ├── i18n/
│   │   │   │   │   ├── fa.json
│   │   │   │   │   └── en.json
│   │   │   │   └── data/
│   │   │   │       ├── holidays.json
│   │   │   │       └── events.json
│   │   │   ├── public-api.ts
│   │   │   └── jalali-date-picker.module.ts
│   │   ├── ng-package.json
│   │   ├── package.json
│   │   └── README.md
│   └── jalali-date-elements/           # وب کامپوننت‌ها
│       ├── src/
│       │   └── app/
│       │       └── elements/
│       │           └── jalali-date-picker.element.ts
│       └── ...
├── src/                                # اپلیکیشن دمو
│   └── app/
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## سیستم تم‌ها

### ۱. تم علمی-تخیلی (Sci-Fi)
```scss
// تم آینده‌نگر با افکت‌های نئون
.scifi-theme {
  --primary-color: #00ffff;
  --secondary-color: #ff00ff;
  --background: rgba(0, 20, 40, 0.9);
  --glow-effect: 0 0 10px var(--primary-color);
  --border: 1px solid var(--primary-color);
  
  .calendar-day {
    border: 1px solid var(--primary-color);
    box-shadow: var(--glow-effect);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 0 20px var(--primary-color);
      transform: scale(1.1);
    }
  }
}
```

### ۲. تم شیشه‌ای (Glassmorphism)
```scss
// تم کریستالی با شفافیت
.glassmorphism-theme {
  --primary-color: #6366f1;
  --background: rgba(255, 255, 255, 0.1);
  --blur: blur(10px);
  --border: 1px solid rgba(255, 255, 255, 0.2);
  
  .calendar-container {
    background: var(--background);
    backdrop-filter: var(--blur);
    border-radius: 16px;
    border: var(--border);
  }
}
```

### ۳. تم HUD
```scss
// تم نمایشگر سبز رنگ
.hud-theme {
  --primary-color: #00ff00;
  --background: rgba(0, 10, 0, 0.8);
  --scanline: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 0, 0.1) 2px,
    rgba(0, 255, 0, 0.1) 4px
  );
  
  .calendar-container {
    background: var(--background);
    border: 2px solid var(--primary-color);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--scanline);
      pointer-events: none;
    }
  }
}
```

### ۴. تم ویندوز ۹۵
```scss
// تم کلاسیک رترو
.win95-theme {
  --primary-color: #000080;
  --background: #c0c0c0;
  --border-outset: 2px outset #ffffff;
  --border-inset: 2px inset #808080;
  
  .calendar-container {
    background: var(--background);
    border: var(--border-outset);
    box-shadow: none;
  }
  
  .calendar-day {
    border: var(--border-outset);
    
    &:active {
      border: var(--border-inset);
    }
  }
}
```

### ۵. تم مینیمال
```scss
// تم ساده و مدرن
.minimal-theme {
  --primary-color: #3b82f6;
  --background: #ffffff;
  --border: 1px solid #e5e7eb;
  
  .calendar-container {
    background: var(--background);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}
```

## مودال اطلاعات روز

### ساختار داده‌ها
```typescript
interface DayInfo {
  // تاریخ در تقویم‌های مختلف
  jalali: {
    year: number;
    month: number;
    day: number;
    monthName: string;
    dayName: string;
    formatted: string;
  };
  gregorian: {
    year: number;
    month: number;
    day: number;
    monthName: string;
    dayName: string;
    formatted: string;
  };
  hijri: {
    year: number;
    month: number;
    day: number;
    monthName: string;
    formatted: string;
  };
  
  // اطلاعات اضافی
  isHoliday: boolean;
  holidayType: 'official' | 'non-official' | null;
  events: string[];
  season: string;
  weekNumber: number;
}
```

### کامپوننت مودال
```typescript
@Component({
  selector: 'jalali-day-info-modal',
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
  `
})
export class DayInfoModalComponent {
  @Input() dayInfo: DayInfo;
  @Output() closed = new EventEmitter<void>();
  
  close() {
    this.closed.emit();
  }
}
```

## تغییر تقویم

### کامپوننت تغییر
```typescript
@Component({
  selector: 'jalali-calendar-switch',
  template: `
    <div class="calendar-switch">
      <button 
        class="switch-btn" 
        [class.active]="calendarType === 'jalali'"
        (click)="switchCalendar('jalali')">
        <span class="icon">جلالی</span>
        <span class="label">جلالی</span>
      </button>
      
      <div class="switch-divider"></div>
      
      <button 
        class="switch-btn" 
        [class.active]="calendarType === 'gregorian'"
        (click)="switchCalendar('gregorian')">
        <span class="icon">میلادی</span>
        <span class="label">میلادی</span>
      </button>
    </div>
  `,
  styles: [`
    .calendar-switch {
      display: flex;
      align-items: center;
      background: var(--switch-bg);
      border-radius: 8px;
      padding: 4px;
    }
    
    .switch-btn {
      padding: 8px 16px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background: var(--primary-color);
        color: white;
        border-radius: 6px;
      }
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
```

## سیستم رنگ پویا

### سرویس تم‌ها
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeConfig>(DEFAULT_THEME);
  private colorPalette = new BehaviorSubject<ColorPalette>(DEFAULT_PALETTE);
  
  // بارگذاری از localStorage
  loadSavedSettings() {
    const savedTheme = localStorage.getItem('jalali-datepicker-theme');
    const savedPalette = localStorage.getItem('jalali-datepicker-palette');
    
    if (savedTheme) {
      this.setTheme(JSON.parse(savedTheme));
    }
    if (savedPalette) {
      this.setPalette(JSON.parse(savedPalette));
    }
  }
  
  // تنظیم تم
  setTheme(theme: ThemeConfig) {
    this.currentTheme.next(theme);
    localStorage.setItem('jalali-datepicker-theme', JSON.stringify(theme));
    this.applyTheme(theme);
  }
  
  // تنظیم پالت رنگی
  setPalette(palette: ColorPalette) {
    this.colorPalette.next(palette);
    localStorage.setItem('jalali-datepicker-palette', JSON.stringify(palette));
    this.applyPalette(palette);
  }
  
  // اعمال تم به DOM
  private applyTheme(theme: ThemeConfig) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.name);
  }
  
  // اعمال رنگ‌ها به DOM
  private applyPalette(palette: ColorPalette) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', palette.primary);
    root.style.setProperty('--secondary-color', palette.secondary);
    root.style.setProperty('--accent-color', palette.accent);
  }
}
```

### انتخاب‌گر رنگ
```typescript
interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

@Component({
  selector: 'jalali-color-picker',
  template: `
    <div class="color-picker">
      <div class="color-item" *ngFor="let color of predefinedColors">
        <label>{{ color.name }}</label>
        <input 
          type="color" 
          [value]="color.value"
          (input)="updateColor(color.key, $event)">
      </div>
      
      <div class="preset-palettes">
        <button 
          *ngFor="let palette of presetPalettes"
          class="palette-btn"
          (click)="applyPalette(palette)">
          <span *ngFor="let color of [palette.primary, palette.secondary, palette.accent]"
                [style.background]="color">
          </span>
        </button>
      </div>
    </div>
  `
})
export class ColorPickerComponent {
  @Output() paletteChange = new EventEmitter<ColorPalette>();
  
  predefinedColors = [
    { key: 'primary', name: 'اصلی', value: '#3b82f6' },
    { key: 'secondary', name: 'ثانویه', value: '#6366f1' },
    { key: 'accent', name: 'تاکیدی', value: '#f59e0b' }
  ];
  
  presetPalettes: ColorPalette[] = [
    { primary: '#3b82f6', secondary: '#6366f1', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
    { primary: '#10b981', secondary: '#059669', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
    { primary: '#ef4444', secondary: '#dc2626', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
    // ... پالت‌های بیشتر
  ];
}
```

## مراحل پیاده‌سازی

### مرحله ۱: ساختار پایه
1. ایجاد workspace انگولار
2. ایجاد پروژه کتابخانه
3. پیاده‌سازی منطق تبدیل تاریخ
4. مدل‌ها و اینترفیس‌های پایه

### مرحله ۲: کامپوننت‌های اصلی
1. کامپوننت تقویم
2. کامپوننت انتخاب‌گر تاریخ
3. دایرکتیو ورودی تاریخ
4. یکپارچه‌سازی با فرم‌ها

### مرحله ۳: سیستم تم‌ها
1. ایجاد استایل‌ها برای هر تم
2. پیاده‌سازی ThemeService
3. کامپوننت انتخاب‌گر تم
4. سیستم رنگ پویا

### مرحله ۴: اطلاعات روز
1. پایگاه داده تعطیلات
2. سرویس تعطیلات
3. مودال اطلاعات روز
4. یکپارچه‌سازی با تقویم

### مرحله ۵: تغییر تقویم
1. منطق تغییر تقویم
2. کامپوننت تغییر
3. انیمیشن‌های انتقال
4. حفظ تاریخ انتخاب شده

### مرحله ۶: وب کامپوننت‌ها
1. پیکربندی Angular Elements
2. wrapper وب کامپوننت
3. بهینه‌سازی bundle

### مرحله ۷: انتشار
1. مستندات
2. اپلیکیشن دمو
3. آماده‌سازی پکیج npm
4. انتشار در npm

---

*ایجاد شده: ۲۰۲۶-۰۲-۱۶*
*نویسنده: امیررضا غفاریان*
