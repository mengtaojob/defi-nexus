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

export function RouterProvider({ children }: PropsWithChildren) {
  const [pathname, setPathname] = useState<string>(getPathname)

  useEffect(() => {
    const onPopState = () => setPathname(getPathname())

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path: string) => {
    if (path === pathname) {
      return
    }

    window.history.pushState({}, '', path)
    setPathname(path)
  }, [pathname])

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
}

export function NavLink({ to, children, className }: NavLinkProps) {
  const { navigate } = useRouter()

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
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
