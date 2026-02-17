import { beforeEach, describe, expect, it } from 'vitest';
import { JalaliDatePickerComponent } from './components/date-picker/jalali-date-picker.component';
import { JalaliDateService } from './core/services/jalali-date.service';
import { ThemeService } from './core/services/theme.service';

describe('JalaliDatePickerComponent', () => {
  let component: JalaliDatePickerComponent;

  beforeEach(() => {
    component = new JalaliDatePickerComponent(new JalaliDateService(), new ThemeService());
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current date as default', () => {
    expect(component.selectedDate).toBeDefined();
    expect(component.selectedDate).toBeInstanceOf(Date);
  });

  it('should format date correctly', () => {
    const testDate = new Date(2024, 0, 1); // January 1, 2024
    component.selectedDate = testDate;
    expect(component.formattedDate).toContain('۱۴۰۲');
  });

  it('should toggle calendar visibility', () => {
    expect(component.isCalendarVisible).toBe(false);
    component.toggleCalendar();
    expect(component.isCalendarVisible).toBe(true);
    component.toggleCalendar();
    expect(component.isCalendarVisible).toBe(false);
  });
});
