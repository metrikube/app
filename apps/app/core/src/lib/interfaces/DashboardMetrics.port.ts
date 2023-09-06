import type { ActiveMetricModel } from "@metrikube/core";

export interface DashboardMetricsAdapter {
  getActiveMetrics: () => Promise<ActiveMetricModel[]>
  deleteActiveMetric: (activeMetricId: string) => Promise<void>
}
