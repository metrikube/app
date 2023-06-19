import { AxiosInstance } from 'axios'
import { PluginAdapter } from '@metrikube/core'

export class PluginAdapterImpl implements PluginAdapter {
    constructor(private readonly http: AxiosInstance) { }

    async getPlugins(): Promise<{ id: string, name: string }[]> {
        const { data } = await this.http.get("")
        return data
    }
}