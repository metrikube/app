import { MetricModel, PluginModel } from "@metrikube/core"
import { awsBucketInstance, awsSingleInstance, githubLastIssues, githubLastPrs } from "./metrics.mock"

type ActiveMetric = {
    metric: MetricModel
    data: unknown
}

export const lastPullRequestMock: ActiveMetric = {
    metric: githubLastPrs,
    data: {}
}

export const lastIssuesMock: ActiveMetric = {
    metric: githubLastIssues,
    data: {}
}

export const singleInstanceEC2Mock: ActiveMetric = {
    metric: awsSingleInstance,
    data: {}
}

export const singleBucketS3Mock: ActiveMetric = {
    metric: awsBucketInstance,
    data: {}
}

export const activeMetricsMock: ActiveMetric[] = [
    lastPullRequestMock,
    lastIssuesMock,
    singleBucketS3Mock,
    singleInstanceEC2Mock
]