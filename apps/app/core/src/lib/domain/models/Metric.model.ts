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
    plugin: Omit<PluginModel, "instructions" | "credential" | "category">
    metric: MetricModel
    data: ApiHealthCheckResult | ApiAWSSingleResourceInstanceResult | ApiGithubPullRequests
}
