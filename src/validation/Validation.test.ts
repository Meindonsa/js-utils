import {
    isValidEmail,
    isValidUrl,
    isValidPhone,
    isValidCreditCard,
    validatePassword,
    isNumeric,
    isAlpha,
    isAlphanumeric,
    isEmpty,
    isInRange,
    matchesPattern,
    isValidDate,
    isValidJson,
    isValidHexColor,
    isValidIpv4,
    isValidUsername,
} from '../index';

describe('Validation Utilities', () => {
    describe('isValidEmail', () => {
        it('should validate correct emails', () => {
            expect(isValidEmail('user@example.com')).toBe(true);
            expect(isValidEmail('test.user@domain.co.uk')).toBe(true);
        });

        it('should reject invalid emails', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('user@')).toBe(false);
        });
    });

    describe('isValidUrl', () => {
        it('should validate correct URLs', () => {
            expect(isValidUrl('https://example.com')).toBe(true);
            expect(isValidUrl('http://subdomain.example.com/path')).toBe(true);
        });

        it('should reject invalid URLs', () => {
            expect(isValidUrl('not-a-url')).toBe(false);
            expect(isValidUrl('htp://example.com')).toBe(false);
        });
    });

    describe('isValidPhone', () => {
        it('should validate correct phone numbers', () => {
            expect(isValidPhone('+1234567890')).toBe(true);
            expect(isValidPhone('123-456-7890')).toBe(true);
            expect(isValidPhone('(123) 456-7890')).toBe(true);
        });

        it('should reject invalid phone numbers', () => {
            expect(isValidPhone('123')).toBe(false);
            expect(isValidPhone('abc')).toBe(false);
        });
    });

    describe('isValidCreditCard', () => {
        it('should validate correct card numbers', () => {
            expect(isValidCreditCard('4532015112830366')).toBe(true); // Valid Visa
            expect(isValidCreditCard('6011000990139424')).toBe(true); // Valid Discover
        });

        it('should reject invalid card numbers', () => {
            expect(isValidCreditCard('1234567890123456')).toBe(false);
            expect(isValidCreditCard('invalid')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should validate strong passwords', () => {
            const result = validatePassword('MyP@ssw0rd', {
                minLength: 8,
                requireUppercase: true,
                requireLowercase: true,
                requireNumbers: true,
                requireSpecialChars: true,
            });
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should detect missing uppercase', () => {
            const result = validatePassword('myp@ssw0rd');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one uppercase letter');
        });

        it('should detect short passwords', () => {
            const result = validatePassword('Short1!');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must be at least 8 characters long');
        });

        it('should detect missing numbers', () => {
            const result = validatePassword('MyPassword!');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one number');
        });
    });

    describe('isNumeric', () => {
        it('should validate numeric strings', () => {
            expect(isNumeric('123')).toBe(true);
            expect(isNumeric('12.34')).toBe(true);
            expect(isNumeric('-5')).toBe(true);
        });

        it('should reject non-numeric strings', () => {
            expect(isNumeric('abc')).toBe(false);
            expect(isNumeric('12a')).toBe(false);
        });
    });

    describe('isAlpha', () => {
        it('should validate alphabetic strings', () => {
            expect(isAlpha('abc')).toBe(true);
            expect(isAlpha('ABC')).toBe(true);
        });

        it('should reject non-alphabetic strings', () => {
            expect(isAlpha('abc123')).toBe(false);
            expect(isAlpha('abc-def')).toBe(false);
        });
    });

    describe('isAlphanumeric', () => {
        it('should validate alphanumeric strings', () => {
            expect(isAlphanumeric('abc123')).toBe(true);
            expect(isAlphanumeric('ABC123')).toBe(true);
        });

        it('should reject non-alphanumeric strings', () => {
            expect(isAlphanumeric('abc-123')).toBe(false);
            expect(isAlphanumeric('abc 123')).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should detect empty values', () => {
            expect(isEmpty('')).toBe(true);
            expect(isEmpty([])).toBe(true);
            expect(isEmpty({})).toBe(true);
            expect(isEmpty(null)).toBe(true);
            expect(isEmpty(undefined)).toBe(true);
        });

        it('should detect non-empty values', () => {
            expect(isEmpty('text')).toBe(false);
            expect(isEmpty([1, 2, 3])).toBe(false);
            expect(isEmpty({ key: 'value' })).toBe(false);
        });
    });

    describe('isInRange', () => {
        it('should validate values in range', () => {
            expect(isInRange(5, 1, 10)).toBe(true);
            expect(isInRange(1, 1, 10)).toBe(true);
            expect(isInRange(10, 1, 10)).toBe(true);
        });

        it('should reject values outside range', () => {
            expect(isInRange(0, 1, 10)).toBe(false);
            expect(isInRange(11, 1, 10)).toBe(false);
        });
    });

    describe('matchesPattern', () => {
        it('should match valid patterns', () => {
            expect(matchesPattern('ABC123', /^[A-Z]{3}\d{3}$/)).toBe(true);
        });

        it('should reject invalid patterns', () => {
            expect(matchesPattern('ABC12', /^[A-Z]{3}\d{3}$/)).toBe(false);
        });
    });

    describe('isValidDate', () => {
        it('should validate correct dates', () => {
            expect(isValidDate('2024-01-15')).toBe(true);
            expect(isValidDate(new Date())).toBe(true);
        });

        it('should reject invalid dates', () => {
            expect(isValidDate('invalid')).toBe(false);
            expect(isValidDate('2024-13-01')).toBe(false);
        });
    });

    describe('isValidJson', () => {
        it('should validate correct JSON', () => {
            expect(isValidJson('{"key": "value"}')).toBe(true);
            expect(isValidJson('[1, 2, 3]')).toBe(true);
        });

        it('should reject invalid JSON', () => {
            expect(isValidJson('invalid json')).toBe(false);
            expect(isValidJson('{key: value}')).toBe(false);
        });
    });

    describe('isValidHexColor', () => {
        it('should validate correct hex colors', () => {
            expect(isValidHexColor('#FF5733')).toBe(true);
            expect(isValidHexColor('#FFF')).toBe(true);
        });

        it('should reject invalid hex colors', () => {
            expect(isValidHexColor('FF5733')).toBe(false);
            expect(isValidHexColor('#GG5733')).toBe(false);
        });
    });

    describe('isValidIpv4', () => {
        it('should validate correct IP addresses', () => {
            expect(isValidIpv4('192.168.1.1')).toBe(true);
            expect(isValidIpv4('0.0.0.0')).toBe(true);
            expect(isValidIpv4('255.255.255.255')).toBe(true);
        });

        it('should reject invalid IP addresses', () => {
            expect(isValidIpv4('256.1.1.1')).toBe(false);
            expect(isValidIpv4('192.168.1')).toBe(false);
            expect(isValidIpv4('192.168.1.1.1')).toBe(false);
        });
    });

    describe('isValidUsername', () => {
        it('should validate correct usernames', () => {
            expect(isValidUsername('user_name')).toBe(true);
            expect(isValidUsername('user-name-123')).toBe(true);
        });

        it('should reject invalid usernames', () => {
            expect(isValidUsername('ab')).toBe(false); // Too short
            expect(isValidUsername('user@name')).toBe(false); // Invalid char
            expect(isValidUsername('a'.repeat(21))).toBe(false); // Too long
        });
    });
});