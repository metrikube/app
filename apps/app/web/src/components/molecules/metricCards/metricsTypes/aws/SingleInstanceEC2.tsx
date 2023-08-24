import { ApiAWSSingleResourceInstanceResult } from '@metrikube/common'
import React from 'react'

const SingleInstanceEC2 = ({ name, status, cost }: ApiAWSSingleResourceInstanceResult) => {
  return (
    <div>
      <p>{name}</p>
      <p>Status: {status ? 'actif' : 'inactif'} </p>
      <p>Coût: {cost} €</p>
    </div>
  )
}

export default SingleInstanceEC2
