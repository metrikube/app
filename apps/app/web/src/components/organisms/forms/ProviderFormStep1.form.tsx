import AwsLogo from '../../../assets/img/aws.png'
import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import ProviderCard from '../../molecules/ProviderCard'
import styled from '@emotion/styled'
import {
  FilterPluginsByCategoryUsecase,
  PluginModel,
  providerCategoriesMock
} from '@metrikube/core'
import { Chip } from '@mui/material'
import React, { useContext, useMemo } from 'react'

interface Props {
  providerCategory: string
  allPlugins: PluginModel[]
  handleProviderCategory: (categoryValue: string) => void
}

const ProviderFormStep1 = ({ providerCategory, allPlugins, handleProviderCategory }: Props) => {
  const { selectedProvider, setSelectedProvider } = useContext(SetupPluginContext)
  const filterPlugins = new FilterPluginsByCategoryUsecase()

  const filteredPlugins = useMemo<PluginModel[]>(
    () => filterPlugins.execute(allPlugins, providerCategory),
    [allPlugins, providerCategory]
  )

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
        {filteredPlugins.map((provider) => (
          <ProviderCard
            key={provider.id}
            logo={AwsLogo}
            label={provider.name}
            selected={provider.name === selectedProvider?.name}
            onClick={() => setSelectedProvider(provider)}
          />
        ))}
      </ProvidersContainer>
    </FormContainer>
  )
}

const FormContainer = styled.div`
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
