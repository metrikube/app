import { MetricTypeEnum } from '@metrikube/common'

export enum WidgetWidths {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum WidgetHeights {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export type WidgetSize = {
    width: WidgetWidths;
    height: WidgetHeights;
}

export const WidgetsSize: Record<string, WidgetSize> = {
    [MetricTypeEnum.ApiEndpointHealthCheck]: {
        width: WidgetWidths.Small,
        height: WidgetHeights.Small,
    },
    [MetricTypeEnum.GithubLastIssues]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Medium,
    },
    [MetricTypeEnum.GithubLastPrs]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Medium,
    },
    [MetricTypeEnum.DatabaseQueries]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Medium,
    },
    [MetricTypeEnum.DatabaseSlowQueries]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Medium,
    },
    [MetricTypeEnum.DatabaseSize]: {
        width: WidgetWidths.Small,
        height: WidgetHeights.Small,
    },
    [MetricTypeEnum.AwsBucketSingleInstance]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Small,
    },
    [MetricTypeEnum.AwsBucketMultipleInstances]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Medium,
    },
    [MetricTypeEnum.AwsEc2SingleInstanceUsage]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Small,
    },
    [MetricTypeEnum.AwsEc2MultipleInstancesUsage]: {
        width: WidgetWidths.Medium,
        height: WidgetHeights.Medium,
    },
}

