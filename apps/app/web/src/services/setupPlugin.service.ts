import { useAdapter } from '../config/axios'
import { GetPluginsUsecase } from '@metrikube/core'
import { useQuery } from '@tanstack/react-query'

const { pluginAdapter } = useAdapter()
export const getPluginsQuery = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ['getPlugins'],
    queryFn: () => new GetPluginsUsecase(pluginAdapter).execute(),
    enabled: isEnabled,
    initialData: () => []
  })
}
