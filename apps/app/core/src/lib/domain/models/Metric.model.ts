import {
    ApiAWSSingleResourceInstanceResult,
    ApiGithubPullRequests,
    ApiHealthCheckResult,
    Metric
} from "@metrikube/common"
import { PluginModel } from "./Plugin.model"

export type MetricModel = Omit<Metric, "createdAt">
export type ActiveMetricModel = {
    id: string
    name: string
    description?: string
    resourceId?: string
    plugin: Pick<PluginModel, "id" | "name" | "type" | "description">
    metric: Pick<MetricModel, "id" | "name" | "type" | "isNotifiable">
    data: ApiHealthCheckResult | ApiAWSSingleResourceInstanceResult | ApiGithubPullRequests
}
