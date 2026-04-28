# DeFi Nexus Frontend Architecture

## 1) Scope
DeFi Nexus is a production-ready DeFi dashboard frontend built with React 19 + Vite + TypeScript.

Initial supported capabilities:
- Wallet connection (MetaMask, WalletConnect)
- Multi-chain support (Ethereum, Arbitrum, Base)
- Native + ERC20 balance display
- ERC20 approve + transfer flows
- Portfolio dashboard (balances, token positions, APY placeholders)

Deferred capability:
- Swap UI and execution module (planned extension point)

## 2) Architectural Principles
- Strict separation between UI, domain hooks, chain access, and state.
- Wagmi-first blockchain integration; use viem only where wagmi does not provide needed abstraction.
- Server/cache state in React Query; local UI state in Zustand only.
- Strong typing for addresses, chain IDs, token metadata, and transaction lifecycle.
- Deterministic data flow with explicit loading/error/empty states.
- Network-aware UX (unsupported chain, switch prompts, stale balances).

## 3) Target Folder Structure

```text
src/
  abi/
    erc20.ts
  app/
    providers/
      AppProviders.tsx
      QueryProvider.tsx
      WagmiProvider.tsx
    router/
      routes.tsx
  components/
    common/
      Button.tsx
      Card.tsx
      EmptyState.tsx
      LoadingSpinner.tsx
      ErrorBanner.tsx
    layout/
      AppShell.tsx
      Header.tsx
      Sidebar.tsx
      NetworkBadge.tsx
    wallet/
      ConnectWalletButton.tsx
      WalletMenu.tsx
      ChainSwitcher.tsx
    token/
      TokenBalanceList.tsx
      TokenRow.tsx
      ApproveForm.tsx
      TransferForm.tsx
      TxStatusToast.tsx
    dashboard/
      PortfolioSummary.tsx
      PositionTable.tsx
      ApyCard.tsx
  config/
    env.ts
    constants.ts
    tokens.ts
  hooks/
    wallet/
      useWallet.ts
      useChainGuard.ts
    balances/
      useNativeBalance.ts
      useTokenBalance.ts
      usePortfolioBalances.ts
    erc20/
      useErc20Approve.ts
      useErc20Transfer.ts
      useAllowance.ts
    dashboard/
      usePortfolio.ts
  lib/
    wagmi/
      config.ts
      connectors.ts
      chains.ts
    viem/
      clients.ts
    query/
      queryClient.ts
      keys.ts
    formatting/
      currency.ts
      token.ts
      address.ts
    errors/
      appError.ts
      mapChainError.ts
  pages/
    DashboardPage.tsx
    WalletPage.tsx
    TokenActionsPage.tsx
    NotFoundPage.tsx
  store/
    ui.store.ts
    tx.store.ts
  types/
    chain.ts
    token.ts
    portfolio.ts
    transaction.ts
  App.tsx
  main.tsx
```

## 4) Layer Responsibilities

### UI Layer (`components`, `pages`)
- Render-only and interaction wiring.
- No direct RPC calls and no chain config logic.
- Reads data through hooks and local store selectors.

### Domain Hook Layer (`hooks`)
- Encapsulates business operations and wagmi/viem interactions.
- Handles data normalization, loading flags, and user-friendly error mapping.
- Owns React Query cache interaction for reads.

### Chain/Infra Layer (`lib`, `abi`, `config`)
- `lib/wagmi`: chains, transports, connectors, and app config.
- `lib/viem`: public/wallet clients for low-level reads/writes when needed.
- `abi`: contract interfaces (starting with ERC20).
- `config`: environment and supported tokens/chains.

### State Layer (`store`)
- Zustand for ephemeral UI + client state only:
  - Selected token, modal visibility, toasts, tx panel state.
- Transaction store tracks pending/success/failed txs for UX continuity.

## 5) Runtime Providers and App Composition

Provider order in `main.tsx`:
1. `QueryProvider` (React Query client)
2. `WagmiProvider` (wagmi config + reconnect)
3. `AppProviders` (optional global UI state wrappers)
4. App router/pages

`App.tsx` should host:
- `AppShell`
- route outlet
- global toast/tx status surface

## 6) Chain and Wallet Architecture

Supported chains:
- Ethereum Mainnet (`1`)
- Arbitrum One (`42161`)
- Base (`8453`)

Wallet connectors:
- Injected (MetaMask / EIP-6963)
- WalletConnect (requires `VITE_WALLETCONNECT_PROJECT_ID`)

Behavior:
- Auto-reconnect previously connected wallet.
- Detect unsupported networks and block transaction actions until switched.
- `ChainSwitcher` offers only supported chains.

## 7) Data and Caching Model

React Query key strategy:
- `['nativeBalance', chainId, address]`
- `['tokenBalance', chainId, address, token]`
- `['allowance', chainId, owner, spender, token]`
- `['portfolio', chainId, address]`

Cache policy guidelines:
- Balances: short stale time (10-20s) and refetch on window focus.
- Allowance: invalidate after approve transaction confirms.
- Portfolio aggregation: recompute from constituent balance queries.

Reads:
- wagmi hooks (`useBalance`, `useReadContract`) first.
- batched/advanced reads via viem `multicall` where necessary.

Writes:
- `useWriteContract` + `useWaitForTransactionReceipt`.
- Centralized transaction status surface (`tx.store.ts`).

## 8) Transaction Lifecycle Standard
All write flows (approve/transfer) follow:
1. Validate inputs (address, amount, token, chain)
2. Simulate/prepare contract write where possible
3. Submit transaction
4. Track hash in tx store
5. Await receipt
6. Invalidate relevant query keys
7. Render success/failure state with explorer link

## 9) Error Handling Strategy
- Normalize chain/RPC errors into app-level typed errors (`appError.ts`).
- Distinguish:
  - User rejection
  - Insufficient funds
  - Chain mismatch
  - Contract revert
  - RPC/network failure
- UI should never expose raw RPC stack traces.

## 10) Security and Safety Constraints
- Never hardcode private keys or secrets.
- Validate and checksum addresses before writes.
- Guard against decimal mismatch by always using token `decimals` and `parseUnits`/`formatUnits`.
- Enforce explicit token allowlist from `config/tokens.ts` for critical flows.
- Display exact chain + token symbol before user signs.

## 11) Environment and Configuration
Required env vars:
- `VITE_WALLETCONNECT_PROJECT_ID`

Optional env vars:
- `VITE_DEFAULT_CHAIN_ID` (fallback: Ethereum)
- `VITE_RPC_ETHEREUM`
- `VITE_RPC_ARBITRUM`
- `VITE_RPC_BASE`

`config/env.ts` should parse/validate env at startup and fail fast for missing required values in production builds.

## 12) Testing Strategy
- Unit tests:
  - formatters/parsers
  - error mappers
  - pure portfolio transforms
- Hook tests:
  - wagmi hooks wrapped with test providers + mocked RPC
- Component tests:
  - wallet connection states
  - approve/transfer form validation
- Optional E2E (later):
  - connect wallet, switch chain, approve and transfer on testnet/fork.

## 13) Incremental Delivery Plan

### Phase 1: Foundation
- Scaffold folders and base files.
- Implement providers (`QueryProvider`, `WagmiProvider`) and chain config.
- Add core layout shell and route structure.

### Phase 2: Wallet + Chain UX
- Implement connect wallet button/menu.
- Implement chain badge + chain switcher.
- Add unsupported chain guard.

### Phase 3: Balances
- Implement native and ERC20 balance hooks.
- Build token balance list components.
- Add refresh and empty/error states.

### Phase 4: ERC20 Actions
- Implement approve flow with allowance checks.
- Implement transfer flow and receipt tracking.
- Invalidate caches and update dashboard post-confirmation.

### Phase 5: Dashboard
- Aggregate portfolio view model.
- Render positions and APY placeholders.
- Add basic filters/sorting (UI state only).

### Phase 6: Hardening
- Error taxonomy completion.
- Accessibility + loading skeleton polish.
- Performance pass (memoization, query tuning, multicall optimizations).

## 14) Definition of Done (MVP)
- User connects wallet via MetaMask/WalletConnect.
- User can switch among Ethereum/Arbitrum/Base.
- Dashboard shows native + configured ERC20 balances.
- User can approve spender and transfer ERC20 token.
- Transaction states are visible and resilient across component rerenders.
- Codebase follows folder boundaries and strict TypeScript with no `any` in business logic.
