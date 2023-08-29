import { ActiveMetricModel } from "../../domain";

export interface DashboardMetricsAdapter {
  getActiveMetrics: () => Promise<ActiveMetricModel[]>
  deleteActiveMetric: (activeMetricId: string) => Promise<void>
}
