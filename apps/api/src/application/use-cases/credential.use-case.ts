import { Inject, Injectable } from '@nestjs/common'

import { CredentialRepository } from '../../domain/interfaces/repository/credential.repository'
import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface'
import { Credential } from '../../domain/models/credential.model'
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity'

@Injectable()
export class CredentialUseCase implements CredentialUseCaseInterface {
  constructor(@Inject('CREDENTIAL_REPOSITORY') private readonly credentialRepository: CredentialRepository) {}

  async dbCreateConnection(credential: Credential): Promise<CredentialEntity> {
    return await this.credentialRepository.createCredential(credential)
  }
}
