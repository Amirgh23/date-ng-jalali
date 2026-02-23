// Test الگوریتم قمری تصحیح شده

function gregorianToHijri(gregorianDate) {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();
    
    // محاسبه Julian Day Number
    let a = Math.floor((14 - gMonth) / 12);
    let y = gYear + 4800 - a;
    let m = gMonth + (12 * a) - 3;
    
    let jdn = gDay + Math.floor((153 * m + 2) / 5) + (365 * y) + 
              Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    // تبدیل JDN به تاریخ قمری
    let l = jdn - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + 
            (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - 
        (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    
    let hMonth = Math.floor((24 * l) / 709);
    let hDay = l - Math.floor((709 * hMonth) / 24);
    let hYear = 30 * n + j - 30;
    
    return {
      year: hYear,
      month: hMonth,
      day: hDay
    };
}

function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
    let iy = hijriYear;
    let im = hijriMonth;
    let id = hijriDay;
    
    let ii = iy - 1;
    let iln = (ii * 12) + 1 + (im - 1);
    let i = iln - 16260;
    
    let mcjdn = id + 29 * (iln - 1) + Math.floor((11 * iln + 14) / 30) + 1948440 - 385;
    
    if (mcjdn >= 2299160) {
      let a = Math.floor((mcjdn - 1867216.25) / 36524.25);
      mcjdn = mcjdn + 1 + a - Math.floor(a / 4);
    }
    
    let b = mcjdn + 1524;
    let c = Math.floor((b - 122.1) / 365.25);
    let d = Math.floor(365.25 * c);
    let e = Math.floor((b - d) / 30.6001);
    
    let gDay = b - d - Math.floor(30.6001 * e);
    let gMonth = e - (e > 13.5 ? 13 : 1);
    let gYear = c - (gMonth > 2.5 ? 4716 : 4715);
    
    if (gYear <= 0) {
      gYear--;
    }
    
    return { year: gYear, month: gMonth, day: gDay };
}

console.log('=== Testing FIXED Hijri Algorithm ===\n');

// Test: 23 Feb 2026 (امروز)
const today = new Date(2026, 1, 23);
const todayHijri = gregorianToHijri(today);
console.log('23 Feb 2026 → Hijri:', todayHijri);
console.log('Expected: 1447/8/25 (25 Sha\'ban 1447)\n');

// Test: 1 Mar 2026 (شروع رمضان تقریبی)
const ramadan = new Date(2026, 2, 1);
const ramadanHijri = gregorianToHijri(ramadan);
console.log('1 Mar 2026 → Hijri:', ramadanHijri);
console.log('Expected: around 1447/9/1 (1 Ramadan 1447)\n');

// Test: 1 Ramadan 1447 → Gregorian
const ramadan1 = hijriToGregorian(1447, 9, 1);
console.log('1 Ramadan 1447 → Gregorian:', ramadan1);
console.log('Expected: around 2026-03-01\n');

// Test: 1 Muharram 1447 → Gregorian
const muharram1 = hijriToGregorian(1447, 1, 1);
console.log('1 Muharram 1447 → Gregorian:', muharram1);
console.log('Expected: around 2025-07-07\n');

// Test: 1 Shawwal 1447 (عید فطر)
const eid = hijriToGregorian(1447, 10, 1);
console.log('1 Shawwal 1447 (Eid al-Fitr) → Gregorian:', eid);
console.log('Expected: around 2026-03-31\n');

console.log('=== Verification ===');
console.log('Note: Hijri calendar is lunar-based and dates can vary by 1-2 days');
console.log('depending on moon sighting. These are calculated dates.');
