import { Plugin } from './plugin.model';

export class Credential {
  public plugin?: Plugin;

  // prettier-ignore
  constructor(
    public id: string,
    public type: string,
    public value: string,
    public pluginId: Plugin['id']
  ) {
  }
}
