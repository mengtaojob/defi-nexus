import { useMemo } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { SUPPORTED_CHAINS } from '../../config/constants'

function getChainLabel(chainId?: number): string {
  if (!chainId) {
    return 'Not Connected'
  }

  const chain = SUPPORTED_CHAINS.find((item) => item.id === chainId)

  return chain ? chain.name : `Unsupported (${chainId})`
}

export function useWallet() {
  const account = useAccount()
  const connectState = useConnect()
  const disconnectState = useDisconnect()

  const isConnected = account.status === 'connected'

  const availableConnectors = useMemo(
    () => connectState.connectors.filter((connector) => connector.type !== 'safe'),
    [connectState.connectors],
  )

  return {
    address: account.address,
    chainId: account.chainId,
    chainLabel: getChainLabel(account.chainId),
    status: account.status,
    isConnected,
    connectors: availableConnectors,
    isConnectPending: connectState.isPending,
    connect: connectState.connect,
    disconnect: disconnectState.disconnect,
  }
}
