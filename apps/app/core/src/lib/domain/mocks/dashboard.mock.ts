import { AWSProviderMock, ActiveMetricModel, githubProviderMock } from "@metrikube/core"
import { awsBucketInstance, awsSingleInstance, githubLastIssues, githubLastPrs } from "./metrics.mock"


export const lastPullRequestMock: ActiveMetricModel = {
    plugin: githubProviderMock,
    metric: githubLastPrs,
    data: {
        status: 200,

    }
}

export const lastIssuesMock: ActiveMetricModel = {
    plugin: githubProviderMock,
    metric: githubLastIssues,
    data: [{
        id: "test",

    }]
}

export const singleInstanceEC2Mock: ActiveMetricModel = {
    plugin: AWSProviderMock,
    metric: awsSingleInstance,
    data: {
        id: "ec2-20",
        name: "Instance EC2",
        status: false,
        cost: 1320.43
    }
}

export const singleBucketS3Mock: ActiveMetricModel = {
    plugin: AWSProviderMock,
    metric: awsBucketInstance,
    data: {
        id: "audi-S3",
        name: "Bucket S3",
        status: true,
        cost: 14.0453
    }
}

export const activeMetricsMock: ActiveMetricModel[] = [
    lastPullRequestMock,
    lastIssuesMock,
    singleBucketS3Mock,
    singleInstanceEC2Mock
]