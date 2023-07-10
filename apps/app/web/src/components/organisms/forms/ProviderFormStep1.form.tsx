import AwsLogo from '../../../assets/img/aws.png'
import { ProviderFormContext } from '../../../contexts/provider-form.context'
import ProviderCard from '../../molecules/ProviderCard'
import styled from '@emotion/styled'
import { providerCategoriesMock, providersMock } from '@metrikube/core'
import { Chip } from '@mui/material'
import React, { useContext, useState } from 'react'

interface Props {
  providerCategory: string
  handleProviderCategory: (categoryValue: string) => void
  handleProvider: (provider: unknown) => void
}

const ProviderFormStep1 = ({ providerCategory, handleProviderCategory, handleProvider }: Props) => {
  const { selectedProvider } = useContext(ProviderFormContext)
  const [providers, setProviders] = useState<unknown[]>(providersMock)

  const filterProviderByCategory = (providerCategory: string): unknown[] => {
    if (!providerCategory) {
      return providers
    }
    return providers.filter((provider) => provider.category === providerCategory)
  }
  return (
    <FormContainer>
      <ChipContainer>
        {/* FIX It's just mock now */}
        {providerCategoriesMock.map((category) => (
          <Chip
            key={category.value}
            label={category.label}
            size="small"
            color="primary"
            variant={category.value === providerCategory ? 'filled' : 'outlined'}
            onClick={() => handleProviderCategory(category.value)}
          />
        ))}
      </ChipContainer>
      <ProvidersContainer>
        {filterProviderByCategory(providerCategory).map((provider) => (
          <ProviderCard
            key={provider.id}
            logo={AwsLogo}
            label={provider.name}
            isProviderChose={provider.name === selectedProvider?.name}
            action={() => handleProvider(provider)}
          />
        ))}
      </ProvidersContainer>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ChipContainer = styled.section`
  display: flex;
  gap: 4px;
`

const ProvidersContainer = styled.section`
  display: flex;
  gap: 16px;
`

export default ProviderFormStep1
