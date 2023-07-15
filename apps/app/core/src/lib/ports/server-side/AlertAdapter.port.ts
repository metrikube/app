import { AlertRequest } from "@metrikube/core";

export type CreateAlertRequest = {
    pluginToMetricId: string
    alerts: AlertRequest[]
}

export interface AlertAdapter {
    createAlert: (payload: CreateAlertRequest) => Promise<void>
}