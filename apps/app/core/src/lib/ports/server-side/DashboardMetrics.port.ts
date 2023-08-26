import { ActiveMetricModel } from "../../domain";

export interface DashboardMetricsAdapter {
  getActiveMetrics: () => Promise<ActiveMetricModel[]>
}
