import { SvgIconComponent } from '@mui/icons-material'

export type MetrikubeMenuItem = {
  key: string
  label: string
  color?: string
  icon?: SvgIconComponent
  action: () => void
}
