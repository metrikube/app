export interface EncryptionServiceInterface {
  encryptJson<T extends Record<string, string | number | boolean>>(value: T): string;

  decryptJson<T extends Record<string, string | number | boolean>>(hash: string): T;
}
