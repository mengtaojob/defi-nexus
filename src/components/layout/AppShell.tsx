import type { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
