import { MetricThresholdOperator } from "@metrikube/common";

export type AlertModel = {
    readonly id: string
    readonly label: string
    readonly metricId?: string;
    readonly condition: {
        field: string;
        operator: MetricThresholdOperator;
        threshold: string | number;
    }
}
export type AlertRequest = Omit<AlertModel, 'id'>
export type AlertForm = Omit<AlertModel, 'id' | 'metricId'>