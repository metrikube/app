import { Metric } from './metric.model';
import { Widget } from './widget.model';

export class Plugin {
  public metrics?: Metric[] = [];
  public widgets?: Widget[] = [];

  constructor(
    public id: string,
    public name: string,
    public type: string,
    public description: string,
    public instruction: string,
    public category: string,
    public credentialType: string,
    public iconUrl: string
  ) {}
}
