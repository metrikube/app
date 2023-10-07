import { BadRequestException } from '@nestjs/common';

export class InvalidInstanceException extends BadRequestException {
  constructor(error?: any) {
    super({
      ok: false,
      message: `Instance error`,
      error
    });
  }
}
