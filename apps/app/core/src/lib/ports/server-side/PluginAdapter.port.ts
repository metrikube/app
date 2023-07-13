import { GenericCredentialType, MetricType } from "@metrikube/common";
import { PluginModel } from "../../domain";

export type SetupPluginRequest = {
    pluginId: string
    metricType: MetricType
    credential: GenericCredentialType
    ressourceId?: string
}

export interface PluginAdapter {
    getPlugins: () => Promise<PluginModel[]>
    setupPlugin: (payload: SetupPluginRequest) => Promise<unknown> // POST: /plugins
}
