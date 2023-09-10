export interface PluginResolverInterface {
  resolvePlugin(pluginId: string): Promise<unknown>;
  getConnecotr(type: string): unknown;
}
