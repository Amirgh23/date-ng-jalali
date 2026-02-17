import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliDatePickerComponent } from './components/date-picker/jalali-date-picker.component';
import { JalaliCalendarComponent } from './components/calendar/jalali-calendar.component';
import { CalendarSwitchComponent } from './components/calendar-switch/calendar-switch.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { DayInfoModalComponent } from './components/day-info-modal/day-info-modal.component';
import { JalaliDateService } from './core/services/jalali-date.service';
import { ThemeService } from './core/services/theme.service';
import { HolidaysService } from './core/services/holidays.service';

@NgModule({
  imports: [
    CommonModule,
    JalaliDatePickerComponent,
    JalaliCalendarComponent,
    CalendarSwitchComponent,
    ThemeSelectorComponent,
    ColorPickerComponent,
    DayInfoModalComponent
  ],
  exports: [
    JalaliDatePickerComponent,
    JalaliCalendarComponent,
    CalendarSwitchComponent,
    ThemeSelectorComponent,
    ColorPickerComponent,
    DayInfoModalComponent
  ],
  providers: [
    JalaliDateService,
    ThemeService,
    HolidaysService
  ]
})
export class JalaliDatePickerModule { }
