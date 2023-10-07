import { BadRequestException, NotFoundException } from '@nestjs/common';

export class InvalidInstanceException extends BadRequestException {
  constructor(error?: any) {
    super({
      ok: false,
      message: error.message || `AWS Instance error`,
      error
    });
  }
}
