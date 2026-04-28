import { NavLink } from '../../app/router/router'

export function Sidebar() {
  return (
    <aside>
      <nav aria-label="Primary">
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/wallet">Wallet</NavLink>
          </li>
          <li>
            <NavLink to="/token-actions">Token Actions</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
