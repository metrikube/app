import AwsLogo from '../../../assets/img/aws.png'
import { ProviderFormContext } from '../../../contexts/provider-form.context'
import ProviderCard from '../../molecules/ProviderCard'
import styled from '@emotion/styled'
import { FilterPluginsByCategoryUsecase, providerCategoriesMock, providersMock } from '@metrikube/core'
import { Chip } from '@mui/material'
import { PluginModel } from 'apps/app/core/src/lib/domain/models/Plugin.model'
import React, { useContext } from 'react'

interface Props {
  providerCategory: string
  handleProviderCategory: (categoryValue: string) => void
  handleProvider: (provider: PluginModel) => void
}

const ProviderFormStep1 = ({ providerCategory, handleProviderCategory, handleProvider }: Props) => {
  const { selectedProvider } = useContext(ProviderFormContext)
  const filterPlugins = new FilterPluginsByCategoryUsecase()

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
        {filterPlugins.execute(providersMock, providerCategory).map((provider) => (
          <ProviderCard
            key={provider.id}
            logo={AwsLogo}
            label={provider.name}
            selected={provider.name === selectedProvider?.name}
            onClick={() => handleProvider(provider)}
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
