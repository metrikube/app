import React, { useContext } from 'react'
import { ProviderFormContext } from '../../../contexts/provider-form.context';
import styled from '@emotion/styled';
import { PROVIDERS } from '@metrikube/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ProviderFormStep3 = () => {
    const { selectedProvider, selectedMetric } = useContext(ProviderFormContext);
    const SettingForm = styled.form`
        display: flex;
        justify-content: space-evenly;
    `
    return <>
        {/* Step 3 form depend on selected provider and metric */}
        {selectedProvider.type === PROVIDERS.GITHUB.code &&
            <SettingForm>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Repository</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select your repository"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </SettingForm>
        }
        {selectedProvider.type === PROVIDERS.AWS.code &&
            <SettingForm>
                <FormControl fullWidth>
                    <InputLabel id="aws-instance">Instance</InputLabel>
                    <Select
                        labelId="aws-instance"
                        id="demo-simple-select"
                        label="Select your instance"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </SettingForm>
        }
    </>
}

export default ProviderFormStep3