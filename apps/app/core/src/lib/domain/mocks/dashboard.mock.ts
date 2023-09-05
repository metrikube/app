import { ActiveMetricModel, githubProviderMock } from "@metrikube/core"
import { githubLastIssues, githubLastPrs } from "./metrics.mock"


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
    id: "bf32add2-ae8a-42b0-af8f-5a30a851a3ad",
    name: "AWS Second Bucket",
    description: undefined,
    resourceId: null,
    plugin: {
        id: "c5cced6d-095e-4b98-af8c-0d5378a43e24",
        name: "AWS",
        type: "aws",
        description: "Amazon Web Services Plugin"
    },
    metric: {
        id: "02426c10-11dc-42a4-a543-0055d9d2322d",
        name: "AWS Bucket single instance cost",
        type: "aws-bucket-single-instance",
        isNotifiable: false
    },
    data: {
        id: "second-bucket",
        name: "second-bucket",
        region: "eu-west-3",
        cost: 7,
        currency: "USD",
        additionnalData: {
            "creationDate": "2022-09-06T08:44:09.000Z"
        }
    }
}

export const singleBucketS3Mock: ActiveMetricModel = {
    id: "094bf35c-5d7c-4e0f-b88c-7372c318b32c",
    name: "S3 First Bucket",
    description: undefined,
    resourceId: null,
    plugin: {
        id: "c5aded82-094e-7n98-af8c-0d4788a43e24",
        name: "AWS",
        type: "aws",
        description: "Amazon Web Services Plugin"
    },
    metric: {
        id: "02426c10-11dc-42a4-a543-0055d9d2322d",
        name: "AWS Bucket single instance cost",
        type: "aws-bucket-single-instance",
        isNotifiable: false
    },
    data: {
        id: "first-bucket",
        name: "first-bucket",
        region: "eu-west-3",
        cost: "10",
        currency: "USD",
        additionnalData: {
            "creationDate": "2022-09-03T20:47:09.000Z"
        }
    }
}

export const listBucketS3Mock: ActiveMetricModel = {
    id: "20f96417-5333-4dc0-979d-2b4d73f4ec80",
    name: "AWS S3 List of buckets",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "c5cced6d-095e-4b98-af8c-0d5378a43e24",
        name: "AWS",
        type: "aws",
        description: "Amazon Web Services Plugin"
    },
    metric: {
        id: "5dda4d85-ec61-49f6-86a5-43e64d2576f7",
        name: "AWS Bucket multiple instances cost",
        type: "aws-bucket-multiple-instances",
        isNotifiable: false
    },
    data: [
        {
            id: "first-bucket",
            name: "first-bucket",
            cost: "10",
            currency: "USD",
            additionnalData: {
                creationDate: "2022-11-17T10:59:05.000Z"
            }
        },
        {
            id: "second-bucket",
            name: "second-bucket",
            cost: "7",
            currency: "USD",
            additionnalData: {
                creationDate: "2022-09-03T20:47:09.000Z"
            }
        },
        {
            id: "third-bucket",
            name: "third-bucket",
            cost: "20",
            currency: "EUR",
            additionnalData: {
                "creationDate": "2022-09-06T08:44:09.000Z"
            }
        }
    ]
}

export const activeMetricsMock: ActiveMetricModel[] = [
    singleBucketS3Mock,
    singleInstanceEC2Mock,
    listBucketS3Mock
]