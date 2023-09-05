import { ActiveMetricModel, githubProviderMock } from "@metrikube/core"
import { githubLastIssues, githubLastPrs } from "./metrics.mock"


export const lastPullRequestMock: ActiveMetricModel = {
    id: "094bf35c-5d7c-4e0f-b88c-7372c318b32c",
    name: "Les 5 dernières Pull Requests",
    description: undefined,
    resourceId: undefined,
    plugin: githubProviderMock,
    metric: githubLastPrs,
    data: [
        {
            title: "Feat/aws",
            number: 95,
            url: "https://api.github.com/repos/metrikube/app/pulls/95",
            author: "ImRyuk",
            status: "closed"
        },
        {
            title: "style: Rework some components",
            number: 94,
            url: "https://api.github.com/repos/metrikube/app/pulls/94",
            author: "Diarit-S",
            status: "open"
        },
        {
            title: "refacto : clean hexagonal architecture",
            number: 93,
            url: "https://api.github.com/repos/metrikube/app/pulls/93",
            author: "JESSYV96",
            status: "closed"
        },
        {
            title: "feat(github-plugin): update to use new endpoints",
            number: 92,
            url: "https://api.github.com/repos/metrikube/app/pulls/92",
            author: "louis-genestier",
            status: "closed"
        },
        {
            title: "Refacto/optimization",
            number: 91,
            url: "https://api.github.com/repos/metrikube/app/pulls/91",
            author: "JESSYV96",
            status: "closed"
        }
    ]
}

export const lastIssuesMock: ActiveMetricModel = {
    id: "094bf35c-5d7c-4e0f-b88c-7372c318b",
    name: "Les 5 dernières issues",
    description: undefined,
    resourceId: undefined,
    plugin: githubProviderMock,
    metric: githubLastIssues,
    data: [
        {
            title: "Beautify dashboard",
            number: 89,
            url: "https://github.com/metrikube/app/issues/89",
            author: "Diarit-S",
            status: "open"
        },
        {
            title: "US : Afficher le dashboard avec les métriques choisie",
            number: 62,
            url: "https://github.com/metrikube/app/issues/62",
            author: "awuzi",
            status: "closed"
        },
        {
            title: "US : Realtime dashbaord",
            number: 61,
            url: "https://github.com/metrikube/app/issues/61",
            author: "awuzi",
            status: "closed"
        },
        {
            title: "Create a generic card component for metrics",
            number: 56,
            url: "https://github.com/metrikube/app/issues/56",
            author: "Diarit-S",
            status: "closed"
        },
        {
            title: "Make a function retrieve all plugin category",
            number: 55,
            url: "https://github.com/metrikube/app/issues/55",
            author: "JESSYV96",
            status: "open"
        }
    ]
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
    id: "094bf35c-5d7c-4e0f-b88c-73318b32c",
    name: "S3 First Bucket",
    description: undefined,
    resourceId: undefined,
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

export const nbRequestsPerHour: ActiveMetricModel = {
    id: "rregergrgg",
    name: "MariaDB - Requete par heure",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "maria-db",
        name: "Maria DB",
        type: "sql_database",
        description: "Maria DB plugin"
    },
    metric: {
        id: "5dda4d85-ec61-49f6-86a5-43e64",
        name: "Requête par heures (12 dernières heures)",
        type: "database-queries",
        isNotifiable: false
    },
    data: {}
}

export const activeMetricsMock: ActiveMetricModel[] = [
    singleBucketS3Mock,
    singleInstanceEC2Mock,
    listBucketS3Mock,
    lastPullRequestMock,
    lastIssuesMock,
    nbRequestsPerHour
]