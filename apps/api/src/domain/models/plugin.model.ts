import { Credential } from './credential.model';

export type Plugin = {
  readonly id: string;
  readonly name: string;
  readonly credential: Credential;
};
