import { isNullOrWhitespace } from '../../utils/validation'

describe('String Utils', () => {
  describe('isNullOrWhitespace', () => {
    it('should return true for null, undefined, and empty string', () => {
      expect(isNullOrWhitespace(undefined)).toBe(true)
      expect(isNullOrWhitespace('')).toBe(true)
    })

    it('should return true for strings that only contain whitespace', () => {
      expect(isNullOrWhitespace(' ')).toBe(true)
      expect(isNullOrWhitespace('\t')).toBe(true)
      expect(isNullOrWhitespace('\n')).toBe(true)
      expect(isNullOrWhitespace(' \t\n ')).toBe(true)
    })

    it('should return false for strings that contain non-whitespace characters', () => {
      expect(isNullOrWhitespace('hello')).toBe(false)
      expect(isNullOrWhitespace(' hello ')).toBe(false)
      expect(isNullOrWhitespace('hello\tworld')).toBe(false)
      expect(isNullOrWhitespace('123')).toBe(false)
      expect(isNullOrWhitespace('true')).toBe(false)
    })
  })
})
