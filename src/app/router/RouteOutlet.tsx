import { NotFoundPage } from '../../pages/NotFoundPage'
import { routes } from './routes'
import { useRouter } from './router'

export function RouteOutlet() {
  const { pathname } = useRouter()

  const match = routes.find((route) => route.path === pathname)

  if (!match) {
    return <NotFoundPage />
  }

  const Component = match.component

  return <Component />
}
