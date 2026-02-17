export interface JalaliDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}

export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  formatted: string;
}

export interface DayInfo {
  jalali: JalaliDate;
  gregorian: GregorianDate;
  hijri: HijriDate;
  isHoliday: boolean;
  holidayType: 'official' | 'non-official' | null;
  events: string[];
  season: string;
  weekNumber: number;
}
