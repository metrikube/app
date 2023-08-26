import { ActiveMetricModel } from '@metrikube/core'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface DashboardContextType {
  selectedActiveMetric: ActiveMetricModel | null
  setSelectedActiveMetric: Dispatch<SetStateAction<ActiveMetricModel>>
}


export const DashboardContext = createContext<DashboardContextType>({
  selectedActiveMetric: null,
  setSelectedActiveMetric: () => ({})
})

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedActiveMetric, setSelectedActiveMetric] = useState<ActiveMetricModel | null>(null)

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DashboardContext.Provider
      value={{
        selectedActiveMetric,
        setSelectedActiveMetric
      }}>
      {children}
    </DashboardContext.Provider>
  )
}
