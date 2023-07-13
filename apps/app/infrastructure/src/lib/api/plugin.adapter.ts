import { AxiosInstance } from 'axios'
import { PluginAdapter, PluginModel, SetupPluginRequest } from '@metrikube/core'

export class PluginAdapterImpl implements PluginAdapter {
    constructor(private readonly http: AxiosInstance) { }

    async setupPlugin({pluginId, metricType, credential}: SetupPluginRequest): Promise<any> {
        const response = await this.http.post("/plugins", {pluginId, metricType, credential, ressourceId: "test"})
        console.log(response)
    }

    async getPlugins(): Promise<PluginModel[]> {
        const { data } = await this.http.get("/plugins")
        return data.plugins
    }
}
