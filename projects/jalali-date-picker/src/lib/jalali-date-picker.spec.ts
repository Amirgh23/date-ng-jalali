import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JalaliDatePickerComponent } from './components/date-picker/jalali-date-picker.component';
import { JalaliDateService } from './core/services/jalali-date.service';

describe('JalaliDatePickerComponent', () => {
  let component: JalaliDatePickerComponent;
  let fixture: ComponentFixture<JalaliDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JalaliDatePickerComponent],
      providers: [JalaliDateService]
    }).compileComponents();

    fixture = TestBed.createComponent(JalaliDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
