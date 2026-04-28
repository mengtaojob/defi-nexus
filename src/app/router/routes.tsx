import type { ComponentType } from 'react'
import { DashboardPage } from '../../pages/DashboardPage'
import { TokenActionsPage } from '../../pages/TokenActionsPage'
import { WalletPage } from '../../pages/WalletPage'

export interface AppRoute {
  id: 'dashboard' | 'wallet' | 'token-actions'
  path: string
  component: ComponentType
}

export const routes: AppRoute[] = [
  { id: 'dashboard', path: '/', component: DashboardPage },
  { id: 'wallet', path: '/wallet', component: WalletPage },
  { id: 'token-actions', path: '/token-actions', component: TokenActionsPage },
]
