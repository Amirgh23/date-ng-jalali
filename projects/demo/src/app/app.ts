import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { JalaliDatePickerComponent } from 'jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BrowserModule, JalaliDatePickerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'تقویم جلالی انگولار';
  selectedDate: Date = new Date();

  onDateSelect(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
