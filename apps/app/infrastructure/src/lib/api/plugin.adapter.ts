import { AxiosInstance } from 'axios'
import { PluginAdapter, PluginModel } from '@metrikube/core'
import { MetricType, GenericCredentialType } from '@metrikube/common'

export class PluginAdapterImpl implements PluginAdapter {
    constructor(private readonly http: AxiosInstance) { }

    async setupPlugin(pluginId: string, metricType: MetricType, credential: GenericCredentialType): Promise<any> {
        console.log("plugin id", pluginId)
        console.log("metricType", metricType)
        console.log("credential", credential)

        try {
            
    
        } catch (error) {
            
        }
    }

    async getPlugins(): Promise<PluginModel[]> {
        const { data } = await this.http.get("/plugins")
        return data.plugins
    }
}
