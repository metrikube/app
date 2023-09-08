import { SvgIconComponent } from '@mui/icons-material'

export type MetrikubeMenuItem = {
  key: string
  label: string
  variant?: 'primary' | 'danger' | 'info'
  icon?: SvgIconComponent
  show: boolean
  action: () => void
}
