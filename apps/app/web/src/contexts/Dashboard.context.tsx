/* eslint-disable react/react-in-jsx-scope */
import type { WidgetModel } from '@metrikube/core'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface DashboardContextType {
  widgets: WidgetModel[]
  setWidgets: Dispatch<SetStateAction<WidgetModel[]>>
}

export const DashboardContext = createContext<DashboardContextType>({
  widgets: [],
  setWidgets: () => ({})
})

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
  const [widgets, setWidgets] = useState<WidgetModel[]>([])

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        setWidgets
      }}>
      {children}
    </DashboardContext.Provider>
  )
}
