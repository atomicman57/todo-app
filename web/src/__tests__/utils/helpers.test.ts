import { reorder } from '../../utils/helpers'

describe('Utility functions', () => {
  it('should reorder items in an array', () => {
    const inputArray = [
      { id: 1, sort: 0 },
      { id: 2, sort: 1 },
      { id: 3, sort: 2 },
    ]
    const expectedArray = [
      { id: 3, sort: 0 },
      { id: 1, sort: 1 },
      { id: 2, sort: 2 },
    ]
    const result = reorder(inputArray, 2, 0)

    expect(result).toEqual(expectedArray)
  })
})
