import {
    isImage,
    isVideo,
    isDocument,
    getFileType,
    formatFileSize,
    getFileExtension,
    getFileNameWithoutExtension,
    validateFileSize,
    validateFileType,
} from './';

describe('File Utilities', () => {
    describe('isImage', () => {
        it('should return true for image MIME types', () => {
            expect(isImage('image/jpeg')).toBe(true);
            expect(isImage('image/png')).toBe(true);
            expect(isImage('image/gif')).toBe(true);
        });

        it('should return false for non-image MIME types', () => {
            expect(isImage('video/mp4')).toBe(false);
            expect(isImage('application/pdf')).toBe(false);
        });
    });

    describe('isVideo', () => {
        it('should return true for video MIME types', () => {
            expect(isVideo('video/mp4')).toBe(true);
            expect(isVideo('video/webm')).toBe(true);
        });

        it('should return false for non-video MIME types', () => {
            expect(isVideo('image/jpeg')).toBe(false);
            expect(isVideo('application/pdf')).toBe(false);
        });
    });

    describe('isDocument', () => {
        it('should return true for document MIME types', () => {
            expect(isDocument('application/pdf')).toBe(true);
            expect(isDocument('application/msword')).toBe(true);
        });

        it('should return false for non-document MIME types', () => {
            expect(isDocument('image/jpeg')).toBe(false);
            expect(isDocument('video/mp4')).toBe(false);
        });
    });

    describe('getFileType', () => {
        it('should return correct file type', () => {
            expect(getFileType('image/jpeg')).toBe('image');
            expect(getFileType('video/mp4')).toBe('video');
            expect(getFileType('application/pdf')).toBe('document');
            expect(getFileType('text/plain')).toBe('unknown');
        });
    });

    describe('formatFileSize', () => {
        it('should format bytes correctly', () => {
            expect(formatFileSize(0)).toBe('0 Bytes');
            expect(formatFileSize(1024)).toBe('1.00 KB');
            expect(formatFileSize(1048576)).toBe('1.00 MB');
            expect(formatFileSize(1073741824)).toBe('1.00 GB');
        });

        it('should respect decimal places', () => {
            expect(formatFileSize(1536, 0)).toBe('2 KB');
            expect(formatFileSize(1536, 1)).toBe('1.5 KB');
        });
    });

    describe('getFileExtension', () => {
        it('should extract file extension', () => {
            expect(getFileExtension('document.pdf')).toBe('pdf');
            expect(getFileExtension('image.JPG')).toBe('jpg');
            expect(getFileExtension('archive.tar.gz')).toBe('gz');
        });

        it('should return empty string for files without extension', () => {
            expect(getFileExtension('noextension')).toBe('');
        });
    });

    describe('getFileNameWithoutExtension', () => {
        it('should remove file extension', () => {
            expect(getFileNameWithoutExtension('document.pdf')).toBe('document');
            expect(getFileNameWithoutExtension('my.file.txt')).toBe('my.file');
        });

        it('should return original name if no extension', () => {
            expect(getFileNameWithoutExtension('noextension')).toBe('noextension');
        });
    });

    describe('validateFileSize', () => {
        it('should validate file size correctly', () => {
            const file1MB = new File([''], 'test.txt', { type: 'text/plain' });
            Object.defineProperty(file1MB, 'size', { value: 1024 * 1024 });

            const file10MB = new File([''], 'test.txt', { type: 'text/plain' });
            Object.defineProperty(file10MB, 'size', { value: 10 * 1024 * 1024 });

            expect(validateFileSize(file1MB, 5)).toBe(true);
            expect(validateFileSize(file10MB, 5)).toBe(false);
        });
    });

    describe('validateFileType', () => {
        it('should validate file type correctly', () => {
            const imageFile = new File([''], 'image.jpg', { type: 'image/jpeg' });
            const pdfFile = new File([''], 'doc.pdf', { type: 'application/pdf' });

            expect(validateFileType(imageFile, ['image/jpeg', 'image/png'])).toBe(true);
            expect(validateFileType(pdfFile, ['image/jpeg', 'image/png'])).toBe(false);
        });
    });
});