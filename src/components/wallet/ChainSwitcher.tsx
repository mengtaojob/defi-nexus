import { useMemo } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { SUPPORTED_CHAINS } from '../../config/constants'

export function ChainSwitcher() {
  const { chainId, status } = useAccount()
  const { switchChain, isPending } = useSwitchChain()

  const isConnected = status === 'connected'

  const chainOptions = useMemo(
    () => SUPPORTED_CHAINS.map((chain) => ({ value: String(chain.id), label: chain.name })),
    [],
  )

  return (
    <label className="chain-switcher" htmlFor="chain-switcher-select">
      <span className="chain-switcher-label">Network</span>
      <select
        id="chain-switcher-select"
        className="chain-switcher-select"
        value={chainId ? String(chainId) : ''}
        disabled={!isConnected || isPending}
        onChange={(event) => switchChain({ chainId: Number(event.target.value) })}
      >
        {!chainId ? <option value="">Select chain</option> : null}
        {chainOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
