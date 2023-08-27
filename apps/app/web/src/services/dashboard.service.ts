import { useAdapter } from '../config/axios'
import { AlertModel, DeleteActiveMetricUsecase, GetActiveMetricAlertUsecase } from '@metrikube/core'
import { useMutation, useQuery } from '@tanstack/react-query'

const { dashboardMetricsAdapter, alertAdapter } = useAdapter()

export const getActiveMetricAlertQuery = (activeMetricId: string) =>
  useQuery<AlertModel[]>({
    queryKey: ['getActiveMetricAlert'],
    queryFn: async (): Promise<AlertModel[]> =>
      new GetActiveMetricAlertUsecase(alertAdapter).execute(activeMetricId),
    initialData: () => []
  })

export const deleteMetricMutation = () =>
  useMutation({
    mutationKey: ['deleteMetric'],
    mutationFn: async (activeMetricId: string) => {
      await new DeleteActiveMetricUsecase(dashboardMetricsAdapter).execute(activeMetricId)
    }
  })
