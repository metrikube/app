export interface PluginToMetricRepository {
  getActiveMetrics(): Promise<unknown>;
}
