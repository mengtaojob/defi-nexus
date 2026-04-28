import { NavLink } from '../../app/router/router'

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav aria-label="Primary" className="nav-menu">
        <NavLink to="/" className="nav-link" activeClassName="nav-link-active">
          Dashboard
        </NavLink>
        <NavLink to="/wallet" className="nav-link" activeClassName="nav-link-active">
          Wallet
        </NavLink>
        <NavLink to="/token-actions" className="nav-link" activeClassName="nav-link-active">
          Token Actions
        </NavLink>
      </nav>
    </aside>
  )
}
