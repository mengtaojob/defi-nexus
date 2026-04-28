import { useMemo, useState, type FormEvent } from 'react'
import type { Address } from 'viem'
import { isAddress } from 'viem'
import { useAccount } from 'wagmi'
import { useAllowance } from '../../hooks/erc20/useAllowance'
import { useErc20Approve } from '../../hooks/erc20/useErc20Approve'

function parseDecimals(value: string): number | null {
  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 255) {
    return null
  }

  return parsed
}

export function ApproveForm() {
  const { address, chainId, status } = useAccount()
  const isConnected = status === 'connected'

  const [token, setToken] = useState('')
  const [spender, setSpender] = useState('')
  const [amount, setAmount] = useState('')
  const [decimals, setDecimals] = useState('18')
  const [formError, setFormError] = useState<string | null>(null)

  const tokenAddress = useMemo(
    () => (isAddress(token) ? (token as Address) : undefined),
    [token],
  )
  const spenderAddress = useMemo(
    () => (isAddress(spender) ? (spender as Address) : undefined),
    [spender],
  )

  const allowance = useAllowance(tokenAddress, address, spenderAddress, chainId)
  const approveTx = useErc20Approve()

  const submitApprove = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!isConnected || !address || !chainId) {
      setFormError('Connect wallet before approving.')
      return
    }

    if (!tokenAddress) {
      setFormError('Enter a valid token address.')
      return
    }

    if (!spenderAddress) {
      setFormError('Enter a valid spender address.')
      return
    }

    if (!amount || Number(amount) <= 0) {
      setFormError('Enter a valid amount.')
      return
    }

    const parsedDecimals = parseDecimals(decimals)
    if (parsedDecimals === null) {
      setFormError('Decimals must be an integer between 0 and 255.')
      return
    }

    try {
      await approveTx.approve({
        token: tokenAddress,
        spender: spenderAddress,
        amount,
        decimals: parsedDecimals,
        chainId,
        owner: address,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Approval transaction failed.'
      setFormError(message)
    }
  }

  return (
    <form className="token-form" onSubmit={submitApprove}>
      <h3 className="token-form-title">Approve ERC20</h3>

      <label className="token-form-field">
        <span>Token Address</span>
        <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="0x..." />
      </label>

      <label className="token-form-field">
        <span>Spender Address</span>
        <input value={spender} onChange={(event) => setSpender(event.target.value)} placeholder="0x..." />
      </label>

      <div className="token-form-row">
        <label className="token-form-field">
          <span>Amount</span>
          <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.0" />
        </label>

        <label className="token-form-field">
          <span>Decimals</span>
          <input value={decimals} onChange={(event) => setDecimals(event.target.value)} placeholder="18" />
        </label>
      </div>

      <p className="token-form-meta">
        Current allowance:{' '}
        {allowance.data !== undefined ? allowance.data.toString() : 'N/A'}
      </p>

      {(formError || approveTx.error) ? (
        <p className="token-form-error" role="alert">
          {formError ?? approveTx.error?.message}
        </p>
      ) : null}

      {approveTx.txHash ? (
        <p className="token-form-meta">Tx: {approveTx.txHash}</p>
      ) : null}

      <button
        className="wallet-action wallet-connect"
        type="submit"
        disabled={!isConnected || approveTx.isSubmitting || approveTx.isConfirming}
      >
        {approveTx.isSubmitting
          ? 'Submitting...'
          : approveTx.isConfirming
            ? 'Confirming...'
            : 'Approve'}
      </button>
    </form>
  )
}
