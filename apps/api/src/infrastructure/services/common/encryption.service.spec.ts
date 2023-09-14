import { describe, expect, it } from '@jest/globals';

import { EncryptionService } from './encryption.service';

describe('[Encryption Service]', () => {
  it('should encrypt and decrypt a value correctly', () => {
    const service = new EncryptionService('masterPassword');
    const originalValue = 'Hello, World!';

    const encryptedValue = service.encrypt(originalValue);
    const decryptedValue = service.decrypt(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });

  it('should return different encrypted values for the same input', () => {
    const service = new EncryptionService('masterPassword');

    const originalValue = 'Hello, World!';
    const encryptedValue1 = service.encrypt(originalValue);
    const encryptedValue2 = service.encrypt(originalValue);

    expect(encryptedValue1).not.toStrictEqual(encryptedValue2);
  });

  it('should handle empty input', () => {
    const service = new EncryptionService('masterPassword');

    const originalValue = '';
    const encryptedValue = service.encrypt(originalValue);
    const decryptedValue = service.decrypt(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });

  it('should throw an error when trying to decrypt an invalid hash', () => {
    const service = new EncryptionService('masterPassword');
    const invalidHash = 'invalid_hash';

    expect(() => service.decrypt(invalidHash)).toThrow();
  });

  it('should handle long input values', () => {
    const service = new EncryptionService('masterPassword');
    const originalValue = 'A'.repeat(1000);
    const encryptedValue = service.encrypt(originalValue);
    const decryptedValue = service.decrypt(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });

  it('should handle special characters in input', () => {
    const service = new EncryptionService('masterPassword');
    const originalValue = 'Special characters: !@#$%^&*()_+{}[]|;:,.<>?';
    const encryptedValue = service.encrypt(originalValue);
    const decryptedValue = service.decrypt(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });

  it('should handle non-ASCII characters in input', () => {
    const service = new EncryptionService('masterPassword');
    const originalValue = 'Non-ASCII characters: 你好世界';
    const encryptedValue = service.encrypt(originalValue);
    const decryptedValue = service.decrypt(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });

  it('should handle JSON input', () => {
    const service = new EncryptionService('masterPassword');
    const originalValue = { foo: 'bar', baz: 123, qux: true };
    const encryptedValue = service.encryptJson(originalValue);
    const decryptedValue = service.decryptJson(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });

  it('should not handle JSON empty input', () => {
    const service = new EncryptionService('masterPassword');
    const originalValue = {};
    const encryptedValue = service.encryptJson(originalValue);
    const decryptedValue = service.decryptJson(encryptedValue);

    expect(decryptedValue).toStrictEqual(originalValue);
  });
});
