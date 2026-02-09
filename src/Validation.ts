/**
 * Validation utilities module
 * Provides helper functions for data validation
 */

/**
 * Validate email format
 * @param email - The email to validate
 * @returns True if email format is valid
 * @example
 * ```ts
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * ```
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate URL format
 * @param url - The URL to validate
 * @returns True if URL format is valid
 * @example
 * ```ts
 * isValidUrl('https://example.com') // true
 * isValidUrl('not-a-url') // false
 * ```
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate phone number (basic validation)
 * @param phone - The phone number to validate
 * @returns True if phone format is valid
 * @example
 * ```ts
 * isValidPhone('+1234567890') // true
 * isValidPhone('123-456-7890') // true
 * ```
 */
export function isValidPhone(phone: string): boolean {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it has between 10 and 15 digits
    return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate credit card number using Luhn algorithm
 * @param cardNumber - The credit card number to validate
 * @returns True if card number is valid
 * @example
 * ```ts
 * isValidCreditCard('4532015112830366') // true
 * ```
 */
export function isValidCreditCard(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');

    if (!/^\d+$/.test(cleaned)) {
        return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

/**
 * Validate password strength
 * @param password - The password to validate
 * @param options - Validation options
 * @returns Object with validation result and details
 * @example
 * ```ts
 * validatePassword('MyP@ssw0rd', { minLength: 8, requireUppercase: true })
 * // { isValid: true, errors: [] }
 * ```
 */
export function validatePassword(
    password: string,
    options: {
        minLength?: number;
        requireUppercase?: boolean;
        requireLowercase?: boolean;
        requireNumbers?: boolean;
        requireSpecialChars?: boolean;
    } = {}
): { isValid: boolean; errors: string[] } {
    const {
        minLength = 8,
        requireUppercase = true,
        requireLowercase = true,
        requireNumbers = true,
        requireSpecialChars = true,
    } = options;

    const errors: string[] = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (requireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Validate if string is numeric
 * @param value - The value to check
 * @returns True if value is numeric
 * @example
 * ```ts
 * isNumeric('123') // true
 * isNumeric('12.34') // true
 * isNumeric('abc') // false
 * ```
 */
export function isNumeric(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

/**
 * Validate if string contains only letters
 * @param value - The value to check
 * @returns True if value contains only letters
 * @example
 * ```ts
 * isAlpha('abc') // true
 * isAlpha('abc123') // false
 * ```
 */
export function isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value);
}

/**
 * Validate if string contains only letters and numbers
 * @param value - The value to check
 * @returns True if value contains only alphanumeric characters
 * @example
 * ```ts
 * isAlphanumeric('abc123') // true
 * isAlphanumeric('abc-123') // false
 * ```
 */
export function isAlphanumeric(value: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Validate if value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - The value to check
 * @returns True if value is empty
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(null) // true
 * isEmpty('text') // false
 * ```
 */
export function isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}

/**
 * Validate if value is within a range
 * @param value - The number to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if value is in range
 * @example
 * ```ts
 * isInRange(5, 1, 10) // true
 * isInRange(15, 1, 10) // false
 * ```
 */
export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

/**
 * Validate if string matches a pattern
 * @param value - The string to check
 * @param pattern - Regular expression pattern
 * @returns True if string matches pattern
 * @example
 * ```ts
 * matchesPattern('ABC123', /^[A-Z]{3}\d{3}$/) // true
 * ```
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
}

/**
 * Validate if date is valid
 * @param date - Date string or Date object
 * @returns True if date is valid
 * @example
 * ```ts
 * isValidDate('2024-01-15') // true
 * isValidDate('invalid') // false
 * isValidDate(new Date()) // true
 * ```
 */
export function isValidDate(date: string | Date): boolean {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d instanceof Date && !isNaN(d.getTime());
}

/**
 * Validate JSON string
 * @param value - The string to validate
 * @returns True if string is valid JSON
 * @example
 * ```ts
 * isValidJson('{"key": "value"}') // true
 * isValidJson('invalid json') // false
 * ```
 */
export function isValidJson(value: string): boolean {
    try {
        JSON.parse(value);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate hex color code
 * @param color - The color code to validate
 * @returns True if color is valid hex
 * @example
 * ```ts
 * isValidHexColor('#FF5733') // true
 * isValidHexColor('#FFF') // true
 * isValidHexColor('FF5733') // false
 * ```
 */
export function isValidHexColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validate IP address (IPv4)
 * @param ip - The IP address to validate
 * @returns True if IP is valid
 * @example
 * ```ts
 * isValidIpv4('192.168.1.1') // true
 * isValidIpv4('256.1.1.1') // false
 * ```
 */
export function isValidIpv4(ip: string): boolean {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;

    return parts.every((part) => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255 && part === num.toString();
    });
}

/**
 * Validate username (alphanumeric, underscore, hyphen, 3-20 chars)
 * @param username - The username to validate
 * @returns True if username is valid
 * @example
 * ```ts
 * isValidUsername('user_name-123') // true
 * isValidUsername('ab') // false (too short)
 * ```
 */
export function isValidUsername(username: string): boolean {
    return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}