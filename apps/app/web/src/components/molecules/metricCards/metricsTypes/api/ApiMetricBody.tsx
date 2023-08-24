import { ApiHealthCheckResult } from '@metrikube/common'
import React from 'react'

const ApiMetricBody = ({ status, value, unit }: ApiHealthCheckResult) => {
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
