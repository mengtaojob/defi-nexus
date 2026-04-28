interface TokenRowProps {
  symbol: string
  balance: string
}

export function TokenRow({ symbol, balance }: TokenRowProps) {
  return (
    <div>
      <span>{symbol}</span>
      <span>{balance}</span>
    </div>
  )
}
