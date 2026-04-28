import type { SupportedChainId } from '../types/chain'

interface RawEnv {
  VITE_WALLETCONNECT_PROJECT_ID?: string
  VITE_DEFAULT_CHAIN_ID?: string
  VITE_RPC_ETHEREUM?: string
  VITE_RPC_ARBITRUM?: string
  VITE_RPC_BASE?: string
  PROD: boolean
}

export interface AppEnv {
  walletConnectProjectId: string
  defaultChainId: SupportedChainId
  rpcUrls: Record<SupportedChainId, string | undefined>
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [1, 42161, 8453]

function parseDefaultChainId(rawValue: string | undefined): SupportedChainId {
  if (!rawValue) {
    return 1
  }

  const parsed = Number(rawValue)

  if (SUPPORTED_CHAIN_IDS.includes(parsed as SupportedChainId)) {
    return parsed as SupportedChainId
  }

  throw new Error(
    `Invalid VITE_DEFAULT_CHAIN_ID: ${rawValue}. Supported values are 1, 42161, 8453.`,
  )
}

function requireWalletConnectProjectId(raw: RawEnv): string {
  if (raw.VITE_WALLETCONNECT_PROJECT_ID && raw.VITE_WALLETCONNECT_PROJECT_ID.length > 0) {
    return raw.VITE_WALLETCONNECT_PROJECT_ID
  }

  if (raw.PROD) {
    throw new Error('Missing required env var: VITE_WALLETCONNECT_PROJECT_ID')
  }

  return ''
}

const rawEnv = import.meta.env as unknown as RawEnv

export const env: AppEnv = {
  walletConnectProjectId: requireWalletConnectProjectId(rawEnv),
  defaultChainId: parseDefaultChainId(rawEnv.VITE_DEFAULT_CHAIN_ID),
  rpcUrls: {
    1: rawEnv.VITE_RPC_ETHEREUM,
    42161: rawEnv.VITE_RPC_ARBITRUM,
    8453: rawEnv.VITE_RPC_BASE,
  },
}
