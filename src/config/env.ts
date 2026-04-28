interface AppEnv {
  walletConnectProjectId: string
}

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? ''

export const env: AppEnv = {
  walletConnectProjectId,
}
