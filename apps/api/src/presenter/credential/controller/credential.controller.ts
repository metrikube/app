import { Body, Controller, HttpStatus, Inject, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CredentialUseCaseInterface } from '../../../domain/interfaces/use-cases/credential.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CredentialTypesDtos, ValidateCredentialResponseDto, credentialDtos, credentialsDtosExamples } from '../dtos/validate-credential-response.dto';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialController {
  constructor(@Inject(DiTokens.CredentialUseCaseToken) private readonly credentialUseCase: CredentialUseCaseInterface) {}

  @ApiParam({ name: 'metricId', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Credential is valid' })
  @ApiBody({ type: typeof credentialDtos, examples: credentialsDtosExamples })
  @Post('validate/:metricId')
  validateCredential(@Param('metricId', new ParseUUIDPipe()) metricId: string, @Body(new ValidationPipe()) body: CredentialTypesDtos): Promise<ValidateCredentialResponseDto> {
    return this.credentialUseCase.validateCredential(metricId, body);
  }
}
