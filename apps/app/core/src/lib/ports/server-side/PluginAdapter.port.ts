import { GenericCredentialType, MetricType } from "@metrikube/common";
import { PluginModel } from "../../domain";

export interface PluginAdapter {
    getPlugins: () => Promise<PluginModel[]>
    setupPlugin: (pluginId: string, metricType: MetricType, credential: GenericCredentialType) => Promise<unknown> // POST: /plugins
}
