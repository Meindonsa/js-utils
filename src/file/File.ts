/**
 * File utilities module
 * Provides helper functions for working with files, images, videos, and PDFs
 */

/**
 * Supported image MIME types
 */
export const IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
] as const;

/**
 * Supported video MIME types
 */
export const VIDEO_MIME_TYPES = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
] as const;

/**
 * Supported document MIME types
 */
export const DOCUMENT_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
] as const;

/**
 * File type categories
 */
export type FileType = 'image' | 'video' | 'document' | 'unknown';

/**
 * Check if a file is an image based on its MIME type
 * @param mimeType - The MIME type to check
 * @returns True if the MIME type is an image type
 * @example
 * ```ts
 * isImage('image/jpeg') // true
 * isImage('video/mp4') // false
 * ```
 */
export function isImage(mimeType: string): boolean {
    return IMAGE_MIME_TYPES.includes(mimeType as any);
}

/**
 * Check if a file is a video based on its MIME type
 * @param mimeType - The MIME type to check
 * @returns True if the MIME type is a video type
 * @example
 * ```ts
 * isVideo('video/mp4') // true
 * isVideo('image/jpeg') // false
 * ```
 */
export function isVideo(mimeType: string): boolean {
    return VIDEO_MIME_TYPES.includes(mimeType as any);
}

/**
 * Check if a file is a document based on its MIME type
 * @param mimeType - The MIME type to check
 * @returns True if the MIME type is a document type
 * @example
 * ```ts
 * isDocument('application/pdf') // true
 * isDocument('image/jpeg') // false
 * ```
 */
export function isDocument(mimeType: string): boolean {
    return DOCUMENT_MIME_TYPES.includes(mimeType as any);
}

/**
 * Get the file type category from a MIME type
 * @param mimeType - The MIME type to categorize
 * @returns The file type category
 * @example
 * ```ts
 * getFileType('image/jpeg') // 'image'
 * getFileType('video/mp4') // 'video'
 * getFileType('application/pdf') // 'document'
 * getFileType('text/plain') // 'unknown'
 * ```
 */
export function getFileType(mimeType: string): FileType {
    if (isImage(mimeType)) return 'image';
    if (isVideo(mimeType)) return 'video';
    if (isDocument(mimeType)) return 'document';
    return 'unknown';
}

/**
 * Convert bytes to human-readable format
 * @param bytes - The number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with appropriate unit
 * @example
 * ```ts
 * formatFileSize(1024) // '1.00 KB'
 * formatFileSize(1048576) // '1.00 MB'
 * formatFileSize(1234, 0) // '1 KB'
 * ```
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get file extension from filename
 * @param filename - The filename
 * @returns The file extension (without dot) or empty string
 * @example
 * ```ts
 * getFileExtension('document.pdf') // 'pdf'
 * getFileExtension('image.jpg') // 'jpg'
 * getFileExtension('noextension') // ''
 * ```
 */
export function getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

/**
 * Get filename without extension
 * @param filename - The filename
 * @returns The filename without extension
 * @example
 * ```ts
 * getFileNameWithoutExtension('document.pdf') // 'document'
 * getFileNameWithoutExtension('my.file.txt') // 'my.file'
 * ```
 */
export function getFileNameWithoutExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex === -1 ? filename : filename.substring(0, lastDotIndex);
}

/**
 * Convert a File or Blob to base64 string
 * @param file - The file or blob to convert
 * @returns Promise that resolves to base64 string
 * @example
 * ```ts
 * const base64 = await fileToBase64(myFile);
 * ```
 */
export function fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (): void => {
            const result = reader.result as string;
            // Remove data URL prefix
            const base64: string = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = (error): void => reject(error);
    });
}

/**
 * Convert base64 string to Blob
 * @param base64 - The base64 string
 * @param mimeType - The MIME type of the file
 * @returns Blob object
 * @example
 * ```ts
 * const blob = base64ToBlob(base64String, 'image/jpeg');
 * ```
 */
export function base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters: string = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i: number = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

/**
 * Download a file from a URL or Blob
 * @param data - URL string or Blob object
 * @param filename - The filename for the download
 * @example
 * ```ts
 * downloadFile(blob, 'myfile.pdf');
 * downloadFile('https://example.com/file.pdf', 'download.pdf');
 * ```
 */
export function downloadFile(data: string | Blob, filename: string): void {
    const url: string = typeof data === 'string' ? data : URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof data !== 'string') {
        URL.revokeObjectURL(url);
    }
}

/**
 * Validate file size
 * @param file - The file to validate
 * @param maxSizeInMB - Maximum allowed size in megabytes
 * @returns True if file size is valid
 * @example
 * ```ts
 * validateFileSize(myFile, 5) // true if file is <= 5MB
 * ```
 */
export function validateFileSize(file: File, maxSizeInMB: number): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
}

/**
 * Validate file type
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns True if file type is allowed
 * @example
 * ```ts
 * validateFileType(myFile, ['image/jpeg', 'image/png'])
 * ```
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
}