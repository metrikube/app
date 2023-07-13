import { NestModule } from '@nestjs/common';

import { Credential } from '../../domain/models/credential.model';

// prettier-ignore
export class PluginResolver<T> {
  constructor(
    private readonly PluginClass: { new(...args: any[]): any },
    private readonly credentials: Credential
  ) {
    new PluginClass(credentials);
  }
}
