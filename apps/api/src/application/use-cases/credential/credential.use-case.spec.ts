import { Test, TestingModule } from '@nestjs/testing';

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
    it.todo('should insert a new credential for a plugin');
    // it('should insert a new credential for a plugin', async () => {
    //   const pluginId = 'plugin-id';
    //   const payload: Credential = new Credential(null, 'label', 'value', 'type');
    //
    //   const createdCredential: CredentialEntity = {
    //     id: '1',
    //     pluginId,
    //     ...payload
    //   } as CredentialEntity;
    //
    //   const result = await credentialUseCase.insertCredentialForPlugin(pluginId, payload);
    //
    //   expect(result).toEqual(createdCredential);
    // });
  });
});
