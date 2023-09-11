import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries, Plugin } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface';
import { Credential } from '../../domain/models/credential.model';
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity';
import { DiTokens } from '../../infrastructure/di/tokens';

@ApiTags('Db')
@Controller('/db')
export class DbAnalyticsController {
  @Inject(DiTokens.CredentialUseCaseToken) private readonly credentialUseCase: CredentialUseCaseInterface;

  @Post('connection')
  dbCreateConnection(@Body() payload: Credential): Promise<Credential> {
    return this.credentialUseCase.insertCredentialForPlugin(payload['pluginId'], payload);
  }

  @Get('nb-queries')
  dbGetNbQueries(pluginId: Plugin['id']): Promise<ApiDatabaseLastAverageQueriesByHour> {
    return this.credentialUseCase.getNbQueries(pluginId);
  }

  @Get('db-size')
  dbGetDbSize(pluginId: Plugin['id']): Promise<ApiDatabaseSize> {
    return this.credentialUseCase.getDbSize(pluginId);
  }

  @Get('db-slow-query')
  dbGetSlowQuery(pluginId: Plugin['id']): Promise<ApiDatabaseSlowQueries[]> {
    return this.credentialUseCase.getSlowQuery(pluginId);
  }
}
