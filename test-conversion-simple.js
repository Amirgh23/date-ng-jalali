// Test the gregorianToJalali conversion

function gregorianToJalali(gregorianDate) {
    let gy = gregorianDate.getFullYear();
    const gm = gregorianDate.getMonth() + 1;
    const gd = gregorianDate.getDate();

    console.log('Input:', { gy, gm, gd });

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

// Test today (23 Feb 2026)
const today = new Date(2026, 1, 23); // Month is 0-indexed, so 1 = February
console.log('Today (23 Feb 2026):', gregorianToJalali(today));
// Expected: 1404/12/4 (4 Esfand 1404)

// Test 23 Dec 2025
const dec23 = new Date(2025, 11, 23); // Month is 0-indexed, so 11 = December
console.log('23 Dec 2025:', gregorianToJalali(dec23));
// Expected: 1404/10/2 or 1404/10/3 (2-3 Dey 1404)

// Test 21 Feb 2026
const feb21 = new Date(2026, 1, 21);
console.log('21 Feb 2026:', gregorianToJalali(feb21));
// Expected: 1404/12/2 (2 Esfand 1404)
