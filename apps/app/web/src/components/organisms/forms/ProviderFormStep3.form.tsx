import OutlinedCard from '../../molecules/OutlinedCard'
import { TextField, Select } from '@mui/material'
import React from 'react'

const ProviderFormStep3 = () => {
  return (
    <>
      <OutlinedCard title="Notifications">
        {/* Récuperer id de la metric installé via la requete POST /plugins */}
        <TextField id="alert-label" label="titre d'alerte" variant="outlined" size="small" />
        {/* Récuperer liste des champs via la requete POST /plugins */}
        <Select id="field" label="titre d'alerte" variant="outlined" size="small" />
        {/* Réprendre le model pour définir les options */}
        <Select id="operator" label="Opérateur" variant="outlined" size="small" />
        <TextField id="threshold" label="Seuil" variant="outlined" size="small" />
      </OutlinedCard>
      {/* Possibilité de créer une collection d'alerte */}
    </>
  )
}

export default ProviderFormStep3
