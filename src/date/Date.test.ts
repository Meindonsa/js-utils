import {
  formatDate,
  addDays,
  addMonths,
  addYears,
  diffInDays,
  diffInHours,
  diffInMinutes,
  isToday,
  isYesterday,
  isTomorrow,
  isLeapYear,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  isBetween,
  getRelativeTime,
} from './Date';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format date with YYYY-MM-DD pattern', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('should format date with DD/MM/YYYY pattern', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/01/2024');
    });

    it('should format date with time', () => {
      const date = new Date('2024-01-15T10:30:45');
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-15 10:30:45');
    });
  });

  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date('2024-01-15');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(20);
    });

    it('should subtract days with negative value', () => {
      const date = new Date('2024-01-15');
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(10);
    });

    it('should handle month overflow', () => {
      const date = new Date('2024-01-30');
      const result = addDays(date, 5);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(4);
    });
  });

  describe('addMonths', () => {
    it('should add months to date', () => {
      const date = new Date('2024-01-15');
      const result = addMonths(date, 2);
      expect(result.getMonth()).toBe(2); // March
    });

    it('should handle year overflow', () => {
      const date = new Date('2024-11-15');
      const result = addMonths(date, 3);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1); // February
    });
  });

  describe('addYears', () => {
    it('should add years to date', () => {
      const date = new Date('2024-01-15');
      const result = addYears(date, 1);
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe('diffInDays', () => {
    it('should calculate difference in days', () => {
      const date1 = new Date('2024-01-20');
      const date2 = new Date('2024-01-15');
      expect(diffInDays(date1, date2)).toBe(5);
    });

    it('should handle negative difference', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-20');
      expect(diffInDays(date1, date2)).toBe(-5);
    });
  });

  describe('diffInHours', () => {
    it('should calculate difference in hours', () => {
      const date1 = new Date('2024-01-15T12:00:00');
      const date2 = new Date('2024-01-15T10:00:00');
      expect(diffInHours(date1, date2)).toBe(2);
    });
  });

  describe('diffInMinutes', () => {
    it('should calculate difference in minutes', () => {
      const date1 = new Date('2024-01-15T12:30:00');
      const date2 = new Date('2024-01-15T12:00:00');
      expect(diffInMinutes(date1, date2)).toBe(30);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      expect(isToday(new Date())).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = addDays(new Date(), -1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isYesterday', () => {
    it('should return true for yesterday', () => {
      const yesterday = addDays(new Date(), -1);
      expect(isYesterday(yesterday)).toBe(true);
    });

    it('should return false for today', () => {
      expect(isYesterday(new Date())).toBe(false);
    });
  });

  describe('isTomorrow', () => {
    it('should return true for tomorrow', () => {
      const tomorrow = addDays(new Date(), 1);
      expect(isTomorrow(tomorrow)).toBe(true);
    });

    it('should return false for today', () => {
      expect(isTomorrow(new Date())).toBe(false);
    });
  });

  describe('isLeapYear', () => {
    it('should return true for leap years', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
    });

    it('should return false for non-leap years', () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(1900)).toBe(false);
    });
  });

  describe('startOfDay', () => {
    it('should set time to 00:00:00', () => {
      const date = new Date('2024-01-15T15:30:45');
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    it('should set time to 23:59:59.999', () => {
      const date = new Date('2024-01-15T10:00:00');
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('startOfMonth', () => {
    it('should set to first day of month', () => {
      const date = new Date('2024-01-15');
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
    });
  });

  describe('endOfMonth', () => {
    it('should set to last day of month', () => {
      const date = new Date('2024-01-15');
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(31);
    });

    it('should handle February', () => {
      const date = new Date('2024-02-15');
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(29); // 2024 is leap year
    });
  });

  describe('isBetween', () => {
    it('should return true for date in range', () => {
      const date = new Date('2024-01-15');
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-31');
      expect(isBetween(date, start, end)).toBe(true);
    });

    it('should return false for date outside range', () => {
      const date = new Date('2024-02-15');
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-31');
      expect(isBetween(date, start, end)).toBe(false);
    });

    it('should handle inclusive boundaries', () => {
      const date = new Date('2024-01-01');
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-31');
      expect(isBetween(date, start, end, true)).toBe(true);
      expect(isBetween(date, start, end, false)).toBe(false);
    });
  });

  describe('getRelativeTime', () => {
    it('should return "just now" for recent dates', () => {
      const date = new Date();
      expect(getRelativeTime(date)).toBe('just now');
    });

    it('should return hours ago', () => {
      const date = new Date();
      date.setHours(date.getHours() - 2);
      expect(getRelativeTime(date)).toBe('2 hours ago');
    });

    it('should return days ago', () => {
      const date = addDays(new Date(), -3);
      expect(getRelativeTime(date)).toBe('3 days ago');
    });

    it('should handle future dates', () => {
      const date = addDays(new Date(), 5);
      expect(getRelativeTime(date)).toBe('in 5 days');
    });
  });
});
