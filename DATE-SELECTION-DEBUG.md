# Date Selection Bug - Debug Information

## Problem
When selecting a date in the calendar, the wrong date is being selected. For example:
- User clicks on what appears to be "2 Esfand 1404"
- But the selected date is "23 Dec 2025" which is "2 Dey 1404"

This indicates a 2-month offset between the displayed month and the actual dates in the calendar grid.

## Analysis

The conversion algorithm is working correctly:
- 23 Feb 2026 = 1404/12/4 (4 Esfand 1404) ✓
- 23 Dec 2025 = 1404/10/2 (2 Dey 1404) ✓
- 21 Feb 2026 = 1404/12/2 (2 Esfand 1404) ✓

The issue appears to be that:
1. The calendar HEADER shows "اسفند 1404" (Esfand 1404 - month 12)
2. But the DATES in the grid are from "دی 1404" (Dey 1404 - month 10)

This means `currentMonth` has different values when:
- Setting `currentMonthName` (shows Esfand = 12)
- Calling `generateJalaliDates()` (uses Dey = 10)

## Debug Logs Added

I've added comprehensive debug logs to track the issue:

1. **ngOnInit**: Shows the initial date being used
2. **goToDate**: Shows the input date and the converted Jalali date
3. **updateCalendar**: Shows currentYear, currentMonth, and currentMonthName
4. **generateJalaliDates**: Shows currentYear and currentMonth when generating dates

## Next Steps

Please refresh the browser and:
1. Open the browser console (F12)
2. Look at the initial logs when the page loads
3. Navigate to Esfand month (if not already there)
4. Click on a date
5. Copy ALL the console logs and send them to me

The logs will show us exactly where `currentMonth` is getting the wrong value.

## Files Modified

- `projects/jalali-date-picker/src/lib/components/calendar/jalali-calendar.component.ts`
  - Added debug logs in `ngOnInit()`, `goToDate()`, `updateCalendar()`, and `generateJalaliDates()`

## Build Status

✅ Library rebuilt successfully
✅ Dev server is running (process ID 8)
✅ Ready for testing

Please refresh your browser at http://localhost:4200 and check the console logs.
