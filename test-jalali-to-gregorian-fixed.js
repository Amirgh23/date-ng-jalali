// Test jalaliToGregorian conversion with FIXED algorithm

function jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay) {
    let jy = jalaliYear;
    let jm = jalaliMonth;
    let jd = jalaliDay;

    let gy;
    if (jy > 979) {
        gy = 1600;
        jy -= 979;
    } else {
        gy = 621;
    }

    // محاسبه تعداد روزها از ابتدای سال جلالی - FIXED
    let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + jd;
    
    if (jm < 7) {
        days += (jm - 1) * 31;
    } else {
        days += ((jm - 7) * 30) + 186;
    }

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
        days = days % 365;
    }

    const sal_a = [0, 31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm;
    for (gm = 0; gm < 13 && days >= sal_a[gm]; gm++) {
        days -= sal_a[gm];
    }
    const gd = days + 1;

    return { year: gy, month: gm, day: gd };
}

console.log('=== Testing FIXED jalaliToGregorian ===\n');

// Test: 1 Bahman 1404 should be 21 Jan 2026
const result1 = jalaliToGregorian(1404, 11, 1);
console.log('1 Bahman 1404 (1404/11/1):', result1);
console.log('Expected: 2026-01-21, Got:', `${result1.year}-${String(result1.month).padStart(2, '0')}-${String(result1.day).padStart(2, '0')}`);
console.log('');

// Test: 30 Bahman 1404 should be 19 Feb 2026
const result2 = jalaliToGregorian(1404, 11, 30);
console.log('30 Bahman 1404 (1404/11/30):', result2);
console.log('Expected: 2026-02-19, Got:', `${result2.year}-${String(result2.month).padStart(2, '0')}-${String(result2.day).padStart(2, '0')}`);
console.log('');

// Test: 1 Esfand 1404 should be 20 Feb 2026
const result3 = jalaliToGregorian(1404, 12, 1);
console.log('1 Esfand 1404 (1404/12/1):', result3);
console.log('Expected: 2026-02-20, Got:', `${result3.year}-${String(result3.month).padStart(2, '0')}-${String(result3.day).padStart(2, '0')}`);
console.log('');

// Test: 4 Esfand 1404 should be 23 Feb 2026 (TODAY)
const result4 = jalaliToGregorian(1404, 12, 4);
console.log('4 Esfand 1404 (1404/12/4) - TODAY:', result4);
console.log('Expected: 2026-02-23, Got:', `${result4.year}-${String(result4.month).padStart(2, '0')}-${String(result4.day).padStart(2, '0')}`);
console.log('');

// Test: 30 Esfand 1404 should be 21 Mar 2026
const result5 = jalaliToGregorian(1404, 12, 30);
console.log('30 Esfand 1404 (1404/12/30):', result5);
console.log('Expected: 2026-03-21, Got:', `${result5.year}-${String(result5.month).padStart(2, '0')}-${String(result5.day).padStart(2, '0')}`);
console.log('');

// Test: 30 Aban 1404 should be 21 Nov 2025
const result6 = jalaliToGregorian(1404, 8, 30);
console.log('30 Aban 1404 (1404/8/30):', result6);
console.log('Expected: 2025-11-21, Got:', `${result6.year}-${String(result6.month).padStart(2, '0')}-${String(result6.day).padStart(2, '0')}`);
