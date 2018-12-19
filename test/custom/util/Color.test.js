import { isLight } from '../../../src/custom/util/Color';

describe('Color utilize test suite', () => {
  it('isLight should return false when color is going dark', () => {
    const result = isLight('#545454')
    expect(result).toBeFalsy()
  })

  it('isLight should return true when color is going bright tone', () => {
    const result = isLight('#f7efad')
    expect(result).toBeTruthy()
  })
});
