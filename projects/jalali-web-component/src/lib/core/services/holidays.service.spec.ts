import { HolidaysService, Holiday } from './holidays.service';

describe('HolidaysService', () => {
  let service: HolidaysService;
  let mockJalaliDateService: any;

  beforeEach(() => {
    mockJalaliDateService = {
      gregorianToJalali: jasmine.createSpy('gregorianToJalali').and.callFake((date: Date) => {
        if (date.getMonth() === 0 && date.getDate() === 15) {
          return { year: 1402, month: 10, day: 25 };
        }
        if (date.getMonth() === 2 && date.getDate() === 20) {
          return { year: 1402, month: 1, day: 1 };
        }
        if (date.getMonth() === 4 && date.getDate() === 10) {
          return { year: 1402, month: 1, day: 11 };
        }
        if (date.getMonth() === 8 && date.getDate() === 30) {
          return { year: 1402, month: 9, day: 9 };
        }
        return { year: 1402, month: 1, day: 1 };
      })
    };
    service = new HolidaysService(mockJalaliDateService);
  });

  describe('Initialization', () => {
    it('should create service instance', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with 16 default holidays', () => {
      const holidays = service.getAllHolidays();
      expect(holidays.length).toBe(16);
    });

    it('should initialize without JalaliDateService', () => {
      const serviceWithoutDependency = new HolidaysService();
      expect(serviceWithoutDependency).toBeTruthy();
      const holidays = serviceWithoutDependency.getAllHolidays();
      expect(holidays.length).toBe(16);
    });

    it('should have all default holidays with required properties', () => {
      const holidays = service.getAllHolidays();
      holidays.forEach(holiday => {
        expect(holiday.id).toBeDefined();
        expect(holiday.name).toBeDefined();
        expect(holiday.jalaliMonth).toBeDefined();
        expect(holiday.jalaliDay).toBeDefined();
        expect(holiday.type).toBeDefined();
        expect(['official', 'non-official', 'religious', 'custom']).toContain(holiday.type);
      });
    });
  });

  describe('Holiday Interface', () => {
    it('should have valid Holiday interface structure', () => {
      const holiday: Holiday = {
        id: 'test-holiday',
        name: 'Test Holiday',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'custom',
        description: 'A test holiday',
        source: 'Test'
      };
      expect(holiday.id).toBe('test-holiday');
      expect(holiday.name).toBe('Test Holiday');
      expect(holiday.jalaliMonth).toBe(1);
      expect(holiday.jalaliDay).toBe(1);
      expect(holiday.type).toBe('custom');
      expect(holiday.description).toBe('A test holiday');
      expect(holiday.source).toBe('Test');
    });

    it('should allow Holiday without optional properties', () => {
      const holiday: Holiday = {
        id: 'test-holiday',
        name: 'Test Holiday',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'custom'
      };
      expect(holiday.description).toBeUndefined();
      expect(holiday.source).toBeUndefined();
    });
  });

  describe('Default Holidays', () => {
    it('should have Nowruz holidays (7 days)', () => {
      const nowruzHolidays = service.getAllHolidays().filter(h => h.id.startsWith('nowruz'));
      expect(nowruzHolidays.length).toBe(7);
      nowruzHolidays.forEach((h, index) => {
        expect(h.jalaliMonth).toBe(1);
        expect(h.jalaliDay).toBe(index + 1);
        expect(h.type).toBe('official');
      });
    });

    it('should have Republic Day', () => {
      const republicDay = service.getHolidayById('republic-day');
      expect(republicDay).toBeTruthy();
      expect(republicDay?.jalaliMonth).toBe(1);
      expect(republicDay?.jalaliDay).toBe(11);
      expect(republicDay?.type).toBe('official');
    });

    it('should have Nature Day', () => {
      const natureDay = service.getHolidayById('nature-day');
      expect(natureDay).toBeTruthy();
      expect(natureDay?.jalaliMonth).toBe(1);
      expect(natureDay?.jalaliDay).toBe(13);
      expect(natureDay?.type).toBe('non-official');
    });

    it('should have Oil Day', () => {
      const oilDay = service.getHolidayById('oil-day');
      expect(oilDay).toBeTruthy();
      expect(oilDay?.jalaliMonth).toBe(11);
      expect(oilDay?.jalaliDay).toBe(29);
      expect(oilDay?.type).toBe('official');
    });

    it('should have Resistance Day', () => {
      const resistanceDay = service.getHolidayById('resistance-day');
      expect(resistanceDay).toBeTruthy();
      expect(resistanceDay?.jalaliMonth).toBe(11);
      expect(resistanceDay?.jalaliDay).toBe(27);
      expect(resistanceDay?.type).toBe('official');
    });

    it('should have Education Day', () => {
      const educationDay = service.getHolidayById('education-day');
      expect(educationDay).toBeTruthy();
      expect(educationDay?.jalaliMonth).toBe(12);
      expect(educationDay?.jalaliDay).toBe(25);
      expect(educationDay?.type).toBe('official');
    });

    it('should have Ashura', () => {
      const ashura = service.getHolidayById('ashura');
      expect(ashura).toBeTruthy();
      expect(ashura?.jalaliMonth).toBe(9);
      expect(ashura?.jalaliDay).toBe(9);
      expect(ashura?.type).toBe('religious');
    });

    it('should have Eid Fitr', () => {
      const eidFitr = service.getHolidayById('eid-fitr');
      expect(eidFitr).toBeTruthy();
      expect(eidFitr?.jalaliMonth).toBe(10);
      expect(eidFitr?.jalaliDay).toBe(1);
      expect(eidFitr?.type).toBe('religious');
    });

    it('should have Eid Adha', () => {
      const eidAdha = service.getHolidayById('eid-adha');
      expect(eidAdha).toBeTruthy();
      expect(eidAdha?.jalaliMonth).toBe(12);
      expect(eidAdha?.jalaliDay).toBe(10);
      expect(eidAdha?.type).toBe('religious');
    });
  });

  describe('Holiday CRUD Operations', () => {
    it('should add a new holiday', () => {
      const newHoliday: Holiday = {
        id: 'custom-holiday',
        name: 'Custom Holiday',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      const initialCount = service.getHolidayCount();
      service.addHoliday(newHoliday);
      expect(service.getHolidayCount()).toBe(initialCount + 1);
      expect(service.hasHoliday('custom-holiday')).toBe(true);
    });

    it('should not add duplicate holiday', () => {
      const newHoliday: Holiday = {
        id: 'nowruz-1',
        name: 'Duplicate',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      const initialCount = service.getHolidayCount();
      service.addHoliday(newHoliday);
      expect(service.getHolidayCount()).toBe(initialCount);
    });

    it('should remove a holiday by ID', () => {
      const initialCount = service.getHolidayCount();
      const removed = service.removeHoliday('nowruz-1');
      expect(removed).toBe(true);
      expect(service.getHolidayCount()).toBe(initialCount - 1);
      expect(service.hasHoliday('nowruz-1')).toBe(false);
    });

    it('should return false when removing non-existent holiday', () => {
      const removed = service.removeHoliday('non-existent-id');
      expect(removed).toBe(false);
    });

    it('should update an existing holiday', () => {
      const updatedHoliday: Holiday = {
        id: 'nowruz-1',
        name: 'Updated Nowruz Day 1',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'official',
        description: 'Updated description'
      };
      service.updateHoliday(updatedHoliday);
      const holiday = service.getHolidayById('nowruz-1');
      expect(holiday?.name).toBe('Updated Nowruz Day 1');
      expect(holiday?.description).toBe('Updated description');
    });

    it('should not update non-existent holiday', () => {
      const nonExistentHoliday: Holiday = {
        id: 'non-existent',
        name: 'Non-existent',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'custom'
      };
      const initialCount = service.getHolidayCount();
      service.updateHoliday(nonExistentHoliday);
      expect(service.getHolidayCount()).toBe(initialCount);
    });

    it('should get holiday by ID', () => {
      const holiday = service.getHolidayById('nowruz-1');
      expect(holiday).toBeTruthy();
      expect(holiday?.id).toBe('nowruz-1');
      expect(holiday?.name).toBe('Nowruz Day 1');
    });

    it('should return null for non-existent holiday ID', () => {
      const holiday = service.getHolidayById('non-existent');
      expect(holiday).toBeNull();
    });

    it('should check if holiday exists', () => {
      expect(service.hasHoliday('nowruz-1')).toBe(true);
      expect(service.hasHoliday('non-existent')).toBe(false);
    });
  });

  describe('Holiday Querying by Month', () => {
    it('should get holidays for a specific month', () => {
      const month1Holidays = service.getHolidaysForMonth(1);
      expect(month1Holidays.length).toBeGreaterThan(0);
      month1Holidays.forEach(h => {
        expect(h.jalaliMonth).toBe(1);
      });
    });

    it('should return empty array for month with no holidays', () => {
      const month2Holidays = service.getHolidaysForMonth(2);
      expect(month2Holidays.length).toBe(0);
    });

    it('should get holidays for month 9 (Ashura)', () => {
      const month9Holidays = service.getHolidaysForMonth(9);
      expect(month9Holidays.length).toBeGreaterThan(0);
      expect(month9Holidays.some(h => h.id === 'ashura')).toBe(true);
    });

    it('should get holidays for month 10 (Eid Fitr)', () => {
      const month10Holidays = service.getHolidaysForMonth(10);
      expect(month10Holidays.length).toBeGreaterThan(0);
      expect(month10Holidays.some(h => h.id === 'eid-fitr')).toBe(true);
    });

    it('should get holidays for month 11 (Oil and Resistance Days)', () => {
      const month11Holidays = service.getHolidaysForMonth(11);
      expect(month11Holidays.length).toBeGreaterThanOrEqual(2);
      expect(month11Holidays.some(h => h.id === 'oil-day')).toBe(true);
      expect(month11Holidays.some(h => h.id === 'resistance-day')).toBe(true);
    });

    it('should get holidays for month 12 (Education Day and Eid Adha)', () => {
      const month12Holidays = service.getHolidaysForMonth(12);
      expect(month12Holidays.length).toBeGreaterThanOrEqual(2);
      expect(month12Holidays.some(h => h.id === 'education-day')).toBe(true);
      expect(month12Holidays.some(h => h.id === 'eid-adha')).toBe(true);
    });
  });

  describe('Holiday Querying by Year', () => {
    it('should get holidays for a specific year', () => {
      const yearHolidays = service.getHolidaysForYear(1402);
      expect(yearHolidays.length).toBe(16);
    });

    it('should return same holidays for any year', () => {
      const year1Holidays = service.getHolidaysForYear(1402);
      const year2Holidays = service.getHolidaysForYear(1403);
      expect(year1Holidays.length).toBe(year2Holidays.length);
    });
  });

  describe('Holiday Filtering by Type', () => {
    it('should get all official holidays', () => {
      const officialHolidays = service.getOfficialHolidays();
      expect(officialHolidays.length).toBeGreaterThan(0);
      officialHolidays.forEach(h => {
        expect(h.type).toBe('official');
      });
    });

    it('should get all religious holidays', () => {
      const religiousHolidays = service.getReligiousHolidays();
      expect(religiousHolidays.length).toBeGreaterThan(0);
      religiousHolidays.forEach(h => {
        expect(h.type).toBe('religious');
      });
    });

    it('should get holidays by type', () => {
      const customHolidays = service.getHolidaysByType('custom');
      expect(customHolidays.length).toBe(0);
      const newCustom: Holiday = {
        id: 'custom-1',
        name: 'Custom',
        jalaliMonth: 1,
        jalaliDay: 20,
        type: 'custom'
      };
      service.addHoliday(newCustom);
      const customHolidaysAfter = service.getHolidaysByType('custom');
      expect(customHolidaysAfter.length).toBe(1);
    });

    it('should get non-official holidays', () => {
      const nonOfficialHolidays = service.getHolidaysByType('non-official');
      expect(nonOfficialHolidays.length).toBeGreaterThan(0);
      nonOfficialHolidays.forEach(h => {
        expect(h.type).toBe('non-official');
      });
    });
  });

  describe('Holiday Checking by Jalali Date', () => {
    it('should check if date is a holiday by Jalali date', () => {
      const isHoliday = service.isHolidayByJalali({ month: 1, day: 1 });
      expect(isHoliday).toBe(true);
    });

    it('should return false for non-holiday Jalali date', () => {
      const isHoliday = service.isHolidayByJalali({ month: 2, day: 15 });
      expect(isHoliday).toBe(false);
    });

    it('should get holiday info by Jalali date', () => {
      const holiday = service.getHolidayInfoByJalali({ month: 1, day: 1 });
      expect(holiday).toBeTruthy();
      expect(holiday?.id).toBe('nowruz-1');
    });

    it('should return null for non-holiday Jalali date', () => {
      const holiday = service.getHolidayInfoByJalali({ month: 2, day: 15 });
      expect(holiday).toBeNull();
    });

    it('should handle multiple holidays on same date', () => {
      const holiday = service.getHolidayInfoByJalali({ month: 1, day: 13 });
      expect(holiday).toBeTruthy();
    });
  });
});


  describe('Holiday Checking by Gregorian Date', () => {
    it('should check if Gregorian date is official holiday', () => {
      const date = new Date(2024, 2, 20);
      const isOfficial = service.isOfficialHoliday(date);
      expect(isOfficial).toBe(true);
    });

    it('should return false for non-official holiday', () => {
      const date = new Date(2024, 0, 15);
      const isOfficial = service.isOfficialHoliday(date);
      expect(isOfficial).toBe(false);
    });

    it('should check if Gregorian date is religious holiday', () => {
      const date = new Date(2024, 8, 30);
      const isReligious = service.isReligiousHoliday(date);
      expect(isReligious).toBe(true);
    });

    it('should return false when no JalaliDateService', () => {
      const serviceWithoutDependency = new HolidaysService();
      const date = new Date(2024, 2, 20);
      expect(serviceWithoutDependency.isOfficialHoliday(date)).toBe(false);
      expect(serviceWithoutDependency.isReligiousHoliday(date)).toBe(false);
    });

    it('should get holiday info for Gregorian date', () => {
      const date = new Date(2024, 2, 20);
      const info = service.getHolidayInfo(date);
      expect(info.isHoliday).toBe(true);
      expect(info.type).toBe('official');
    });

    it('should get holidays for Gregorian date', () => {
      const date = new Date(2024, 2, 20);
      const holidays = service.getHolidaysForDate(date);
      expect(holidays.length).toBeGreaterThan(0);
    });

    it('should return empty array for non-holiday Gregorian date', () => {
      const date = new Date(2024, 0, 15);
      const holidays = service.getHolidaysForDate(date);
      expect(holidays.length).toBe(0);
    });
  });

  describe('Weekend Detection', () => {
    it('should detect Friday as weekend', () => {
      const friday = new Date(2024, 0, 12);
      expect(service.isWeekend(friday)).toBe(true);
    });

    it('should detect Saturday as weekend', () => {
      const saturday = new Date(2024, 0, 13);
      expect(service.isWeekend(saturday)).toBe(true);
    });

    it('should not detect weekday as weekend', () => {
      const monday = new Date(2024, 0, 15);
      expect(service.isWeekend(monday)).toBe(false);
      const wednesday = new Date(2024, 0, 17);
      expect(service.isWeekend(wednesday)).toBe(false);
    });

    it('should detect all days of week correctly', () => {
      const sunday = new Date(2024, 0, 7);
      const monday = new Date(2024, 0, 8);
      const tuesday = new Date(2024, 0, 9);
      const wednesday = new Date(2024, 0, 10);
      const thursday = new Date(2024, 0, 11);
      const friday = new Date(2024, 0, 12);
      const saturday = new Date(2024, 0, 13);
      expect(service.isWeekend(sunday)).toBe(false);
      expect(service.isWeekend(monday)).toBe(false);
      expect(service.isWeekend(tuesday)).toBe(false);
      expect(service.isWeekend(wednesday)).toBe(false);
      expect(service.isWeekend(thursday)).toBe(false);
      expect(service.isWeekend(friday)).toBe(true);
      expect(service.isWeekend(saturday)).toBe(true);
    });
  });

  describe('Holiday and Weekend Combination', () => {
    it('should check if date is holiday or weekend', () => {
      const friday = new Date(2024, 0, 12);
      expect(service.isHolidayOrWeekend(friday)).toBe(true);
      const nowruz = new Date(2024, 2, 20);
      expect(service.isHolidayOrWeekend(nowruz)).toBe(true);
      const regularDay = new Date(2024, 0, 15);
      expect(service.isHolidayOrWeekend(regularDay)).toBe(false);
    });

    it('should return false when no JalaliDateService for isHolidayOrWeekend', () => {
      const serviceWithoutDependency = new HolidaysService();
      const friday = new Date(2024, 0, 12);
      expect(serviceWithoutDependency.isHolidayOrWeekend(friday)).toBe(true);
    });
  });

  describe('Next Holiday Navigation', () => {
    it('should get next holiday from a date', () => {
      const date = new Date(2024, 2, 19);
      const nextHoliday = service.getNextHoliday(date);
      expect(nextHoliday).toBeTruthy();
      expect(nextHoliday?.id).toBe('nowruz-1');
    });

    it('should return null when no JalaliDateService', () => {
      const serviceWithoutDependency = new HolidaysService();
      const date = new Date(2024, 2, 20);
      expect(serviceWithoutDependency.getNextHoliday(date)).toBeNull();
    });

    it('should skip current date and find next holiday', () => {
      const date = new Date(2024, 2, 20);
      const nextHoliday = service.getNextHoliday(date);
      expect(nextHoliday).toBeTruthy();
      expect(nextHoliday?.id).not.toBe('nowruz-1');
    });

    it('should search within 365 days', () => {
      const date = new Date(2024, 0, 1);
      const nextHoliday = service.getNextHoliday(date);
      expect(nextHoliday).toBeTruthy();
    });
  });

  describe('Previous Holiday Navigation', () => {
    it('should get previous holiday from a date', () => {
      const date = new Date(2024, 2, 21);
      const prevHoliday = service.getPreviousHoliday(date);
      expect(prevHoliday).toBeTruthy();
    });

    it('should return null when no JalaliDateService', () => {
      const serviceWithoutDependency = new HolidaysService();
      const date = new Date(2024, 2, 20);
      expect(serviceWithoutDependency.getPreviousHoliday(date)).toBeNull();
    });

    it('should skip current date and find previous holiday', () => {
      const date = new Date(2024, 2, 20);
      const prevHoliday = service.getPreviousHoliday(date);
      expect(prevHoliday).toBeTruthy();
    });

    it('should search within 365 days backwards', () => {
      const date = new Date(2024, 11, 31);
      const prevHoliday = service.getPreviousHoliday(date);
      expect(prevHoliday).toBeTruthy();
    });
  });

  describe('Holiday Range Queries', () => {
    it('should get holidays between two dates', () => {
      const startDate = new Date(2024, 2, 19);
      const endDate = new Date(2024, 2, 25);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBeGreaterThan(0);
    });

    it('should return empty array when no holidays in range', () => {
      const startDate = new Date(2024, 1, 1);
      const endDate = new Date(2024, 1, 28);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBe(0);
    });

    it('should not include duplicate holidays', () => {
      const startDate = new Date(2024, 2, 19);
      const endDate = new Date(2024, 2, 25);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      const ids = holidays.map(h => h.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should return empty array when no JalaliDateService', () => {
      const serviceWithoutDependency = new HolidaysService();
      const startDate = new Date(2024, 2, 19);
      const endDate = new Date(2024, 2, 25);
      const holidays = serviceWithoutDependency.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBe(0);
    });
  });

  describe('Holiday Count and Existence', () => {
    it('should get total holiday count', () => {
      const count = service.getHolidayCount();
      expect(count).toBe(16);
    });

    it('should update count after adding holiday', () => {
      const initialCount = service.getHolidayCount();
      const newHoliday: Holiday = {
        id: 'test-holiday',
        name: 'Test',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      service.addHoliday(newHoliday);
      expect(service.getHolidayCount()).toBe(initialCount + 1);
    });

    it('should update count after removing holiday', () => {
      const initialCount = service.getHolidayCount();
      service.removeHoliday('nowruz-1');
      expect(service.getHolidayCount()).toBe(initialCount - 1);
    });

    it('should check holiday existence', () => {
      expect(service.hasHoliday('nowruz-1')).toBe(true);
      expect(service.hasHoliday('non-existent')).toBe(false);
    });
  });

  describe('Reset to Defaults', () => {
    it('should reset to default holidays', () => {
      const newHoliday: Holiday = {
        id: 'custom-holiday',
        name: 'Custom',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      service.addHoliday(newHoliday);
      expect(service.getHolidayCount()).toBe(17);
      service.resetToDefaults();
      expect(service.getHolidayCount()).toBe(16);
      expect(service.hasHoliday('custom-holiday')).toBe(false);
    });

    it('should restore all default holidays after reset', () => {
      service.removeHoliday('nowruz-1');
      service.resetToDefaults();
      expect(service.hasHoliday('nowruz-1')).toBe(true);
    });

    it('should clear custom holidays', () => {
      const customHoliday: Holiday = {
        id: 'custom-1',
        name: 'Custom',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      service.addHoliday(customHoliday);
      expect(service.getHolidaysByType('custom').length).toBe(1);
      service.clearCustomHolidays();
      expect(service.getHolidaysByType('custom').length).toBe(0);
      expect(service.getHolidayCount()).toBe(16);
    });

    it('should keep default holidays after clearing custom', () => {
      const customHoliday: Holiday = {
        id: 'custom-1',
        name: 'Custom',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      service.addHoliday(customHoliday);
      service.clearCustomHolidays();
      expect(service.hasHoliday('nowruz-1')).toBe(true);
      expect(service.hasHoliday('ashura')).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle invalid month numbers gracefully', () => {
      const holidays = service.getHolidaysForMonth(13);
      expect(holidays.length).toBe(0);
      const holidays2 = service.getHolidaysForMonth(0);
      expect(holidays2.length).toBe(0);
      const holidays3 = service.getHolidaysForMonth(-1);
      expect(holidays3.length).toBe(0);
    });

    it('should handle invalid day numbers gracefully', () => {
      const holiday = service.getHolidayInfoByJalali({ month: 1, day: 32 });
      expect(holiday).toBeNull();
      const holiday2 = service.getHolidayInfoByJalali({ month: 1, day: 0 });
      expect(holiday2).toBeNull();
      const holiday3 = service.getHolidayInfoByJalali({ month: 1, day: -1 });
      expect(holiday3).toBeNull();
    });

    it('should handle adding holiday with same ID but different properties', () => {
      const holiday1: Holiday = {
        id: 'test-id',
        name: 'Holiday 1',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'custom'
      };
      service.addHoliday(holiday1);
      const holiday2: Holiday = {
        id: 'test-id',
        name: 'Holiday 2',
        jalaliMonth: 2,
        jalaliDay: 2,
        type: 'custom'
      };
      service.addHoliday(holiday2);
      const retrieved = service.getHolidayById('test-id');
      expect(retrieved?.name).toBe('Holiday 1');
    });

    it('should handle removing and re-adding same holiday', () => {
      const holiday: Holiday = {
        id: 'test-holiday',
        name: 'Test',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      service.addHoliday(holiday);
      expect(service.hasHoliday('test-holiday')).toBe(true);
      service.removeHoliday('test-holiday');
      expect(service.hasHoliday('test-holiday')).toBe(false);
      service.addHoliday(holiday);
      expect(service.hasHoliday('test-holiday')).toBe(true);
    });

    it('should handle updating holiday with same ID', () => {
      const updated: Holiday = {
        id: 'nowruz-1',
        name: 'Updated Name',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'official',
        description: 'Updated'
      };
      service.updateHoliday(updated);
      const holiday = service.getHolidayById('nowruz-1');
      expect(holiday?.name).toBe('Updated Name');
      expect(holiday?.description).toBe('Updated');
    });

    it('should handle getAllHolidays returns copy', () => {
      const holidays1 = service.getAllHolidays();
      const holidays2 = service.getAllHolidays();
      expect(holidays1).not.toBe(holidays2);
      expect(holidays1).toEqual(holidays2);
    });

    it('should handle getHolidaysForMonth returns copy', () => {
      const holidays1 = service.getHolidaysForMonth(1);
      const holidays2 = service.getHolidaysForMonth(1);
      expect(holidays1).not.toBe(holidays2);
      expect(holidays1).toEqual(holidays2);
    });

    it('should handle getHolidaysForYear returns copy', () => {
      const holidays1 = service.getHolidaysForYear(1402);
      const holidays2 = service.getHolidaysForYear(1402);
      expect(holidays1).not.toBe(holidays2);
      expect(holidays1).toEqual(holidays2);
    });

    it('should handle boundary dates correctly', () => {
      const startDate = new Date(2024, 2, 20);
      const endDate = new Date(2024, 2, 20);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBeGreaterThan(0);
    });

    it('should handle reversed date range', () => {
      const startDate = new Date(2024, 2, 25);
      const endDate = new Date(2024, 2, 20);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBe(0);
    });
  });

  describe('Integration Tests', () => {
    it('should maintain consistency across operations', () => {
      const initialCount = service.getHolidayCount();
      const holiday: Holiday = {
        id: 'integration-test',
        name: 'Integration Test',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      service.addHoliday(holiday);
      expect(service.getHolidayCount()).toBe(initialCount + 1);
      expect(service.hasHoliday('integration-test')).toBe(true);
      service.updateHoliday({
        ...holiday,
        name: 'Updated Integration Test'
      });
      expect(service.getHolidayById('integration-test')?.name).toBe('Updated Integration Test');
      service.removeHoliday('integration-test');
      expect(service.getHolidayCount()).toBe(initialCount);
      expect(service.hasHoliday('integration-test')).toBe(false);
    });

    it('should work with multiple custom holidays', () => {
      const holidays: Holiday[] = [
        {
          id: 'custom-1',
          name: 'Custom 1',
          jalaliMonth: 2,
          jalaliDay: 10,
          type: 'custom'
        },
        {
          id: 'custom-2',
          name: 'Custom 2',
          jalaliMonth: 3,
          jalaliDay: 15,
          type: 'custom'
        },
        {
          id: 'custom-3',
          name: 'Custom 3',
          jalaliMonth: 4,
          jalaliDay: 20,
          type: 'custom'
        }
      ];
      const initialCount = service.getHolidayCount();
      holidays.forEach(h => service.addHoliday(h));
      expect(service.getHolidayCount()).toBe(initialCount + 3);
      expect(service.getHolidaysByType('custom').length).toBe(3);
      service.clearCustomHolidays();
      expect(service.getHolidayCount()).toBe(initialCount);
    });

    it('should filter holidays correctly after modifications', () => {
      const initialOfficialCount = service.getOfficialHolidays().length;
      const customHoliday: Holiday = {
        id: 'custom-official',
        name: 'Custom Official',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'official'
      };
      service.addHoliday(customHoliday);
      expect(service.getOfficialHolidays().length).toBe(initialOfficialCount + 1);
      service.removeHoliday('custom-official');
      expect(service.getOfficialHolidays().length).toBe(initialOfficialCount);
    });

    it('should handle complex date range queries', () => {
      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 11, 31);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBeGreaterThan(0);
      expect(holidays.length).toBeLessThanOrEqual(16);
      const uniqueIds = new Set(holidays.map(h => h.id));
      expect(uniqueIds.size).toBe(holidays.length);
    });
  });

  describe('Mock JalaliDateService Integration', () => {
    it('should use provided JalaliDateService', () => {
      const date = new Date(2024, 2, 20);
      service.isOfficialHoliday(date);
      expect(mockJalaliDateService.gregorianToJalali).toHaveBeenCalled();
    });

    it('should handle JalaliDateService conversion results', () => {
      const date = new Date(2024, 2, 20);
      const isHoliday = service.isOfficialHoliday(date);
      expect(isHoliday).toBe(true);
    });

    it('should work without JalaliDateService for Jalali-based methods', () => {
      const serviceWithoutDependency = new HolidaysService();
      const holiday = serviceWithoutDependency.getHolidayInfoByJalali({ month: 1, day: 1 });
      expect(holiday).toBeTruthy();
      expect(holiday?.id).toBe('nowruz-1');
    });

    it('should return false for Gregorian methods without JalaliDateService', () => {
      const serviceWithoutDependency = new HolidaysService();
      const date = new Date(2024, 2, 20);
      expect(serviceWithoutDependency.isOfficialHoliday(date)).toBe(false);
      expect(serviceWithoutDependency.isNonOfficialHoliday(date)).toBe(false);
      expect(serviceWithoutDependency.isReligiousHoliday(date)).toBe(false);
      expect(serviceWithoutDependency.getHolidayInfo(date).isHoliday).toBe(false);
      expect(serviceWithoutDependency.getHolidaysForDate(date).length).toBe(0);
      expect(serviceWithoutDependency.getNextHoliday(date)).toBeNull();
      expect(serviceWithoutDependency.getPreviousHoliday(date)).toBeNull();
      expect(serviceWithoutDependency.getHolidaysBetween(date, date).length).toBe(0);
    });
  });

  describe('Code Coverage - Additional Scenarios', () => {
    it('should handle all holiday types in filtering', () => {
      const types: Array<'official' | 'non-official' | 'religious' | 'custom'> = [
        'official',
        'non-official',
        'religious',
        'custom'
      ];
      types.forEach(type => {
        const holidays = service.getHolidaysByType(type);
        if (type === 'custom') {
          expect(holidays.length).toBe(0);
        } else {
          expect(holidays.length).toBeGreaterThan(0);
        }
      });
    });

    it('should handle all months in year', () => {
      for (let month = 1; month <= 12; month++) {
        const holidays = service.getHolidaysForMonth(month);
        expect(Array.isArray(holidays)).toBe(true);
      }
    });

    it('should verify all default holidays have valid properties', () => {
      const holidays = service.getAllHolidays();
      holidays.forEach(holiday => {
        expect(holiday.id).toBeTruthy();
        expect(holiday.name).toBeTruthy();
        expect(holiday.jalaliMonth).toBeGreaterThanOrEqual(1);
        expect(holiday.jalaliMonth).toBeLessThanOrEqual(12);
        expect(holiday.jalaliDay).toBeGreaterThanOrEqual(1);
        expect(holiday.jalaliDay).toBeLessThanOrEqual(31);
        expect(['official', 'non-official', 'religious', 'custom']).toContain(holiday.type);
      });
    });

    it('should handle rapid add/remove operations', () => {
      const holiday: Holiday = {
        id: 'rapid-test',
        name: 'Rapid Test',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      };
      for (let i = 0; i < 5; i++) {
        service.addHoliday(holiday);
        expect(service.hasHoliday('rapid-test')).toBe(true);
        service.removeHoliday('rapid-test');
        expect(service.hasHoliday('rapid-test')).toBe(false);
      }
    });

    it('should handle large date ranges', () => {
      const startDate = new Date(2000, 0, 1);
      const endDate = new Date(2050, 11, 31);
      const holidays = service.getHolidaysBetween(startDate, endDate);
      expect(holidays.length).toBeGreaterThan(0);
    });

    it('should maintain data integrity after multiple operations', () => {
      const originalCount = service.getHolidayCount();
      const originalHolidays = service.getAllHolidays();
      service.addHoliday({
        id: 'test-1',
        name: 'Test 1',
        jalaliMonth: 5,
        jalaliDay: 15,
        type: 'custom'
      });
      service.removeHoliday('test-1');
      expect(service.getHolidayCount()).toBe(originalCount);
      expect(service.getAllHolidays()).toEqual(originalHolidays);
    });
  });
});
