import { Credential } from './credential.model';
import { Metric } from './metric.model';
import { Plugin } from './plugin.model';

export class Widget {
  public credential?: Credential;
  public metric?: Metric;
  public plugin?: Plugin;

  // prettier-ignore
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public pluginId: Plugin['id'],
    public credentialId: Credential['id'],
    public metricId: Metric['id'],
    public isActive: boolean,
    public resourceId?: string,
  ) {
  }
}
