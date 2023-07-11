import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';

export interface CredentialRepository {
  getCredentials(): Promise<CredentialEntity[]>;

  createCredential(credential: Credential): Promise<CredentialEntity>;
  findCredentialByIdWithPlugin(id: string): Promise<CredentialEntity>;
  getCredentialsByType(type: string): Promise<CredentialEntity>;


}
