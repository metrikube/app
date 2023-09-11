import { ApiHealthCheckResult, ApiAWSSingleResourceInstanceResult, ApiGithubIssues } from "@metrikube/common"
import { MetricModel, PluginModel } from "@metrikube/core"

export type WidgetModel = {
    id: string
    name: string
    description?: string
    resourceId?: string
    plugin: Pick<PluginModel, "id" | "name" | "type" | "description">
    metric: Pick<MetricModel, "id" | "name" | "type" | "isNotifiable">
    data: ApiHealthCheckResult | ApiAWSSingleResourceInstanceResult
}