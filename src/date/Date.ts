/**
 * Date utilities module
 * Provides helper functions for working with dates and times
 */

/**
 * Format a date to a specific pattern
 * @param date - The date to format
 * @param format - Format pattern (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * @returns Formatted date string
 * @example
 * ```ts
 * formatDate(new Date('2024-01-15'), 'YYYY-MM-DD') // '2024-01-15'
 * formatDate(new Date('2024-01-15'), 'DD/MM/YYYY') // '15/01/2024'
 * ```
 */
export function formatDate(date: Date, format: string): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  const hours: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');
  const seconds: string = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Add days to a date
 * @param date - The base date
 * @param days - Number of days to add (can be negative)
 * @returns New date with days added
 * @example
 * ```ts
 * addDays(new Date('2024-01-15'), 5) // 2024-01-20
 * addDays(new Date('2024-01-15'), -5) // 2024-01-10
 * ```
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 * @param date - The base date
 * @param months - Number of months to add (can be negative)
 * @returns New date with months added
 * @example
 * ```ts
 * addMonths(new Date('2024-01-15'), 2) // 2024-03-15
 * ```
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 * @param date - The base date
 * @param years - Number of years to add (can be negative)
 * @returns New date with years added
 * @example
 * ```ts
 * addYears(new Date('2024-01-15'), 1) // 2025-01-15
 * ```
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Get the difference between two dates in days
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days between dates (can be negative)
 * @example
 * ```ts
 * diffInDays(new Date('2024-01-20'), new Date('2024-01-15')) // 5
 * ```
 */
export function diffInDays(date1: Date, date2: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc1 - utc2) / msPerDay);
}

/**
 * Get the difference between two dates in hours
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of hours between dates
 * @example
 * ```ts
 * diffInHours(new Date('2024-01-15 12:00'), new Date('2024-01-15 10:00')) // 2
 * ```
 */
export function diffInHours(date1: Date, date2: Date): number {
  const msPerHour = 60 * 60 * 1000;
  return Math.floor((date1.getTime() - date2.getTime()) / msPerHour);
}

/**
 * Get the difference between two dates in minutes
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of minutes between dates
 * @example
 * ```ts
 * diffInMinutes(new Date('2024-01-15 12:30'), new Date('2024-01-15 12:00')) // 30
 * ```
 */
export function diffInMinutes(date1: Date, date2: Date): number {
  const msPerMinute: number = 60 * 1000;
  return Math.floor((date1.getTime() - date2.getTime()) / msPerMinute);
}

/**
 * Check if a date is today
 * @param date - The date to check
 * @returns True if the date is today
 * @example
 * ```ts
 * isToday(new Date()) // true
 * ```
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is yesterday
 * @param date - The date to check
 * @returns True if the date is yesterday
 * @example
 * ```ts
 * isYesterday(addDays(new Date(), -1)) // true
 * ```
 */
export function isYesterday(date: Date): boolean {
  const yesterday: Date = addDays(new Date(), -1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Check if a date is tomorrow
 * @param date - The date to check
 * @returns True if the date is tomorrow
 * @example
 * ```ts
 * isTomorrow(addDays(new Date(), 1)) // true
 * ```
 */
export function isTomorrow(date: Date): boolean {
  const tomorrow: Date = addDays(new Date(), 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

/**
 * Check if a year is a leap year
 * @param year - The year to check
 * @returns True if the year is a leap year
 * @example
 * ```ts
 * isLeapYear(2024) // true
 * isLeapYear(2023) // false
 * ```
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the start of day for a date
 * @param date - The date
 * @returns New date set to start of day (00:00:00.000)
 * @example
 * ```ts
 * startOfDay(new Date('2024-01-15 15:30')) // 2024-01-15 00:00:00.000
 * ```
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of day for a date
 * @param date - The date
 * @returns New date set to end of day (23:59:59.999)
 * @example
 * ```ts
 * endOfDay(new Date('2024-01-15 10:00')) // 2024-01-15 23:59:59.999
 * ```
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get the start of month for a date
 * @param date - The date
 * @returns New date set to first day of month
 * @example
 * ```ts
 * startOfMonth(new Date('2024-01-15')) // 2024-01-01
 * ```
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of month for a date
 * @param date - The date
 * @returns New date set to last day of month
 * @example
 * ```ts
 * endOfMonth(new Date('2024-01-15')) // 2024-01-31
 * ```
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Check if a date is between two dates
 * @param date - The date to check
 * @param startDate - Start of range
 * @param endDate - End of range
 * @param inclusive - Whether to include boundaries (default: true)
 * @returns True if date is in range
 * @example
 * ```ts
 * isBetween(new Date('2024-01-15'), new Date('2024-01-01'), new Date('2024-01-31')) // true
 * ```
 */
export function isBetween(
  date: Date,
  startDate: Date,
  endDate: Date,
  inclusive: boolean = true,
): boolean {
  const time = date.getTime();
  const start = startDate.getTime();
  const end = endDate.getTime();

  if (inclusive) {
    return time >= start && time <= end;
  }
  return time > start && time < end;
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - The date to compare
 * @param baseDate - Base date for comparison (default: now)
 * @returns Relative time string
 * @example
 * ```ts
 * getRelativeTime(addDays(new Date(), -2)) // '2 days ago'
 * getRelativeTime(addHours(new Date(), 3)) // 'in 3 hours'
 * ```
 */
export function getRelativeTime(date: Date, baseDate: Date = new Date()): string {
  const seconds = Math.floor((baseDate.getTime() - date.getTime()) / 1000);

  if (Math.abs(seconds) < 60) {
    return 'just now';
  }

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(seconds) / interval.seconds);
    if (count >= 1) {
      const plural = count > 1 ? 's' : '';
      return seconds > 0
        ? `${count} ${interval.label}${plural} ago`
        : `in ${count} ${interval.label}${plural}`;
    }
  }

  return 'just now';
}
