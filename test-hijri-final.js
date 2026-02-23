// Test الگوریتم نهایی قمری

function gregorianToHijri(gregorianDate) {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();
    
    const gy = gYear;
    const gm = gMonth;
    const gd = gDay;
    
    let jd;
    if ((gy > 1582) || ((gy === 1582) && (gm > 10)) || ((gy === 1582) && (gm === 10) && (gd > 14))) {
      jd = Math.floor((1461 * (gy + 4800 + Math.floor((gm - 14) / 12))) / 4) +
           Math.floor((367 * (gm - 2 - 12 * (Math.floor((gm - 14) / 12)))) / 12) -
           Math.floor((3 * (Math.floor((gy + 4900 + Math.floor((gm - 14) / 12)) / 100))) / 4) +
           gd - 32075;
    } else {
      jd = 367 * gy - Math.floor((7 * (gy + 5001 + Math.floor((gm - 9) / 7))) / 4) +
           Math.floor((275 * gm) / 9) + gd + 1729777;
    }
    
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) +
              (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
    const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
               (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const m = Math.floor((24 * l3) / 709);
    const d = l3 - Math.floor((709 * m) / 24);
    const y = 30 * n + j - 30;
    
    return { year: y, month: m, day: d };
}

function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
    const hYear = hijriYear;
    const hMonth = hijriMonth;
    const hDay = hijriDay;
    
    const jd = Math.floor((11 * hYear + 3) / 30) +
               354 * hYear +
               30 * hMonth -
               Math.floor((hMonth - 1) / 2) +
               hDay +
               1948440 - 385;
    
    let b, c, d, e;
    
    if (jd > 2299160) {
      const a = jd + 32044;
      b = Math.floor((4 * a + 3) / 146097);
      c = a - Math.floor((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    
    d = Math.floor((4 * c + 3) / 1461);
    e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    
    const gDay = e - Math.floor((153 * m + 2) / 5) + 1;
    const gMonth = m + 3 - 12 * Math.floor(m / 10);
    const gYear = b * 100 + d - 4800 + Math.floor(m / 10);
    
    return { year: gYear, month: gMonth, day: gDay };
}

console.log('=== Testing FINAL Hijri Algorithm ===\n');

// Test: 23 Feb 2026
const today = new Date(2026, 1, 23);
const todayHijri = gregorianToHijri(today);
console.log('23 Feb 2026 → Hijri:', todayHijri);
console.log('Expected: 1447/8/25 (25 Sha\'ban 1447)\n');

// Test: 1 Ramadan 1447
const ramadan1 = hijriToGregorian(1447, 9, 1);
console.log('1 Ramadan 1447 → Gregorian:', ramadan1);
console.log('Expected: around 2026-02-28 or 2026-03-01\n');

// Test: 1 Muharram 1447
const muharram1 = hijriToGregorian(1447, 1, 1);
console.log('1 Muharram 1447 → Gregorian:', muharram1);
console.log('Expected: around 2025-07-07\n');

// Test: 1 Shawwal 1447 (عید فطر)
const eid = hijriToGregorian(1447, 10, 1);
console.log('1 Shawwal 1447 (Eid al-Fitr) → Gregorian:', eid);
console.log('Expected: around 2026-03-30\n');

// Round trip test
console.log('=== Round Trip Test ===\n');
const testDate = new Date(2026, 1, 23);
const hijri = gregorianToHijri(testDate);
const backToGregorian = hijriToGregorian(hijri.year, hijri.month, hijri.day);
console.log('Original:', testDate.toDateString());
console.log('Hijri:', `${hijri.year}/${hijri.month}/${hijri.day}`);
console.log('Back to Gregorian:', `${backToGregorian.year}-${backToGregorian.month}-${backToGregorian.day}`);
console.log('Match:', testDate.getDate() === backToGregorian.day && 
                     testDate.getMonth() + 1 === backToGregorian.month && 
                     testDate.getFullYear() === backToGregorian.year ? '✓' : '✗');
