import { Body, Controller, HttpStatus, Inject, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GenericCredentialType } from '@metrikube/common';

import { CredentialUseCaseInterface } from '../../../domain/interfaces/use-cases/credential.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialController {
  constructor(@Inject(DiTokens.CredentialUseCaseToken) private readonly credentialUseCase: CredentialUseCaseInterface) {}

  @ApiParam({ name: 'pluginId', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Credential is valid' })
  @ApiBody({})
  @Post('validate/:pluginId')
  validateCredential(@Param('pluginId', new ParseUUIDPipe()) pluginId: string, @Body(new ValidationPipe()) body: GenericCredentialType): Promise<void> {
    return this.credentialUseCase.validateCredential(pluginId, body);
  }
}
