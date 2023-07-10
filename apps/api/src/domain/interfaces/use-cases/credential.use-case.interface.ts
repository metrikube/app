import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { Credential } from '../../models/credential.model';


export interface CredentialUseCaseInterface {
  dbCreateConnection(credential: Credential): Promise<CredentialEntity>;
}
