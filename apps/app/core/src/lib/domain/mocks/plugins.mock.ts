import { MetricModel } from "../models/Metric.model"
import { PluginModel } from "../models/Plugin.model"

export const providerCategoriesMock = [
    {
        label: "Cloud",
        value: "cloud"
    },
    {
        label: "Database",
        value: "database"
    },
    {
        label: "Versioning",
        value: "versioning"
    }
]
// METRICS
export const awsSingleInstance: MetricModel = {
    id: "aws-1",
    type: "aws_ec2_single_instance_usage",
    name: "Cost of EC2 single instance",
    description: "Description cout et service",
    refreshInterval: 30
}
export const awsBucketInstance: MetricModel = {
    id: "aws-metric-2",
    type: "aws_bucket_single_instance",
    name: "Cost of Amazon S3 Bucket",
    description: "Description S3",
    refreshInterval: 30,
}
export const githubLastPr: MetricModel = {
    id: "github-metric-1",
    type: "github_last_pr",
    name: "Last pull requests",
    description: "Description last PR",
    refreshInterval: 30,
}


export const AWSMetricsMock: MetricModel[] = [
    { ...awsSingleInstance },
    { ...awsBucketInstance}
]

export const GithubMetricsMock: MetricModel[] = [
   {...githubLastPr}
]

// PLUGINS
export const AWSProviderMock: PluginModel = {
    id: "15bb7006-9018-495c-bff6-ce36476e1030",
    name: "Amazon web services",
    type: "aws",
    category: "cloud",
    description: "Cloud provider",
    credential: {
        type: "apiKey",
        value: {
            apiKey: ""
        }
    },
    metrics: AWSMetricsMock,
    instruction: "",
}

export const githubProviderMock: PluginModel = {
    id: "f5e90849-9c70-433d-9d66-dac20be2c4e7",
    name: "Github",
    type: "github",
    category: "versioning",
    description: "Versioning",
    instruction: "",
    credential: {
        type: "userPassword",
        value: {
            username: "",
            password: ""
        }
    },
    metrics: GithubMetricsMock,
}

export const providersMock = [
    { ...AWSProviderMock },
    { ...githubProviderMock }
]
