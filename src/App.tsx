import { RouteOutlet } from './app/router/RouteOutlet'
import { RouterProvider } from './app/router/router'
import { AppShell } from './components/layout/AppShell'

function App() {
  return (
    <RouterProvider>
      <AppShell>
        <RouteOutlet />
      </AppShell>
    </RouterProvider>
  )
}

export default App
