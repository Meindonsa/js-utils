/**
 * Random utilities module
 * Provides helper functions for generating random values
 */

/**
 * Generate random number between min and max
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random number
 * @example
 * ```ts
 * randomNumber(1, 10) // e.g., 7
 * randomNumber(0, 100) // e.g., 42
 * ```
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random integer
 * @param max - Maximum value (exclusive)
 * @returns Random integer from 0 to max-1
 * @example
 * ```ts
 * randomInt(10) // e.g., 7
 * ```
 */
export function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Generate random float between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Random float
 * @example
 * ```ts
 * randomFloat(0, 1) // e.g., 0.73
 * randomFloat(0, 100, 3) // e.g., 42.157
 * ```
 */
export function randomFloat(min: number, max: number, decimals: number = 2): number {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

/**
 * Generate random boolean
 * @param probability - Probability of true (0-1, default: 0.5)
 * @returns Random boolean
 * @example
 * ```ts
 * randomBoolean() // true or false (50/50)
 * randomBoolean(0.7) // true with 70% probability
 * ```
 */
export function randomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability;
}

/**
 * Generate random numeric string
 * @param length - Length of the string
 * @returns Random numeric string
 * @example
 * ```ts
 * randomNumeric(6) // e.g., '472819'
 * randomNumeric(4) // e.g., '0392'
 * ```
 */
export function randomNumeric(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomInt(10).toString();
  }
  return result;
}

/**
 * Generate random alphabetic string
 * @param length - Length of the string
 * @param uppercase - Use uppercase letters (default: false)
 * @returns Random alphabetic string
 * @example
 * ```ts
 * randomAlpha(8) // e.g., 'jkdfhqlm'
 * randomAlpha(8, true) // e.g., 'HDJSKFLD'
 * ```
 */
export function randomAlpha(length: number, uppercase: boolean = false): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const source = uppercase ? chars.toUpperCase() : chars;

  let result = '';
  for (let i = 0; i < length; i++) {
    result += source[randomInt(source.length)];
  }
  return result;
}

/**
 * Generate random alphanumeric string
 * @param length - Length of the string
 * @param options - Generation options
 * @returns Random alphanumeric string
 * @example
 * ```ts
 * randomAlphanumeric(10) // e.g., 'a3k9d2h5l7'
 * randomAlphanumeric(10, { uppercase: true }) // e.g., 'HJ3K9D2L5Q'
 * randomAlphanumeric(10, { mixedCase: true }) // e.g., 'aK3d9H2l5Q'
 * ```
 */
export function randomAlphanumeric(
  length: number,
  options: {
    uppercase?: boolean;
    mixedCase?: boolean;
  } = {},
): string {
  const { uppercase = false, mixedCase = false } = options;

  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  if (uppercase) {
    chars = chars.toUpperCase();
  } else if (mixedCase) {
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomInt(chars.length)];
  }
  return result;
}

/**
 * Generate random string with custom character set
 * @param length - Length of the string
 * @param charset - Character set to use
 * @returns Random string
 * @example
 * ```ts
 * randomString(8, 'ACGT') // e.g., 'GATTACA' (DNA sequence)
 * randomString(10, '!@#$%') // e.g., '!@#%$#@!%$'
 * ```
 */
export function randomString(length: number, charset: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomInt(charset.length)];
  }
  return result;
}

/**
 * Generate random hex color
 * @returns Random hex color code
 * @example
 * ```ts
 * randomHexColor() // e.g., '#3F7AB2'
 * ```
 */
export function randomHexColor(): string {
  const hex = randomInt(0xffffff).toString(16).padStart(6, '0');
  return `#${hex.toUpperCase()}`;
}

/**
 * Generate random UUID v4
 * @returns Random UUID
 * @example
 * ```ts
 * randomUuid() // e.g., '550e8400-e29b-41d4-a716-446655440000'
 * ```
 */
export function randomUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = randomInt(16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate random element from array
 * @param array - Source array
 * @returns Random element
 * @example
 * ```ts
 * randomElement(['apple', 'banana', 'orange']) // e.g., 'banana'
 * ```
 */
export function randomElement<T>(array: T[]): T {
  return array[randomInt(array.length)];
}

/**
 * Generate random elements from array (without duplicates)
 * @param array - Source array
 * @param count - Number of elements to pick
 * @returns Array of random elements
 * @example
 * ```ts
 * randomElements(['a', 'b', 'c', 'd'], 2) // e.g., ['b', 'd']
 * ```
 */
export function randomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @param array - Array to shuffle
 * @returns New shuffled array
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4, 5]) // e.g., [3, 1, 5, 2, 4]
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate random password
 * @param length - Length of the password
 * @param options - Generation options
 * @returns Random password
 * @example
 * ```ts
 * randomPassword(12) // e.g., 'aB3$dF7!jK9@'
 * randomPassword(8, { uppercase: false, special: false }) // e.g., 'ab3df7jk'
 * ```
 */
export function randomPassword(
  length: number,
  options: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    special?: boolean;
  } = {},
): string {
  const { uppercase = true, lowercase = true, numbers = true, special = true } = options;

  let charset = '';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset.length === 0) {
    throw new Error('At least one character type must be enabled');
  }

  return randomString(length, charset);
}

/**
 * Generate random date between two dates
 * @param start - Start date
 * @param end - End date
 * @returns Random date
 * @example
 * ```ts
 * randomDate(new Date('2024-01-01'), new Date('2024-12-31'))
 * ```
 */
export function randomDate(start: Date, end: Date): Date {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

/**
 * Generate random IP address (IPv4)
 * @returns Random IP address
 * @example
 * ```ts
 * randomIpAddress() // e.g., '192.168.1.42'
 * ```
 */
export function randomIpAddress(): string {
  return `${randomInt(256)}.${randomInt(256)}.${randomInt(256)}.${randomInt(256)}`;
}

/**
 * Generate random MAC address
 * @returns Random MAC address
 * @example
 * ```ts
 * randomMacAddress() // e.g., '3F:7A:B2:C4:D5:E6'
 * ```
 */
export function randomMacAddress(): string {
  const octets = Array.from({ length: 6 }, () =>
    randomInt(256).toString(16).padStart(2, '0').toUpperCase(),
  );
  return octets.join(':');
}
