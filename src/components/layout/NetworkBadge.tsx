interface NetworkBadgeProps {
  label: string
}

export function NetworkBadge({ label }: NetworkBadgeProps) {
  return <span>{label}</span>
}
