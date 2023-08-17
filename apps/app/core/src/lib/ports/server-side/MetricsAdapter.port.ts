export interface MetricsAdapter {
  getMetrics: () => Promise<unknown>;
}
