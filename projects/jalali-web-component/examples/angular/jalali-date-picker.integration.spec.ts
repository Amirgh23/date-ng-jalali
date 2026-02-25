/**
 * Integration Tests for Angular + Jalali Date Picker Web Component
 * Tests Angular-specific integration scenarios (optional)
 */

import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the web component
class MockJalaliDatePickerElement extends HTMLElement {
  selectedDate: Date | null = null;
  selectedRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  selectedDates: Date[] = [];
  calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  locale: 'fa' | 'en' = 'fa';
  theme = 'light';
  selectionMode: 'single' | 'range' | 'multiple' = 'single';
  disabled = false;

  get value(): string {
    return this.selectedDate?.toISOString() || '';
  }

  reset(): void {
    this.selectedDate = null;
    this.selectedRange = { start: null, end: null };
    this.selectedDates = [];
  }

  open(): void {}
  close(): void {}
  setDate(date: Date): void {
    this.selectedDate = date;
  }
  setRange(start: Date | null, end: Date | null): void {
    this.selectedRange = { start, end };
  }
  addDate(date: Date): void {
    this.selectedDates.push(date);
  }
  removeDate(date: Date): void {
    this.selectedDates = this.selectedDates.filter(d => d.getTime() !== date.getTime());
  }
}

if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', MockJalaliDatePickerElement);
}

describe('Angular Integration Tests', () => {
  describe('Component Mounting', () => {
    @Component({
      selector: 'app-test',
      template: '<jalali-date-picker></jalali-date-picker>',
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {}

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should mount successfully', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('jalali-date-picker');
      expect(element).toBeTruthy();
    });

    it('should unmount without errors', () => {
      fixture.detectChanges();
      expect(() => fixture.destroy()).not.toThrow();
    });
  });

  describe('Property Binding', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          [selectedDate]="selectedDate"
          [locale]="locale"
          [theme]="theme"
          [selectionMode]="selectionMode"
          [disabled]="disabled"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      selectedDate: Date | null = null;
      locale: 'fa' | 'en' = 'fa';
      theme = 'light';
      selectionMode: 'single' | 'range' | 'multiple' = 'single';
      disabled = false;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should bind selectedDate property', fakeAsync(() => {
      const testDate = new Date(2024, 0, 15);
      component.selectedDate = testDate;
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.selectedDate).toEqual(testDate);
    }));

    it('should update selectedDate when property changes', fakeAsync(() => {
      component.selectedDate = new Date(2024, 0, 15);
      fixture.detectChanges();
      tick();

      const newDate = new Date(2024, 1, 20);
      component.selectedDate = newDate;
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.selectedDate).toEqual(newDate);
    }));

    it('should bind locale property', fakeAsync(() => {
      component.locale = 'en';
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.locale).toBe('en');
    }));

    it('should bind theme property', fakeAsync(() => {
      component.theme = 'dark';
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.theme).toBe('dark');
    }));

    it('should bind selectionMode property', fakeAsync(() => {
      component.selectionMode = 'range';
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.selectionMode).toBe('range');
    }));

    it('should bind disabled property', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.disabled).toBe(true);
    }));
  });

  describe('Event Binding', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          (dateSelect)="onDateSelect($event)"
          (rangeSelect)="onRangeSelect($event)"
          (multipleSelect)="onMultipleSelect($event)"
          (localeChange)="onLocaleChange($event)"
          (themeChange)="onThemeChange($event)"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      onDateSelect = vi.fn();
      onRangeSelect = vi.fn();
      onMultipleSelect = vi.fn();
      onLocaleChange = vi.fn();
      onThemeChange = vi.fn();
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle dateSelect event', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');
      const testDate = new Date(2024, 0, 15);

      const event = new CustomEvent('dateSelect', {
        detail: {
          date: testDate,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      });

      element.dispatchEvent(event);
      tick();

      expect(component.onDateSelect).toHaveBeenCalled();
    }));

    it('should handle rangeSelect event', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');

      const event = new CustomEvent('rangeSelect', {
        detail: {
          range: {
            start: new Date(2024, 0, 1),
            end: new Date(2024, 0, 31),
          },
        },
      });

      element.dispatchEvent(event);
      tick();

      expect(component.onRangeSelect).toHaveBeenCalled();
    }));

    it('should handle multipleSelect event', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');

      const event = new CustomEvent('multipleSelect', {
        detail: {
          dates: [new Date(2024, 0, 1), new Date(2024, 0, 15)],
        },
      });

      element.dispatchEvent(event);
      tick();

      expect(component.onMultipleSelect).toHaveBeenCalled();
    }));

    it('should handle localeChange event', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');

      const event = new CustomEvent('localeChange', {
        detail: { locale: 'en' },
      });

      element.dispatchEvent(event);
      tick();

      expect(component.onLocaleChange).toHaveBeenCalled();
    }));

    it('should handle themeChange event', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');

      const event = new CustomEvent('themeChange', {
        detail: { theme: 'dark' },
      });

      element.dispatchEvent(event);
      tick();

      expect(component.onThemeChange).toHaveBeenCalled();
    }));
  });

  describe('Two-Way Binding with ngModel', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          [(ngModel)]="selectedDate"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      selectedDate: Date | null = null;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [FormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should support two-way binding with ngModel', fakeAsync(() => {
      const testDate = new Date(2024, 0, 15);
      component.selectedDate = testDate;
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.selectedDate).toEqual(testDate);
    }));
  });

  describe('Reactive Forms Integration', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          [formControl]="dateControl"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      dateControl = new FormControl<Date | null>(null);
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ReactiveFormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should work with FormControl', fakeAsync(() => {
      const testDate = new Date(2024, 0, 15);
      component.dateControl.setValue(testDate);
      fixture.detectChanges();
      tick();

      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      expect(element.selectedDate).toEqual(testDate);
    }));

    it('should update FormControl when element changes', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker') as any;
      const testDate: Date | null = new Date(2024, 0, 15);

      element.selectedDate = testDate;
      element.dispatchEvent(new CustomEvent('dateSelect', {
        detail: {
          date: testDate,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      }));

      fixture.detectChanges();
      tick();

      expect(component.dateControl.value).toEqual(testDate);
    }));
  });

  describe('Template Reference Variables', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker #picker></jalali-date-picker>
        <button (click)="resetPicker()">Reset</button>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      @ViewChild('picker') picker: any;

      resetPicker() {
        this.picker.reset();
      }
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should access element via template reference', () => {
      expect(component.picker).toBeTruthy();
      expect(component.picker.nativeElement.tagName).toBe('JALALI-DATE-PICKER');
    });

    it('should call methods via template reference', fakeAsync(() => {
      const element = component.picker.nativeElement as any;
      element.selectedDate = new Date(2024, 0, 15);

      component.resetPicker();
      tick();

      expect(element.selectedDate).toBeNull();
    }));
  });

  describe('Attribute Binding', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          [attr.data-testid]="testId"
          [attr.aria-label]="ariaLabel"
          [class.custom-class]="hasCustomClass"
          [style.width]="width"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      testId = 'date-picker';
      ariaLabel = 'Select a date';
      hasCustomClass = true;
      width = '100%';
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should bind data attributes', () => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');
      expect(element.getAttribute('data-testid')).toBe('date-picker');
    });

    it('should bind aria attributes', () => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');
      expect(element.getAttribute('aria-label')).toBe('Select a date');
    });

    it('should bind classes', () => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');
      expect(element.classList.contains('custom-class')).toBe(true);
    });

    it('should bind styles', () => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker') as HTMLElement;
      expect(element.style.width).toBe('100%');
    });
  });

  describe('Structural Directives', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker *ngIf="show"></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      show = true;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should work with *ngIf', fakeAsync(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('jalali-date-picker')).toBeTruthy();

      component.show = false;
      fixture.detectChanges();
      tick();

      expect(fixture.nativeElement.querySelector('jalali-date-picker')).toBeFalsy();
    }));
  });

  describe('List Rendering with *ngFor', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          *ngFor="let date of dates"
          [selectedDate]="date"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      dates = [
        new Date(2024, 0, 1),
        new Date(2024, 0, 15),
        new Date(2024, 0, 31),
      ];
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render multiple instances with *ngFor', () => {
      const pickers = fixture.nativeElement.querySelectorAll('jalali-date-picker');
      expect(pickers.length).toBe(3);
    });
  });

  describe('Change Detection', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          [selectedDate]="selectedDate"
          (dateSelect)="onDateSelect($event)"
        ></jalali-date-picker>
        <div>{{ selectedDate | date }}</div>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      selectedDate: Date | null = null;

      onDateSelect(event: any) {
        this.selectedDate = event.date;
      }
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should trigger change detection on event', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');
      const testDate = new Date(2024, 0, 15);

      const event = new CustomEvent('dateSelect', {
        detail: {
          date: testDate,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      });

      element.dispatchEvent(event);
      fixture.detectChanges();
      tick();

      expect(component.selectedDate).toEqual(testDate);
    }));
  });

  describe('Memory Management', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          *ngFor="let i of items"
          (dateSelect)="onDateSelect($event)"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      items = Array(10).fill(0);
      onDateSelect = vi.fn();
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should clean up event listeners on destroy', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      expect(() => fixture.destroy()).not.toThrow();
    }));
  });

  describe('Error Handling', () => {
    @Component({
      selector: 'app-test',
      template: `
        <jalali-date-picker
          (error)="onError($event)"
        ></jalali-date-picker>
      `,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class TestComponent {
      onError = vi.fn();
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle error events', fakeAsync(() => {
      const element = fixture.nativeElement.querySelector('jalali-date-picker');

      const event = new CustomEvent('error', {
        detail: { message: 'Invalid date' },
      });

      element.dispatchEvent(event);
      fixture.detectChanges();
      tick();

      expect(component.onError).toHaveBeenCalled();
    }));
  });
});
