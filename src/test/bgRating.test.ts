import { describe, it, expect } from 'vitest'
import { bgRating } from '../utils/bgRating'

const mockStyles = {
  good: 'good-class',
  normal: 'normal-class',
  bad: 'bad-class',
}

describe('bgRating', () => {
  it('should return good-class for ratings greater than 4', () => {
    expect(bgRating(5, mockStyles)).toBe(mockStyles.good)
    expect(bgRating(4.5, mockStyles)).toBe(mockStyles.good)
  })

  it('should return normal-class for ratings greater than 3 and less than or equal to 4', () => {
    expect(bgRating(4, mockStyles)).toBe(mockStyles.normal)
    expect(bgRating(3.5, mockStyles)).toBe(mockStyles.normal)
  })

  it('should return bad-class for ratings less than or equal to 3', () => {
    expect(bgRating(3, mockStyles)).toBe(mockStyles.bad)
    expect(bgRating(2.5, mockStyles)).toBe(mockStyles.bad)
  })
})
