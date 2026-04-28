import { useMemo } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { SUPPORTED_CHAINS } from '../../config/constants'
import { formatAddress } from '../../lib/formatting/address'
import { ChainSwitcher } from '../wallet/ChainSwitcher'

function getChainLabel(chainId?: number): string {
  if (!chainId) {
    return 'Not Connected'
  }

  const supportedChain = SUPPORTED_CHAINS.find((chain) => chain.id === chainId)

  return supportedChain ? supportedChain.name : `Unsupported (${chainId})`
}

export function Header() {
  const { address, chainId, status } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const isConnected = status === 'connected'
  const chainLabel = getChainLabel(chainId)

  const availableConnectors = useMemo(
    () => connectors.filter((connector) => connector.type !== 'safe'),
    [connectors],
  )

  return (
    <header className="app-header">
      <div className="app-header-top">
        <div>
          <p className="app-eyebrow">Multi-Chain DeFi Dashboard</p>
          <h1 className="app-title">DeFi Nexus</h1>
        </div>

        <div className="wallet-panel" aria-live="polite">
          <div className="wallet-meta">
            <span className="wallet-chain">{chainLabel}</span>
            <span className="wallet-address">
              {address ? formatAddress(address) : 'No wallet connected'}
            </span>
          </div>

          <ChainSwitcher />

          {isConnected ? (
            <button className="wallet-action wallet-disconnect" type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
          ) : (
            <div className="wallet-connectors">
              {availableConnectors.map((connector) => (
                <button
                  key={connector.uid}
                  className="wallet-action wallet-connect"
                  type="button"
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                >
                  Connect {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="app-subtitle">Wallet, balances, and ERC20 actions across Ethereum, Arbitrum, and Base.</p>
    </header>
  )
}
