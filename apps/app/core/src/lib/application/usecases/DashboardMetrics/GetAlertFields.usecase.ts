import { DashboardMetricsAdapter, Option } from "@metrikube/core";

export class GetAlertFieldsUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) { }

  async execute(metricId: string): Promise<Option[]> {
    const fields: string[] = await this.dashboardMetrics.getAlertFields(metricId)
    return fields.map(field => ({ label: field, value: field }))
  }
}