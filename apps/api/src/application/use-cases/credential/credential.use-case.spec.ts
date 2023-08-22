import { Test, TestingModule } from '@nestjs/testing';

import { Credential } from '../../../domain/models/credential.model';
import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { CredentialInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/credential-in-memory.repository';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CredentialUseCase } from './credential.use-case';

describe('CredentialUseCase', () => {
  let credentialUseCase: CredentialUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CredentialUseCase,
        {
          provide: DiTokens.CredentialRepositoryToken,
          useClass: CredentialInMemoryRepositoryImpl
        },
        {
          provide: DiTokens.DbAnalyticsPluginServiceToken,
          useValue: {}
        }
      ]
    }).compile();

    credentialUseCase = module.get<CredentialUseCase>(CredentialUseCase);
  });

  describe('insertCredentialForPlugin', () => {
    it('should insert a new credential for a plugin', async () => {
      const pluginId = 'plugin-id';
      const payload: Credential = {
        pluginId: 'plugin-id',
        type: 'apiEndpoint',
        value: 'value'
      };

      const createdCredential: CredentialEntity = {
        id: '1',
        pluginId,
        ...payload
      } as CredentialEntity;

      const result = await credentialUseCase.insertCredentialForPlugin(pluginId, payload);

      expect(result).toEqual(createdCredential);
    });
  });
});
