import { useMemo, useState, type FormEvent } from 'react'
import type { Address } from 'viem'
import { isAddress } from 'viem'
import { useAccount } from 'wagmi'
import { useErc20Transfer } from '../../hooks/erc20/useErc20Transfer'

function parseDecimals(value: string): number | null {
  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 255) {
    return null
  }

  return parsed
}

export function TransferForm() {
  const { address, chainId, status } = useAccount()
  const isConnected = status === 'connected'

  const [token, setToken] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [decimals, setDecimals] = useState('18')
  const [formError, setFormError] = useState<string | null>(null)

  const tokenAddress = useMemo(
    () => (isAddress(token) ? (token as Address) : undefined),
    [token],
  )
  const toAddress = useMemo(
    () => (isAddress(to) ? (to as Address) : undefined),
    [to],
  )

  const transferTx = useErc20Transfer()

  const submitTransfer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!isConnected || !address || !chainId) {
      setFormError('Connect wallet before transferring.')
      return
    }

    if (!tokenAddress) {
      setFormError('Enter a valid token address.')
      return
    }

    if (!toAddress) {
      setFormError('Enter a valid recipient address.')
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
      await transferTx.transfer({
        token: tokenAddress,
        to: toAddress,
        amount,
        decimals: parsedDecimals,
        chainId,
        owner: address,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transfer transaction failed.'
      setFormError(message)
    }
  }

  return (
    <form className="token-form" onSubmit={submitTransfer}>
      <h3 className="token-form-title">Transfer ERC20</h3>

      <label className="token-form-field">
        <span>Token Address</span>
        <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="0x..." />
      </label>

      <label className="token-form-field">
        <span>Recipient Address</span>
        <input value={to} onChange={(event) => setTo(event.target.value)} placeholder="0x..." />
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

      {(formError || transferTx.error) ? (
        <p className="token-form-error" role="alert">
          {formError ?? transferTx.error?.message}
        </p>
      ) : null}

      {transferTx.txHash ? (
        <p className="token-form-meta">Tx: {transferTx.txHash}</p>
      ) : null}

      <button
        className="wallet-action wallet-connect"
        type="submit"
        disabled={!isConnected || transferTx.isSubmitting || transferTx.isConfirming}
      >
        {transferTx.isSubmitting
          ? 'Submitting...'
          : transferTx.isConfirming
            ? 'Confirming...'
            : 'Transfer'}
      </button>
    </form>
  )
}
