/**
 * @your-scope/utils - A comprehensive TypeScript utility library
 *
 * A collection of useful utilities for Angular, Vue, and React projects.
 * Organized into modules for easy tree-shaking and selective imports.
 *
 * @packageDocumentation
 */

// Export all modules
export * from './array';
export * from './date';
export * from './file';
export * from './format';
export * from './validation';
export * from './random';

// Re-export with namespaces for convenience
import * as ArrayUtils from './array/Array';
import * as DateUtils from './date/Date';
import * as FormatUtils from './format/Format';
import * as FileUtils from './file';
import * as ValidationUtils from './validation/Validation';
import * as RandomUtils from './random/Random';

export { FileUtils, DateUtils, ValidationUtils, FormatUtils, RandomUtils, ArrayUtils };
