interface ApyCardProps {
  apy: number
}

export function ApyCard({ apy }: ApyCardProps) {
  return <article>APY: {apy}%</article>
}
