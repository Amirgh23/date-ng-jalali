# راهنمای توسعه‌دهنده - تقویم جلالی تعاملی

## 🚀 شروع سریع

### ۱. نصب وابستگی‌ها

```bash
# نصب Node.js و npm
# https://nodejs.org/

# نصب Angular CLI
npm install -g @angular/cli

# نصب وابستگی‌های پروژه
npm install
```

### ۲. اجرای پروژه

```bash
# اجرای demo
ng serve demo

# یا
npm run dev

# سپس مرورگر را باز کنید
# http://localhost:4200
```

### ۳. Build کتابخانه

```bash
# Build کتابخانه
ng build jalali-date-picker

# یا
npm run build:lib

# فایل‌های dist در اینجا قرار می‌گیرند
# dist/jalali-date-picker/
```

---

## 📁 ساختار پروژه

```
jalali-date-picker/
├── projects/
│   ├── demo/                    # اپلیکیشن demo
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── index.html
│   │   │   └── main.ts
│   │   └── tsconfig.app.json
│   │
│   └── jalali-date-picker/      # کتابخانه اصلی
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/
│       │   │   ├── core/
│       │   │   ├── themes/
│       │   │   └── jalali-date-picker.ts
│       │   └── public-api.ts
│       ├── ng-package.json
│       └── tsconfig.lib.json
│
├── angular.json                 # تنظیمات Angular
├── tsconfig.json               # تنظیمات TypeScript
├── package.json                # وابستگی‌ها
└── README.md                   # مستندات
```

---

## 🔧 دستورات مفید

### Development

```bash
# اجرای dev server
npm run dev

# اجرای dev server برای کتابخانه
ng serve jalali-date-picker

# اجرای dev server برای demo
ng serve demo
```

### Build

```bash
# Build کتابخانه
npm run build:lib

# Build demo
npm run build:demo

# Build برای production
npm run build:prod
```

### Testing

```bash
# اجرای تست‌ها
npm run test

# اجرای تست‌ها با coverage
npm run test:coverage

# اجرای E2E تست‌ها
npm run e2e
```

### Linting

```bash
# بررسی کد
npm run lint

# اصلاح خودکار مشکلات
npm run lint:fix
```

### Documentation

```bash
# تولید Storybook
npm run storybook

# تولید API documentation
npm run docs
```

---

## 📝 نوشتن کد

### ۱. ایجاد کامپوننت جدید

```bash
# استفاده از Angular CLI
ng generate component components/my-component --project=jalali-date-picker

# یا دستی
mkdir -p projects/jalali-date-picker/src/lib/components/my-component
```

**ساختار کامپوننت**:
```
my-component/
├── my-component.component.ts
├── my-component.component.html
├── my-component.component.scss
└── my-component.component.spec.ts
```

**کد نمونه**:
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent {
  @Input() data: any;
  @Output() dataChanged = new EventEmitter<any>();
  
  onDataChange(newData: any) {
    this.dataChanged.emit(newData);
  }
}
```

### ۲. ایجاد سرویس جدید

```bash
# استفاده از Angular CLI
ng generate service core/services/my-service --project=jalali-date-picker

# یا دستی
touch projects/jalali-date-picker/src/lib/core/services/my-service.ts
```

**کد نمونه**:
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private data = new BehaviorSubject<any>(null);
  data$ = this.data.asObservable();
  
  constructor() {}
  
  getData(): any {
    return this.data.value;
  }
  
  setData(value: any): void {
    this.data.next(value);
  }
}
```

### ۳. ایجاد Model جدید

```typescript
// projects/jalali-date-picker/src/lib/core/models/my-model.ts

export interface MyModel {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type MyModelType = 'type1' | 'type2' | 'type3';
```

### ۴. ایجاد Utility جدید

```typescript
// projects/jalali-date-picker/src/lib/core/utils/my-utils.ts

export class MyUtils {
  static doSomething(input: string): string {
    // پیاده‌سازی
    return input.toUpperCase();
  }
  
  static doSomethingElse(input: number): number {
    // پیاده‌سازی
    return input * 2;
  }
}
```

---

## 🧪 نوشتن تست‌ها

### Unit Test

```typescript
// my-component.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit dataChanged event', () => {
    spyOn(component.dataChanged, 'emit');
    component.onDataChange({ test: 'data' });
    expect(component.dataChanged.emit).toHaveBeenCalledWith({ test: 'data' });
  });
});
```

### Service Test

```typescript
// my-service.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { MyService } from './my-service.service';

describe('MyService', () => {
  let service: MyService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should set and get data', () => {
    const testData = { test: 'data' };
    service.setData(testData);
    expect(service.getData()).toEqual(testData);
  });
});
```

---

## 🎨 نوشتن استایل‌ها

### SCSS Best Practices

```scss
// استفاده از متغیرها
$primary-color: #3b82f6;
$secondary-color: #6366f1;
$border-radius: 8px;

// استفاده از mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// استفاده از nesting
.calendar {
  @include flex-center;
  background-color: $primary-color;
  border-radius: $border-radius;
  
  &__header {
    font-size: 18px;
    font-weight: bold;
  }
  
  &__body {
    padding: 16px;
  }
  
  &__footer {
    border-top: 1px solid #e5e7eb;
    padding-top: 16px;
  }
}
```

### CSS Custom Properties

```scss
// تعریف متغیرها
:root {
  --primary: #3b82f6;
  --secondary: #6366f1;
  --accent: #f59e0b;
  --background: #ffffff;
  --text: #1f2937;
}

// استفاده
.button {
  background-color: var(--primary);
  color: var(--text);
  
  &:hover {
    background-color: var(--secondary);
  }
}
```

---

## 📚 مستندات کد

### JSDoc Comments

```typescript
/**
 * تبدیل تاریخ میلادی به جلالی
 * 
 * @param gregorianDate - تاریخ میلادی
 * @returns تاریخ جلالی
 * 
 * @example
 * const jalaliDate = JalaliDateService.gregorianToJalali(new Date());
 * console.log(jalaliDate); // { year: 1403, month: 1, day: 1 }
 */
static gregorianToJalali(gregorianDate: Date): JalaliDate {
  // پیاده‌سازی
}
```

### README برای کامپوننت

```markdown
# MyComponent

توضیح کامپوننت

## استفاده

\`\`\`typescript
import { MyComponent } from '@jalali-date-picker/lib';

@Component({
  selector: 'app-root',
  template: '<app-my-component [data]="data"></app-my-component>'
})
export class AppComponent {
  data = { /* ... */ };
}
\`\`\`

## Inputs

- `data`: داده‌های ورودی

## Outputs

- `dataChanged`: رویداد تغییر داده

## مثال

\`\`\`html
<app-my-component 
  [data]="myData"
  (dataChanged)="onDataChange($event)">
</app-my-component>
\`\`\`
```

---

## 🐛 Debug کردن

### Chrome DevTools

```typescript
// استفاده از console
console.log('متغیر:', variable);
console.error('خطا:', error);
console.warn('هشدار:', warning);

// استفاده از debugger
debugger; // کد متوقف می‌شود
```

### Angular DevTools

```bash
# نصب Angular DevTools
# https://angular.io/guide/devtools

# استفاده در Chrome DevTools
# Angular tab → Component Tree
```

### RxJS Debugging

```typescript
// استفاده از tap operator
this.data$
  .pipe(
    tap(value => console.log('مقدار:', value)),
    map(value => value * 2)
  )
  .subscribe();
```

---

## 📦 انتشار بر روی npm

### ۱. آماده‌سازی

```bash
# بررسی نسخه
npm version

# به‌روزرسانی نسخه
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

### ۲. Build

```bash
# Build کتابخانه
npm run build:lib

# بررسی فایل‌های dist
ls dist/jalali-date-picker/
```

### ۳. انتشار

```bash
# ورود به npm
npm login

# انتشار
npm publish

# یا انتشار با tag
npm publish --tag beta
```

### ۴. استفاده

```bash
# نصب از npm
npm install @jalali-date-picker/lib

# یا
npm install jalali-date-picker
```

---

## 🔗 منابع مفید

### مستندات رسمی
- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [npm Documentation](https://docs.npmjs.com/)

### ابزارها
- [Angular CLI](https://angular.io/cli)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Storybook](https://storybook.js.org/)

### کتابخانه‌های مفید
- [Angular Material](https://material.angular.io/)
- [ng-bootstrap](https://ng-bootstrap.github.io/)
- [date-fns](https://date-fns.org/)
- [moment.js](https://momentjs.com/)

---

## ❓ سوالات متداول

### Q: چگونه می‌توانم کامپوننت جدید اضافه کنم؟
A: از دستور `ng generate component` استفاده کنید یا دستی فایل‌ها را ایجاد کنید.

### Q: چگونه می‌توانم تست بنویسم؟
A: از Jasmine و Karma استفاده کنید. نمونه‌های تست در بالا آمده‌اند.

### Q: چگونه می‌توانم کتابخانه را بر روی npm منتشر کنم؟
A: مراحل انتشار در بالا توضیح داده شده‌اند.

### Q: چگونه می‌توانم مشکلات را debug کنم؟
A: از Chrome DevTools و Angular DevTools استفاده کنید.

### Q: چگونه می‌توانم مستندات را تولید کنم؟
A: از Storybook و TypeDoc استفاده کنید.

---

## 📞 تماس و پشتیبانی

- GitHub Issues: [GitHub Repository](https://github.com/)
- Email: support@example.com
- Discord: [Discord Server](https://discord.com/)

---

*آخرین به‌روزرسانی: 1403/11/30*
