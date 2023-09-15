import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { EncryptionServiceInterface } from '../../../domain/interfaces/common/encryption-service.interface';

type DynamicKeyValue = { [key: string]: string };

@Injectable()
export class EncryptionService implements EncryptionServiceInterface {
  algorithm = 'aes-256-ctr';

  constructor(private masterPassword: string) {}

  encryptJson<T extends Record<string, string | number | boolean>>(value: T): string {
    return this.encrypt(JSON.stringify(value));
  }

  decryptJson<T extends Record<string, string | number | boolean>>(hash: string): T {
    return JSON.parse(this.decrypt(hash));
  }

  encrypt(value: string): string {
    const iv = randomBytes(16);

    const cipher = createCipheriv(this.algorithm, this.getKey(), iv);

    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

    return this.encode64({
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex')
    });
  }

  decrypt(hash: string): string {
    const { iv: deIv, encryptedData } = this.decode64<{
      iv: string;
      encryptedData: string;
    }>(hash);

    const decipher = createDecipheriv(this.algorithm, this.getKey(), Buffer.from(deIv, 'hex'));

    const encryptedHex = Buffer.from(encryptedData, 'hex');
    const decrpyted = Buffer.concat([decipher.update(encryptedHex), decipher.final()]);

    return decrpyted.toString();
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