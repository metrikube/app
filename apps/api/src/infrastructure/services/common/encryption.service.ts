import type { CipherGCMTypes } from 'crypto';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import type { EncryptionServiceInterface } from '../../../domain/interfaces/common/encryption-service.interface';

type DynamicKeyValue = { [key: string]: string };

@Injectable()
export class EncryptionService implements EncryptionServiceInterface {
  algorithm: CipherGCMTypes = 'aes-256-gcm';

  constructor(private masterPassword: string) {}

  encryptJson<T extends Record<string, string | number | boolean>>(value: T): string {
    try {
      return this.encrypt(JSON.stringify(value));
    } catch (e) {
      throw new Error(`Unable to encrypt json : ${e.message}`);
    }
  }

  decryptJson<T extends Record<string, string | number | boolean>>(hash: string): T {
    try {
      return JSON.parse(this.decrypt(hash));
    } catch (e) {
      throw new Error(`Unable to decrypt json : ${e.message}`);
    }
  }

  encrypt(value: string): string {
    const iv = randomBytes(16);

    const cipher = createCipheriv(this.algorithm, this.getKey(), iv);

    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
    const tag = cipher.getAuthTag();

    return this.encode64({
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
      tag: tag.toString('hex')
    });
  }

  decrypt(hash: string): string {
    const {
      iv: deIv,
      encryptedData,
      tag
    } = this.decode64<{
      iv: string;
      encryptedData: string;
      tag: string;
    }>(hash);

    const decipher = createDecipheriv(this.algorithm, this.getKey(), Buffer.from(deIv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    const encryptedHex = Buffer.from(encryptedData, 'hex');
    const decrypted = Buffer.concat([decipher.update(encryptedHex), decipher.final()]);

    return decrypted.toString();
  }

  private getKey(): Buffer {
    const newHash = createHash('sha256');
    const hash = newHash.update(this.masterPassword).digest('hex');

    return Buffer.from(hash, 'hex');
  }

  /**
   * encode base64 data
   * @param args
   */
  private encode64(args: DynamicKeyValue): string {
    const str = JSON.stringify(args);
    return Buffer.from(str).toString('base64');
  }

  /**
   * decode base64 data
   * @param token
   */
  private decode64<T extends DynamicKeyValue>(token: string): T {
    const buf = Buffer.from(token, 'base64').toString('utf8');
    return JSON.parse(buf);
  }
}
