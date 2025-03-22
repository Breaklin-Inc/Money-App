import { randomBytes } from 'crypto';
export class CryptoUtils {
  static encrypt(dataString: string, secret: string) {}
  static generateSecret(bytesSize = 16) {
    return randomBytes(bytesSize).toString('hex');
  }
}
