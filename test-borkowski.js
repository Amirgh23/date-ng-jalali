// Test Borkowski algorithm

function gregorianToJulianDay(year, month, day) {
    return ((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
      ((367 * (month - 2 - 12 * (Math.floor((month - 14) / 12)))) / 12) -
      ((3 * (Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100))) / 4) +
      day - 32075;
}

function jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay) {
    const epbase = jalaliYear - ((jalaliYear >= 0) ? 474 : 473);
    const epyear = 474 + (epbase % 2820);
    
    let mdays;
    if (jalaliMonth <= 7) {
      mdays = ((jalaliMonth - 1) * 31);
    } else {
      mdays = ((jalaliMonth - 1) * 30) + 6;
    }
    
    const julianDay = jalaliDay +
      mdays +
      Math.floor((epyear * 682 - 110) / 2816) +
      (epyear - 1) * 365 +
      Math.floor(epbase / 2820) * 1029983 +
      (1948320.5 - 1);
    
    // تبدیل Julian Day به تاریخ میلادی
    const wjd = Math.floor(julianDay - 0.5) + 0.5;
    const depoch = wjd - 1721425.5;
    const quadricent = Math.floor(depoch / 146097);
    const dqc = depoch % 146097;
    const cent = Math.floor(dqc / 36524);
    const dcent = dqc % 36524;
    const quad = Math.floor(dcent / 1461);
    const dquad = dcent % 1461;
    const yindex = Math.floor(dquad / 365);
    
    let year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent === 4) || (yindex === 4))) {
      year++;
    }
    
    const yearday = wjd - gregorianToJulianDay(year, 1, 1);
    const leapadj = ((wjd < gregorianToJulianDay(year, 3, 1)) ? 0 : (((year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 1 : 2));
    
    const month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    const day = (wjd - gregorianToJulianDay(year, month, 1)) + 1;
    
    return { year, month, day };
}

console.log('=== Testing Borkowski Algorithm ===\n');

// Test: 1 Bahman 1404 should be 21 Jan 2026
const result1 = jalaliToGregorian(1404, 11, 1);
console.log('1 Bahman 1404 (1404/11/1):', result1);
console.log('Expected: 2026-01-21\n');

// Test: 30 Bahman 1404 should be 19 Feb 2026
const result2 = jalaliToGregorian(1404, 11, 30);
console.log('30 Bahman 1404 (1404/11/30):', result2);
console.log('Expected: 2026-02-19\n');

// Test: 1 Esfand 1404 should be 20 Feb 2026
const result3 = jalaliToGregorian(1404, 12, 1);
console.log('1 Esfand 1404 (1404/12/1):', result3);
console.log('Expected: 2026-02-20\n');

// Test: 4 Esfand 1404 should be 23 Feb 2026 (TODAY)
const result4 = jalaliToGregorian(1404, 12, 4);
console.log('4 Esfand 1404 (1404/12/4) - TODAY:', result4);
console.log('Expected: 2026-02-23\n');

// Test: 30 Esfand 1404 should be 21 Mar 2026
const result5 = jalaliToGregorian(1404, 12, 30);
console.log('30 Esfand 1404 (1404/12/30):', result5);
console.log('Expected: 2026-03-21\n');

// Test: 30 Aban 1404 should be 21 Nov 2025
const result6 = jalaliToGregorian(1404, 8, 30);
console.log('30 Aban 1404 (1404/8/30):', result6);
console.log('Expected: 2025-11-21');
