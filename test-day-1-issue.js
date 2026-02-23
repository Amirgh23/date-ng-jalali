// Test روز اول ماه

function jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay) {
    const jy = jalaliYear;
    const jm = jalaliMonth;
    const jd = jalaliDay;
    
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    let gy, gm, gd;
    
    let jy2 = (jy > 979) ? jy - 979 : jy;
    let days = (365 * jy2) + (Math.floor(jy2 / 33) * 8) + Math.floor(((jy2 % 33) + 3) / 4) + 78 + jd;
    
    if (jm < 7) {
      days += (jm - 1) * 31;
    } else {
      days += ((jm - 7) * 30) + 186;
    }
    
    gy = (jy > 979) ? 1600 : 621;
    
    days += (gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0)) ? 1 : 0;
    
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    
    let leap = true;
    if (days >= 36525) {
      days--;
      gy += 100 * Math.floor(days / 36524);
      days %= 36524;
      if (days >= 365) {
        days++;
      }
      leap = false;
    }
    
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    
    if (days >= 366) {
      leap = false;
      days--;
      gy += Math.floor(days / 365);
      days %= 365;
    }
    
    for (gm = 0; g_d_m[gm] + ((gm === 1 && leap) ? 1 : 0) <= days && gm < 12; gm++) {
      // empty
    }
    
    gd = days - g_d_m[gm - 1] - ((gm === 2 && leap) ? 1 : 0) + 1;
    
    return { year: gy, month: gm, day: gd };
}

console.log('=== Testing Day 1 of each month ===\n');

// Test: 1 Farvardin 1404
const r1 = jalaliToGregorian(1404, 1, 1);
console.log('1 Farvardin 1404:', r1, '→ Expected: 2025-03-21');

// Test: 1 Bahman 1404
const r2 = jalaliToGregorian(1404, 11, 1);
console.log('1 Bahman 1404:', r2, '→ Expected: 2026-01-21');

// Test: 1 Esfand 1404
const r3 = jalaliToGregorian(1404, 12, 1);
console.log('1 Esfand 1404:', r3, '→ Expected: 2026-02-20');

console.log('\n=== Testing last day of each month ===\n');

// Test: 31 Farvardin 1404
const r4 = jalaliToGregorian(1404, 1, 31);
console.log('31 Farvardin 1404:', r4, '→ Expected: 2025-04-20');

// Test: 30 Bahman 1404
const r5 = jalaliToGregorian(1404, 11, 30);
console.log('30 Bahman 1404:', r5, '→ Expected: 2026-02-19');

// Test: 30 Esfand 1404 (سال کبیسه)
const r6 = jalaliToGregorian(1404, 12, 30);
console.log('30 Esfand 1404:', r6, '→ Expected: 2026-03-21');
