import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class CryptographyService {
  private SALT_LENGTH = 16;

  async hash(data: any) {
    return argon2.hash(data);
  }

  async verify(hash: string, data: any) {
    return argon2.verify(hash, data);
  }

  private generateSalt() {
    return crypto
      .randomBytes(this.SALT_LENGTH)
      .toString('base64')
      .slice(0, this.SALT_LENGTH);
  }
}
