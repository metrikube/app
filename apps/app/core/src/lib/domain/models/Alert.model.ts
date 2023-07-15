import { MetricThresholdOperator } from "@metrikube/common";

export type AlertModel = {
    id: string
    label: string
    metricId: string
    condition: {
        field: string;
        operator: MetricThresholdOperator;
        threshold: string | number;
    }
}
export type AlertRequest = Omit<AlertModel, 'id'>
export type AlertForm = Omit<AlertModel, 'id' | 'metricId'>