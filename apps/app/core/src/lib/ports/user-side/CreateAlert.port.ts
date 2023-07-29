import { CreateAlertRequest } from '../server-side';

export interface CreateAlert {
  execute: (payload: CreateAlertRequest) => Promise<unknown>;
}
