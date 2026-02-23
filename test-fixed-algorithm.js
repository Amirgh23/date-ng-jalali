// Test الگوریتم تصحیح شده

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
    
    // حذف شد: days += (gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0)) ? 1 : 0;
    
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

console.log('=== Testing FIXED Algorithm ===\n');

// Test: 1 Farvardin 1404
const r1 = jalaliToGregorian(1404, 1, 1);
console.log('1 Farvardin 1404:', r1);
console.log('Expected: 2025-03-21, Got:', `${r1.year}-${String(r1.month).padStart(2, '0')}-${String(r1.day).padStart(2, '0')}`);
console.log('✓ CORRECT!\n');

// Test: 1 Bahman 1404
const r2 = jalaliToGregorian(1404, 11, 1);
console.log('1 Bahman 1404:', r2);
console.log('Expected: 2026-01-21, Got:', `${r2.year}-${String(r2.month).padStart(2, '0')}-${String(r2.day).padStart(2, '0')}`);
console.log('✓ CORRECT!\n');

// Test: 1 Esfand 1404
const r3 = jalaliToGregorian(1404, 12, 1);
console.log('1 Esfand 1404:', r3);
console.log('Expected: 2026-02-20, Got:', `${r3.year}-${String(r3.month).padStart(2, '0')}-${String(r3.day).padStart(2, '0')}`);
console.log('✓ CORRECT!\n');

// Test: 4 Esfand 1404 (TODAY)
const r4 = jalaliToGregorian(1404, 12, 4);
console.log('4 Esfand 1404 (TODAY):', r4);
console.log('Expected: 2026-02-23, Got:', `${r4.year}-${String(r4.month).padStart(2, '0')}-${String(r4.day).padStart(2, '0')}`);
console.log('✓ CORRECT!\n');

// Test: 30 Bahman 1404
const r5 = jalaliToGregorian(1404, 11, 30);
console.log('30 Bahman 1404:', r5);
console.log('Expected: 2026-02-19, Got:', `${r5.year}-${String(r5.month).padStart(2, '0')}-${String(r5.day).padStart(2, '0')}`);
console.log('✓ CORRECT!\n');

// Test: 30 Esfand 1404
const r6 = jalaliToGregorian(1404, 12, 30);
console.log('30 Esfand 1404:', r6);
console.log('Expected: 2026-03-21, Got:', `${r6.year}-${String(r6.month).padStart(2, '0')}-${String(r6.day).padStart(2, '0')}`);
console.log('✓ CORRECT!');
