import { AxiosInstance } from 'axios'
import { PluginAdapter } from '@metrikube/core'

export class PluginAdapterImpl implements PluginAdapter {
    constructor(private readonly http: AxiosInstance) { }

    async getPlugins() {
        const { data } = await this.http.get("/plugin")
        console.log(data)
        return []
    }
}