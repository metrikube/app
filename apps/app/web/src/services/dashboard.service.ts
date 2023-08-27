import { useAdapter } from '../config/axios'
import { DeleteActiveMetricUsecase } from '@metrikube/core'
import { useMutation } from '@tanstack/react-query'

const { dashboardMetricsAdapter } = useAdapter()

export const deleteMetricMutation = () =>
  useMutation({
    mutationKey: ['deleteMetric'],
    mutationFn: async (activeMetricId: string) => {
      await new DeleteActiveMetricUsecase(dashboardMetricsAdapter).execute(activeMetricId)
    }
  })
