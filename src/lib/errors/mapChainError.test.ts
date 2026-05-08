import { describe, expect, it } from 'vitest'
import { mapChainError } from './mapChainError'

describe('mapChainError', () => {
  it('maps wallet rejection', () => {
    const mapped = mapChainError(new Error('User rejected the request'))
    expect(mapped.code).toBe('USER_REJECTED')
  })

  it('maps insufficient funds', () => {
    const mapped = mapChainError(new Error('insufficient funds for gas * price + value'))
    expect(mapped.code).toBe('INSUFFICIENT_FUNDS')
  })

  it('maps network failures', () => {
    const mapped = mapChainError(new Error('fetch failed'))
    expect(mapped.code).toBe('NETWORK_FAILURE')
  })

  it('falls back to unknown', () => {
    const mapped = mapChainError({ foo: 'bar' })
    expect(mapped.code).toBe('UNKNOWN')
  })
})
