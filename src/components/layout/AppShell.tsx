import type { PropsWithChildren } from 'react'
import { TxStatusToast } from '../token/TxStatusToast'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell-wrap">
      <div className="app-shell">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="app-main">{children}</main>
        </div>
      </div>
      <TxStatusToast />
    </div>
  )
}
