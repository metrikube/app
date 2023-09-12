import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSize, ApiDatabaseSlowQueries } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { CredentialTypesDtos, ValidateCredentialResponseDto } from '../../../presenter/credential/dtos/validate-credential-response.dto';
import { Credential } from '../../models/credential.model';

export interface CredentialUseCaseInterface {
  insertCredentialForPlugin(pluginId: string, credential: Credential): Promise<Credential>;

  validateCredential(metricId: string, credential: CredentialTypesDtos): Promise<void>;
}
