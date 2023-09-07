import { MetricTypeEnum } from '@metrikube/common'

export const WidgetsSize: Record<string, 'small' | 'large'> = {
    [MetricTypeEnum.ApiEndpointHealthCheck]: 'small',
    [MetricTypeEnum.GithubLastIssues]: 'large',
    [MetricTypeEnum.GithubLastPrs]: 'large',
    [MetricTypeEnum.DatabaseQueries]: 'large',
    [MetricTypeEnum.DatabaseSlowQueries]: 'large',
    [MetricTypeEnum.DatabaseSize]: 'small',
    [MetricTypeEnum.AwsBucketSingleInstance]: 'small',
    [MetricTypeEnum.AwsBucketMultipleInstances]: 'large',
    [MetricTypeEnum.AwsEc2SingleInstanceUsage]: 'small',
    [MetricTypeEnum.AwsEc2MultipleInstancesUsage]: 'large',
} as const;
