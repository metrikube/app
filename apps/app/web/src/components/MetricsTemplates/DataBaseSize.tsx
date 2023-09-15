import { LabelAndIconsWidget } from '../molecules/WidgetsGenericTemplates/LabelAndIconsWidget'
import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import styled from '@emotion/styled'
import { WidgetModel } from '@metrikube/core'
import DatasetIcon from '@mui/icons-material/Dataset'
import StraightenIcon from '@mui/icons-material/Straighten'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { ListItemText } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const DataBaseSize = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <>
        <LabelAndIconsWidget
          label={widget.data.databaseName}
          dataItems={[
            {
              icon: StraightenIcon,
              value: widget.data.size + ' Mb',
              tooltipContent: 'Taille de la base de données'
            },
            {
              icon: DatasetIcon,
              value: widget.data.numberOfTables,
              tooltipContent: 'Nombre de tables'
            },
            {
              icon: TableRowsIcon,
              value: widget.data.numberOfTotalRows,
              tooltipContent: 'Nombre de lignes'
            }
          ]}
        />
      </>
    </SimpleWidget>
  )
}

const StyledItemText = styled(ListItemText)`
  display: flex;

  .MuiListItemText-primary {
    margin-right: 6px;
  }
`
