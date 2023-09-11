import { MetricType } from '@metrikube/common';

import { Plugin } from './plugin.model';

export class Metric {
  public plugin?: Plugin;

  // prettier-ignore
  constructor(
    public id: string,
    public name: string,
    public type: MetricType,
    public refreshInterval: number,
    public isNotifiable: boolean,
    public pluginId: Plugin['id'],
  ) {
  }
}
