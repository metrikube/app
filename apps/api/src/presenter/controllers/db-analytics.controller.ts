import { Body, Controller, Get, Inject, Query, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface';
import { Plugin } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../domain/models/credential.model';

import { DiTokens } from '../../infrastructure/di/tokens';

@ApiTags('Db')
@Controller('/db')
export class DbAnalyticsController {
  @Inject(DiTokens.CredentialUseCaseToken) private readonly credentialUseCase: CredentialUseCaseInterface

  @Post('connection')
  dbCreateConnection(@Body() payload: Credential): Promise<CredentialEntity> {
    return this.credentialUseCase.insertCredentialForPlugin(payload['pluginId'], payload);
  }

  @Get('nb-queries')
  dbGetNbQueries(pluginId: Plugin['id']): any {
    return this.credentialUseCase.getNbQueries(pluginId);
  }

  @Get('db-size')
  dbGetDbSize(pluginId: Plugin['id']): any {
    return this.credentialUseCase.getDbSize(pluginId);
  }

  @Get('db-slow-query')
  dbGetSlowQuery(pluginId: Plugin['id']): any {
    return this.credentialUseCase.getSlowQuery(pluginId);
  }
}
