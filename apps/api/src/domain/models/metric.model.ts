import { MetricType } from '@metrikube/common'

export type Metric = {
  readonly id: string // UUID
  readonly name: string
  readonly active: boolean // if active, the metric is displayed on the dashboard
  readonly description: string
  readonly refreshInterval: number // in seconds
  readonly type: MetricType // WidgetType
  readonly createdAt: Date
}
