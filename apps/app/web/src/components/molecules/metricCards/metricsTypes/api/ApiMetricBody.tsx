import React from 'react'

interface Props {
  status: number
  value: string | number
  unit: string
}

const ApiMetricBody = ({ status, value, unit }: Props) => {
  return (
    <div>
      <p>Status : {status}</p>
      <p>
        Time : {value} {unit}
      </p>
    </div>
  )
}

export default ApiMetricBody
