/**
 * Format utilities module
 * Provides helper functions for formatting numbers, currencies, and text
 */

/**
 * Format a number with thousands separators
 * @param value - The number to format
 * @param separator - Separator character (default: ',')
 * @returns Formatted number string
 * @example
 * ```ts
 * formatNumber(1234567) // '1,234,567'
 * formatNumber(1234567, ' ') // '1 234 567'
 * ```
 */
export function formatNumber(value: number, separator: string = ','): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Format a number as currency
 * @param value - The number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted currency string
 * @example
 * ```ts
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, 'EUR', 'fr-FR') // '1 234,56 €'
 * ```
 */
export function formatCurrency(
    value: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value);
}

/**
 * Format a number as percentage
 * @param value - The number to format (0.15 = 15%)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 * @example
 * ```ts
 * formatPercentage(0.1534) // '15%'
 * formatPercentage(0.1534, 2) // '15.34%'
 * ```
 */
export function formatPercentage(value: number, decimals: number = 0): string {
    return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a number with custom decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string
 * @example
 * ```ts
 * formatDecimal(3.14159, 2) // '3.14'
 * formatDecimal(10, 2) // '10.00'
 * ```
 */
export function formatDecimal(value: number, decimals: number): string {
    return value.toFixed(decimals);
}

/**
 * Truncate text to a maximum length
 * @param text - The text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated text
 * @example
 * ```ts
 * truncate('Hello World', 8) // 'Hello...'
 * truncate('Hello', 10) // 'Hello'
 * ```
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert string to title case
 * @param text - The text to convert
 * @returns Title cased text
 * @example
 * ```ts
 * toTitleCase('hello world') // 'Hello World'
 * toTitleCase('HELLO WORLD') // 'Hello World'
 * ```
 */
export function toTitleCase(text: string): string {
    return text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Convert string to camelCase
 * @param text - The text to convert
 * @returns Camel cased text
 * @example
 * ```ts
 * toCamelCase('hello world') // 'helloWorld'
 * toCamelCase('Hello-World') // 'helloWorld'
 * ```
 */
export function toCamelCase(text: string): string {
    return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
            index === 0 ? letter.toLowerCase() : letter.toUpperCase()
        )
        .replace(/\s+|-|_/g, '');
}

/**
 * Convert string to snake_case
 * @param text - The text to convert
 * @returns Snake cased text
 * @example
 * ```ts
 * toSnakeCase('helloWorld') // 'hello_world'
 * toSnakeCase('Hello World') // 'hello_world'
 * ```
 */
export function toSnakeCase(text: string): string {
    return text
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/^_/, '');
}

/**
 * Convert string to kebab-case
 * @param text - The text to convert
 * @returns Kebab cased text
 * @example
 * ```ts
 * toKebabCase('helloWorld') // 'hello-world'
 * toKebabCase('Hello World') // 'hello-world'
 * ```
 */
export function toKebabCase(text: string): string {
    return text
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^-/, '');
}

/**
 * Capitalize first letter of string
 * @param text - The text to capitalize
 * @returns Capitalized text
 * @example
 * ```ts
 * capitalize('hello') // 'Hello'
 * capitalize('HELLO') // 'HELLO'
 * ```
 */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Remove accents from text
 * @param text - The text to process
 * @returns Text without accents
 * @example
 * ```ts
 * removeAccents('café') // 'cafe'
 * removeAccents('naïve') // 'naive'
 * ```
 */
export function removeAccents(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Slugify text (URL-friendly)
 * @param text - The text to slugify
 * @returns Slugified text
 * @example
 * ```ts
 * slugify('Hello World!') // 'hello-world'
 * slugify('Café & Bar') // 'cafe-bar'
 * ```
 */
export function slugify(text: string): string {
    return removeAccents(text)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Pad string to a certain length
 * @param text - The text to pad
 * @param length - Target length
 * @param char - Character to pad with (default: ' ')
 * @param direction - Padding direction (default: 'right')
 * @returns Padded text
 * @example
 * ```ts
 * pad('5', 3, '0', 'left') // '005'
 * pad('test', 6, '.', 'right') // 'test..'
 * ```
 */
export function pad(
    text: string,
    length: number,
    char: string = ' ',
    direction: 'left' | 'right' | 'both' = 'right'
): string {
    if (text.length >= length) {
        return text;
    }

    const padLength = length - text.length;

    if (direction === 'left') {
        return char.repeat(padLength) + text;
    } else if (direction === 'right') {
        return text + char.repeat(padLength);
    } else {
        const leftPad = Math.floor(padLength / 2);
        const rightPad = padLength - leftPad;
        return char.repeat(leftPad) + text + char.repeat(rightPad);
    }
}

/**
 * Mask sensitive data (e.g., credit card, phone)
 * @param text - The text to mask
 * @param visibleStart - Number of visible characters at start (default: 4)
 * @param visibleEnd - Number of visible characters at end (default: 4)
 * @param maskChar - Character to use for masking (default: '*')
 * @returns Masked text
 * @example
 * ```ts
 * mask('1234567890123456') // '1234********3456'
 * mask('1234567890', 2, 2, 'X') // '12XXXXXX90'
 * ```
 */
export function mask(
    text: string,
    visibleStart: number = 4,
    visibleEnd: number = 4,
    maskChar: string = '*'
): string {
    if (text.length <= visibleStart + visibleEnd) {
        return text;
    }

    const start = text.slice(0, visibleStart);
    const end = text.slice(-visibleEnd);
    const masked = maskChar.repeat(text.length - visibleStart - visibleEnd);

    return start + masked + end;
}

/**
 * Format phone number
 * @param phone - The phone number to format
 * @param format - Format pattern (default: '(XXX) XXX-XXXX')
 * @returns Formatted phone number
 * @example
 * ```ts
 * formatPhone('1234567890') // '(123) 456-7890'
 * formatPhone('1234567890', 'XXX-XXX-XXXX') // '123-456-7890'
 * ```
 */
export function formatPhone(phone: string, format: string = '(XXX) XXX-XXXX'): string {
    const cleaned = phone.replace(/\D/g, '');
    let result = format;

    for (const digit of cleaned) {
        result = result.replace('X', digit);
    }

    return result;
}

/**
 * Format credit card number
 * @param cardNumber - The card number to format
 * @param separator - Separator character (default: ' ')
 * @returns Formatted card number
 * @example
 * ```ts
 * formatCreditCard('1234567890123456') // '1234 5678 9012 3456'
 * formatCreditCard('1234567890123456', '-') // '1234-5678-9012-3456'
 * ```
 */
export function formatCreditCard(cardNumber: string, separator: string = ' '): string {
    const cleaned = cardNumber.replace(/\s/g, '');
    return cleaned.replace(/(\d{4})/g, `$1${separator}`).trim();
}

/**
 * Escape HTML special characters
 * @param text - The text to escape
 * @returns Escaped text
 * @example
 * ```ts
 * escapeHtml('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * ```
 */
export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };

    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Unescape HTML special characters
 * @param text - The text to unescape
 * @returns Unescaped text
 * @example
 * ```ts
 * unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 * ```
 */
export function unescapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
    };

    return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (entity) => map[entity]);
}