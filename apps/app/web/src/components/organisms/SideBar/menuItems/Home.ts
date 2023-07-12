import type { MenuItem } from './models'
import { DashboardRounded } from '@mui/icons-material'

export const homeMenuItem: MenuItem = {
  id: 'home',
  title: 'Dashboard',
  url: '/home',
  icon: DashboardRounded
}

export default homeMenuItem
