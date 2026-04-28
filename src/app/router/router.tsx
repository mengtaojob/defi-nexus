import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'

interface RouterContextValue {
  pathname: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function getPathname() {
  return window.location.pathname || '/'
}

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
}

export function RouterProvider({ children }: PropsWithChildren) {
  const [pathname, setPathname] = useState<string>(normalizePath(getPathname()))

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(getPathname()))

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback(
    (path: string) => {
      const nextPath = normalizePath(path)

      if (nextPath === pathname) {
        return
      }

      window.history.pushState({}, '', nextPath)
      setPathname(nextPath)
    },
    [pathname],
  )

  const value = useMemo(
    () => ({
      pathname,
      navigate,
    }),
    [navigate, pathname],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)

  if (!context) {
    throw new Error('useRouter must be used inside RouterProvider')
  }

  return context
}

interface NavLinkProps {
  to: string
  children: string
  className?: string
  activeClassName?: string
}

export function NavLink({ to, children, className, activeClassName }: NavLinkProps) {
  const { pathname, navigate } = useRouter()
  const normalizedTo = normalizePath(to)
  const isActive = pathname === normalizedTo

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigate(normalizedTo)
  }

  const classes = [className, isActive ? activeClassName : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={normalizedTo}
      onClick={handleClick}
      className={classes}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}
