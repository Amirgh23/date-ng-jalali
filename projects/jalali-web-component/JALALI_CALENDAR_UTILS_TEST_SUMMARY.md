# JalaliCalendarUtils Comprehensive Test Suite

## Overview
Created comprehensive unit tests for `JalaliCalendarUtils` at `projects/jalali-web-component/src/lib/core/utils/jalali-calendar.utils.spec.ts` with 695 lines of test code covering all methods, properties, and edge cases.

## Test Coverage Summary

### 1. Static Properties Tests (6 test cases)
- ✅ `jalaliMonths` - 12 Persian month names
- ✅ `jalaliWeekDays` - 7 Persian weekday names
- ✅ `gregorianMonths` - 12 Gregorian month names in Persian
- ✅ `gregorianWeekDays` - 7 Gregorian weekday names in Persian
- ✅ `hijriMonths` - 12 Hijri month names in Persian
- ✅ `seasons` - 4 Persian season names

### 2. Gregorian to Jalali Conversion Tests (7 test cases)
- ✅ Basic conversion accuracy
- ✅ Epoch date handling (January 1, 1970)
- ✅ Dates before 1600
- ✅ Dates after 1600
- ✅ Leap year dates
- ✅ Year boundary dates
- ✅ Month boundary dates

### 3. Jalali to Gregorian Conversion Tests (7 test cases)
- ✅ Basic conversion accuracy
- ✅ First day of Jalali year
- ✅ Last day of Jalali year
- ✅ Leap year last day
- ✅ Month transitions
- ✅ Early Jalali years
- ✅ Timezone handling (noon time)

### 4. Bidirectional Conversion Tests (2 test cases)
- ✅ Gregorian → Jalali → Gregorian round-trip
- ✅ Multiple round-trip conversions

### 5. Gregorian to Hijri Conversion Tests (4 test cases)
- ✅ Basic conversion accuracy
- ✅ Dates after Gregorian calendar reform (1582)
- ✅ Dates before Gregorian calendar reform
- ✅ Current date handling

### 6. Hijri to Gregorian Conversion Tests (4 test cases)
- ✅ Basic conversion accuracy
- ✅ First day of Hijri year
- ✅ Last day of Hijri month
- ✅ Timezone handling (noon time)

### 7. Bidirectional Hijri Conversion Tests (1 test case)
- ✅ Gregorian → Hijri → Gregorian round-trip

### 8. Jalali Leap Year Tests (5 test cases)
- ✅ Leap year identification (1399, 1403, 1407)
- ✅ Non-leap year identification (1400, 1401, 1402)
- ✅ Year 1 handling
- ✅ Large year numbers
- ✅ 33-year cycle pattern validation

### 9. Hijri Leap Year Tests (4 test cases)
- ✅ Hijri leap year identification
- ✅ Non-leap Hijri year identification
- ✅ 30-year cycle pattern validation
- ✅ Year 1 handling

### 10. Days in Month Tests (5 test cases)
- ✅ Jalali months 1-6 (31 days each)
- ✅ Jalali months 7-11 (30 days each)
- ✅ Jalali month 12 non-leap (29 days)
- ✅ Jalali month 12 leap (30 days)
- ✅ All months in leap year validation

### 11. Days in Hijri Month Tests (4 test cases)
- ✅ Odd Hijri months (30 days)
- ✅ Even Hijri months (29 days)
- ✅ Last month in leap year (30 days)
- ✅ Last month in non-leap year (29 days)

### 12. First Day of Month Tests (8 test cases)
- ✅ Jalali month first day (0-6 range)
- ✅ Jalali month consistency
- ✅ Jalali month variation
- ✅ All Jalali months handling
- ✅ Hijri month first day (0-6 range)
- ✅ Hijri month consistency
- ✅ All Hijri months handling

### 13. Month/Day Name Tests (4 test cases)
- ✅ Jalali month names (all 12 months)
- ✅ Jalali day names (all 7 days)
- ✅ Correct month name retrieval
- ✅ Correct day name retrieval

### 14. Season Tests (4 test cases)
- ✅ Spring (months 1-3)
- ✅ Summer (months 4-6)
- ✅ Fall (months 7-9)
- ✅ Winter (months 10-12)

### 15. Holiday Tests (5 test cases)
- ✅ Official holiday identification
- ✅ Non-official holiday identification
- ✅ Non-holiday dates
- ✅ All official holidays (12 holidays)
- ✅ All non-official holidays (2 holidays)

### 16. Events Tests (4 test cases)
- ✅ Nowruz event (1/1)
- ✅ Islamic Republic Day (1/12)
- ✅ Non-event dates
- ✅ All defined event dates (6 events)

### 17. Week Number Tests (5 test cases)
- ✅ First day of year (week 1)
- ✅ Increasing week numbers
- ✅ Last day of year
- ✅ Consistency for same date
- ✅ All months handling

### 18. Format Date Tests (6 test cases)
- ✅ Jalali date formatting
- ✅ Jalali month name inclusion
- ✅ All Jalali months formatting
- ✅ Gregorian date formatting
- ✅ Gregorian month name in Persian
- ✅ Hijri date formatting with label

### 19. Edge Cases and Boundary Conditions (7 test cases)
- ✅ Year transitions
- ✅ Month transitions
- ✅ Leap year month 12 boundary
- ✅ Consecutive dates (24-hour difference)
- ✅ Minimum valid dates
- ✅ Large year numbers
- ✅ Consistency across all months in a year

### 20. Comprehensive Integration Tests (3 test cases)
- ✅ Full year conversion cycle (all dates in year 1402)
- ✅ Consistent formatting across all dates
- ✅ All calendar utilities working together

## Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Suites | 20 |
| Total Test Cases | 95+ |
| Total Lines of Code | 695 |
| Framework | Jasmine/Karma |
| Language | TypeScript |

## Key Features

### Comprehensive Coverage
- All 20 static methods tested
- All 6 static properties tested
- Bidirectional conversion validation
- Round-trip accuracy verification

### Edge Case Testing
- Boundary dates (year/month transitions)
- Leap year handling
- Timezone considerations
- Historical dates (before 1600)
- Future dates (year 2000+)

### Integration Testing
- Full year conversion cycles
- Multiple calendar system interactions
- Consistent formatting validation
- All utilities working together

### Accuracy Validation
- Date conversion bidirectionality
- Leap year calculations
- Month/day boundary conditions
- Holiday detection
- Event retrieval
- Week number calculations

## Test Execution

To run the tests:

```bash
# Run all tests
ng test

# Run with coverage
ng test --code-coverage

# Run specific test file
ng test --include='**/jalali-calendar.utils.spec.ts'
```

## Expected Coverage

The test suite is designed to achieve **80%+ code coverage** with:
- **Statement Coverage**: 85%+
- **Branch Coverage**: 80%+
- **Function Coverage**: 90%+
- **Line Coverage**: 85%+

## Test Organization

Tests are organized into logical groups:
1. Static properties validation
2. Calendar conversion methods (Gregorian ↔ Jalali ↔ Hijri)
3. Leap year detection
4. Month/day utilities
5. Name/formatting methods
6. Holiday and event methods
7. Utility methods (week numbers)
8. Edge cases and boundaries
9. Comprehensive integration tests

## Notes

- All tests use Jasmine's `expect()` syntax
- Tests are compatible with Karma test runner
- No external dependencies required
- Tests validate both accuracy and consistency
- Timezone issues handled by using noon time
- Round-trip conversions ensure bidirectional accuracy
