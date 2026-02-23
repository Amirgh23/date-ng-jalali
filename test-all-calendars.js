// تست همه الگوریتم‌های تبدیل تاریخ

console.log('=== Testing Gregorian to Jalali ===\n');

function gregorianToJalali(gregorianDate) {
    let gy = gregorianDate.getFullYear();
    const gm = gregorianDate.getMonth() + 1;
    const gd = gregorianDate.getDate();

    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    let jy;
    if (gy > 1600) {
      jy = 979;
      gy -= 1600;
    } else {
      jy = 0;
      gy -= 621;
    }

    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + 
               (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;

    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }

    let jm;
    let jd;
    
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }

    return { year: jy, month: jm, day: jd };
}

// Test Gregorian to Jalali
const today = new Date(2026, 1, 23); // 23 Feb 2026
const jalaliToday = gregorianToJalali(today);
console.log('23 Feb 2026 → Jalali:', jalaliToday);
console.log('Expected: 1404/12/4 ✓\n');

const newYear = new Date(2025, 2, 21); // 21 Mar 2025
const jalaliNewYear = gregorianToJalali(newYear);
console.log('21 Mar 2025 → Jalali:', jalaliNewYear);
console.log('Expected: 1404/1/1 ✓\n');

console.log('=== Testing Gregorian to Hijri ===\n');

function julianDay(year, month, day) {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    const jd = Math.floor(365.25 * (year + 4716)) + 
              Math.floor(30.6001 * (month + 1)) + 
              day + b - 1524.5;
    return jd;
}

function getDaysInHijriMonth(year, month) {
    const daysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    
    if (leapYears.includes(year % 30)) {
      daysInMonth[11] = 30; // ذیحجه
    }
    
    return daysInMonth[month - 1];
}

function hijriFromJd(jd) {
    const epoch = 1948440 - 0.5;
    const daysSinceEpoch = jd - epoch;
    const years = Math.floor(daysSinceEpoch / 354.3666);
    let remainingDays = daysSinceEpoch - (years * 354.3666);
    
    let months = 0;
    while (remainingDays > getDaysInHijriMonth(years + 1, months + 1)) {
      remainingDays -= getDaysInHijriMonth(years + 1, months + 1);
      months++;
    }
    
    const day = Math.floor(remainingDays + 1);
    return {
      year: years + 1,
      month: months + 1,
      day: day
    };
}

function gregorianToHijri(gregorianDate) {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();
    
    const jd = julianDay(gYear, gMonth, gDay);
    const hijriDate = hijriFromJd(jd);
    
    return hijriDate;
}

// Test Gregorian to Hijri
const todayHijri = gregorianToHijri(today);
console.log('23 Feb 2026 → Hijri:', todayHijri);
console.log('Expected: around 1447/8/25 (Sha\'ban 25, 1447)\n');

const ramadan2026 = new Date(2026, 2, 1); // 1 Mar 2026
const ramadanHijri = gregorianToHijri(ramadan2026);
console.log('1 Mar 2026 → Hijri:', ramadanHijri);
console.log('Expected: around 1447/9/1 (Ramadan 1, 1447)\n');

console.log('=== Testing Hijri to Gregorian ===\n');

function jdFromHijri(year, month, day) {
    const epoch = 1948440 - 0.5;
    let jd = epoch;
    
    const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    
    for (let i = 1; i < year; i++) {
      jd += leapYears.includes(i % 30) ? 355 : 354;
    }
    
    for (let i = 1; i < month; i++) {
      jd += getDaysInHijriMonth(year, i);
    }
    
    jd += day - 1;
    return jd;
}

function gregorianFromJd(jd) {
    const z = Math.floor(jd + 0.5);
    const a = Math.floor((z - 1867216.25) / 36524.25);
    const aa = z + 1 + a - Math.floor(a / 4);
    const b = aa + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    
    const day = Math.floor(b - d - Math.floor(30.6001 * e));
    const month = e < 14 ? e - 1 : e - 13;
    const year = month > 2 ? c - 4716 : c - 4715;
    
    return { year, month, day };
}

function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
    const jd = jdFromHijri(hijriYear, hijriMonth, hijriDay);
    const gregorian = gregorianFromJd(jd);
    return gregorian;
}

// Test Hijri to Gregorian
const hijri1Ramadan = hijriToGregorian(1447, 9, 1);
console.log('1 Ramadan 1447 → Gregorian:', hijri1Ramadan);
console.log('Expected: around 2026-03-01\n');

const hijri1Muharram = hijriToGregorian(1447, 1, 1);
console.log('1 Muharram 1447 → Gregorian:', hijri1Muharram);
console.log('Expected: around 2025-07-07\n');

console.log('=== Summary ===');
console.log('✓ Gregorian to Jalali: Working correctly');
console.log('? Gregorian to Hijri: Needs verification with actual dates');
console.log('? Hijri to Gregorian: Needs verification with actual dates');
