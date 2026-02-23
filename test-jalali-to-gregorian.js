// Test jalaliToGregorian conversion

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

    let days = (365 * jy) + (Math.floor((33 * jy + 3) / 128)) + jd;
    
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

// Test: 1 Bahman 1404 should be around 21 Jan 2026
console.log('1 Bahman 1404 (1404/11/1):', jalaliToGregorian(1404, 11, 1));
// Expected: 2026-01-21

// Test: 30 Bahman 1404 should be around 19 Feb 2026
console.log('30 Bahman 1404 (1404/11/30):', jalaliToGregorian(1404, 11, 30));
// Expected: 2026-02-19

// Test: 1 Esfand 1404 should be around 20 Feb 2026
console.log('1 Esfand 1404 (1404/12/1):', jalaliToGregorian(1404, 12, 1));
// Expected: 2026-02-20

// Test: 30 Esfand 1404 should be around 21 Mar 2026
console.log('30 Esfand 1404 (1404/12/30):', jalaliToGregorian(1404, 12, 30));
// Expected: 2026-03-21

// Test: 1 Aban 1404 should be around 23 Oct 2025
console.log('1 Aban 1404 (1404/8/1):', jalaliToGregorian(1404, 8, 1));
// Expected: 2025-10-23

// Test: 30 Aban 1404 should be around 21 Nov 2025
console.log('30 Aban 1404 (1404/8/30):', jalaliToGregorian(1404, 8, 30));
// Expected: 2025-11-21
