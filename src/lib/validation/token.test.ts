import { describe, expect, it } from 'vitest'
import { isPositiveAmount, parseDecimals } from './token'

describe('parseDecimals', () => {
  it('parses valid integer decimals', () => {
    expect(parseDecimals('18')).toBe(18)
  })

  it('rejects non-integer and out-of-range values', () => {
    expect(parseDecimals('18.5')).toBeNull()
    expect(parseDecimals('-1')).toBeNull()
    expect(parseDecimals('999')).toBeNull()
  })
})

describe('isPositiveAmount', () => {
  it('accepts positive finite numbers', () => {
    expect(isPositiveAmount('1')).toBe(true)
    expect(isPositiveAmount('0.0001')).toBe(true)
  })

  it('rejects zero, negatives, and invalid numbers', () => {
    expect(isPositiveAmount('0')).toBe(false)
    expect(isPositiveAmount('-4')).toBe(false)
    expect(isPositiveAmount('abc')).toBe(false)
  })
})
