import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JalaliDatePickerComponent } from '../../../jalali-date-picker/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, JalaliDatePickerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'تقویم جلالی';
  selectedDate: Date = new Date();
  selectionMode: 'single' | 'range' | 'multiple' = 'single';
  selectedRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  selectedDates: Date[] = [];

  onDateSelect(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }

  onRangeSelect(range: { start: Date; end: Date }) {
    this.selectedRange = range;
    console.log('Selected range:', range);
  }

  onMultipleSelect(dates: Date[]) {
    this.selectedDates = dates;
    console.log('Selected dates:', dates);
  }

  switchMode(mode: 'single' | 'range' | 'multiple') {
    this.selectionMode = mode;
    this.selectedDate = new Date();
    this.selectedRange = { start: null, end: null };
    this.selectedDates = [];
  }
}
