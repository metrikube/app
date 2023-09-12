import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialException extends BadRequestException {
  constructor(error?: any) {
    super({
      ok: false,
      message: `The provider credential are invalid`,
      error
    });
  }
}
