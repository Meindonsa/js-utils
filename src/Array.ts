/**
 * Array utilities module
 * Provides helper functions for array manipulation and search
 */

/**
 * Find element in array by property value
 * @param array - The array to search
 * @param property - Property name to search by
 * @param value - Value to find
 * @returns Found element or undefined
 * @example
 * ```ts
 * const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * findByProperty(users, 'id', 2) // { id: 2, name: 'Jane' }
 * ```
 */
export function findByProperty<T>(
    array: T[],
    property: keyof T,
    value: any
): T | undefined {
    return array.find((item) => item[property] === value);
}

/**
 * Find all elements in array by property value
 * @param array - The array to search
 * @param property - Property name to search by
 * @param value - Value to find
 * @returns Array of matching elements
 * @example
 * ```ts
 * const users = [{ role: 'admin' }, { role: 'user' }, { role: 'admin' }];
 * findAllByProperty(users, 'role', 'admin') // [{ role: 'admin' }, { role: 'admin' }]
 * ```
 */
export function findAllByProperty<T>(
    array: T[],
    property: keyof T,
    value: any
): T[] {
    return array.filter((item) => item[property] === value);
}

/**
 * Find index of element by property value
 * @param array - The array to search
 * @param property - Property name to search by
 * @param value - Value to find
 * @returns Index of element or -1
 * @example
 * ```ts
 * const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * findIndexByProperty(items, 'id', 2) // 1
 * ```
 */
export function findIndexByProperty<T>(
    array: T[],
    property: keyof T,
    value: any
): number {
    return array.findIndex((item) => item[property] === value);
}

/**
 * Search array with case-insensitive text match
 * @param array - The array to search
 * @param searchTerm - Text to search for
 * @param properties - Properties to search in
 * @returns Array of matching elements
 * @example
 * ```ts
 * const users = [{ name: 'John', email: 'john@example.com' }];
 * searchArray(users, 'JOHN', ['name', 'email'])
 * ```
 */
export function searchArray<T>(
    array: T[],
    searchTerm: string,
    properties: (keyof T)[]
): T[] {
    const term = searchTerm.toLowerCase();
    return array.filter((item) =>
        properties.some((prop) => {
            const value = item[prop];
            return typeof value === 'string' && value.toLowerCase().includes(term);
        })
    );
}

/**
 * Remove duplicates from array
 * @param array - The array to process
 * @returns New array without duplicates
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 * unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
 * ```
 */
export function unique<T>(array: T[]): T[] {
    // @ts-ignore
    return [...new Set(array)];
}

/**
 * Remove duplicates from array of objects by property
 * @param array - The array to process
 * @param property - Property to check for uniqueness
 * @returns New array without duplicates
 * @example
 * ```ts
 * const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
 * uniqueByProperty(items, 'id') // [{ id: 1 }, { id: 2 }]
 * ```
 */
export function uniqueByProperty<T>(array: T[], property: keyof T): T[] {
    const seen = new Set();
    return array.filter((item) => {
        const value = item[property];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

/**
 * Group array elements by property value
 * @param array - The array to group
 * @param property - Property to group by
 * @returns Object with grouped elements
 * @example
 * ```ts
 * const users = [{ role: 'admin' }, { role: 'user' }, { role: 'admin' }];
 * groupBy(users, 'role')
 * // { admin: [{ role: 'admin' }, { role: 'admin' }], user: [{ role: 'user' }] }
 * ```
 */
export function groupBy<T>(array: T[], property: keyof T): Record<string, T[]> {
    return array.reduce((groups, item) => {
        const key = String(item[property]);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

/**
 * Sort array of objects by property
 * @param array - The array to sort
 * @param property - Property to sort by
 * @param order - Sort order (default: 'asc')
 * @returns New sorted array
 * @example
 * ```ts
 * const items = [{ age: 30 }, { age: 20 }, { age: 25 }];
 * sortBy(items, 'age') // [{ age: 20 }, { age: 25 }, { age: 30 }]
 * sortBy(items, 'age', 'desc') // [{ age: 30 }, { age: 25 }, { age: 20 }]
 * ```
 */
export function sortBy<T>(
    array: T[],
    property: keyof T,
    order: 'asc' | 'desc' = 'asc'
): T[] {
    return [...array].sort((a, b) => {
        const aVal = a[property];
        const bVal = b[property];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

/**
 * Chunk array into smaller arrays
 * @param array - The array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Flatten nested array
 * @param array - The array to flatten
 * @param depth - Depth to flatten (default: 1)
 * @returns Flattened array
 * @example
 * ```ts
 * flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * flatten([[1, [2]], [3, [4]]], 2) // [1, 2, 3, 4]
 * ```
 */
export function flatten<T>(array: any[], depth: number = 1): T[] {
    if (depth === 0) return array;
    return array.reduce(
        (flat, item) =>
            flat.concat(Array.isArray(item) ? flatten(item, depth - 1) : item),
        []
    );
}

/**
 * Get intersection of two arrays
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array of common elements
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * ```
 */
export function intersection<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2);
    return unique(array1.filter((item) => set2.has(item)));
}

/**
 * Get difference between two arrays
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Elements in array1 not in array2
 * @example
 * ```ts
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 * ```
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2);
    return array1.filter((item) => !set2.has(item));
}

/**
 * Get union of two arrays
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Combined unique elements
 * @example
 * ```ts
 * union([1, 2], [2, 3]) // [1, 2, 3]
 * ```
 */
export function union<T>(array1: T[], array2: T[]): T[] {
    return unique([...array1, ...array2]);
}

/**
 * Get sum of array elements
 * @param array - Array of numbers
 * @returns Sum of all elements
 * @example
 * ```ts
 * sum([1, 2, 3, 4]) // 10
 * ```
 */
export function sum(array: number[]): number {
    return array.reduce((total, num) => total + num, 0);
}

/**
 * Get average of array elements
 * @param array - Array of numbers
 * @returns Average of all elements
 * @example
 * ```ts
 * average([1, 2, 3, 4]) // 2.5
 * ```
 */
export function average(array: number[]): number {
    return array.length === 0 ? 0 : sum(array) / array.length;
}

/**
 * Get minimum value from array
 * @param array - Array of numbers
 * @returns Minimum value
 * @example
 * ```ts
 * min([3, 1, 4, 1, 5]) // 1
 * ```
 */
export function min(array: number[]): number {
    return Math.min(...array);
}

/**
 * Get maximum value from array
 * @param array - Array of numbers
 * @returns Maximum value
 * @example
 * ```ts
 * max([3, 1, 4, 1, 5]) // 5
 * ```
 */
export function max(array: number[]): number {
    return Math.max(...array);
}

/**
 * Get range of values from array (min and max)
 * @param array - Array of numbers
 * @returns Object with min and max values
 * @example
 * ```ts
 * range([3, 1, 4, 1, 5]) // { min: 1, max: 5 }
 * ```
 */
export function range(array: number[]): { min: number; max: number } {
    return { min: min(array), max: max(array) };
}

/**
 * Paginate array
 * @param array - The array to paginate
 * @param page - Page number (1-based)
 * @param pageSize - Number of items per page
 * @returns Paginated result with data and metadata
 * @example
 * ```ts
 * paginate([1, 2, 3, 4, 5], 1, 2)
 * // { data: [1, 2], page: 1, pageSize: 2, totalPages: 3, totalItems: 5 }
 * ```
 */
export function paginate<T>(
    array: T[],
    page: number,
    pageSize: number
): {
    data: T[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
} {
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = array.slice(startIndex, endIndex);

    return {
        data,
        page,
        pageSize,
        totalPages,
        totalItems,
    };
}

/**
 * Shuffle array randomly
 * @param array - The array to shuffle
 * @returns New shuffled array
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4, 5]) // e.g., [3, 1, 5, 2, 4]
 * ```
 */
export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Sample random elements from array
 * @param array - The array to sample from
 * @param count - Number of elements to sample
 * @returns Array of random elements
 * @example
 * ```ts
 * sample([1, 2, 3, 4, 5], 3) // e.g., [2, 5, 1]
 * ```
 */
export function sample<T>(array: T[], count: number): T[] {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Count occurrences of each element
 * @param array - The array to analyze
 * @returns Object with element counts
 * @example
 * ```ts
 * countOccurrences(['a', 'b', 'a', 'c', 'b', 'a'])
 * // { a: 3, b: 2, c: 1 }
 * ```
 */
export function countOccurrences<T extends string | number>(
    array: T[]
): Record<T, number> {
    return array.reduce((counts, item) => {
        counts[item] = (counts[item] || 0) + 1;
        return counts;
    }, {} as Record<T, number>);
}

/**
 * Check if arrays are equal
 * @param array1 - First array
 * @param array2 - Second array
 * @returns True if arrays are equal
 * @example
 * ```ts
 * isEqual([1, 2, 3], [1, 2, 3]) // true
 * isEqual([1, 2, 3], [3, 2, 1]) // false
 * ```
 */
export function isEqual<T>(array1: T[], array2: T[]): boolean {
    if (array1.length !== array2.length) return false;
    return array1.every((item, index) => item === array2[index]);
}

export function rotate<T>(array: T[], positions: number): T[] {
    const len = array.length;
    const offset = ((positions % len) + len) % len;
    return [...array.slice(-offset), ...array.slice(0, -offset)];
}