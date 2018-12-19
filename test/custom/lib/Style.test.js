/* eslint-disable */
const mockSetPaintProperty = jest.fn()

global.map = {
  setPaintProperty: mockSetPaintProperty
}
import Style from '../../../src/custom/lib/Style';

const mockWarn = jest.fn()
const mockError = jest.fn()
const mockInfo = jest.fn()
const mockDebug = jest.fn()

jest.mock('../../../src/custom/util/Logger',()=>({
  warn: ()=>mockWarn(),
  error: ()=>mockError(),
  info: ()=>mockInfo(),
  debug: ()=>mockDebug()
}))
jest.mock('../../../src/custom/constant',()=>({
  LOG_CONSTANT:{
    UNDEFINED_LAYER: ''
  },
  LOGO_IMG:{ 
    
   },
}))


describe('Test of Style lib', () => {
  afterEach(()=>{
    mockWarn.mockClear()
    mockError.mockClear()
    mockInfo.mockClear()
    mockDebug.mockClear()
    mockSetPaintProperty.mockClear()
  })

    it('catch in initColorMap', () => {
      Style.initColorMap()
      expect(mockError).toBeCalled()
    });

    it('initColorMap without layer and color', () => {
      Style.initColorMap({
        layers:[{
            layer: undefined,
            color: undefined
        }]
      })
      expect(mockWarn.mock.calls.length).toBe(2)
    });

    it('initColorMap with layer is street', () => {
      Style.initColorMap({
        layers:[{
            layer: 'street',
            color: '#FFFFFF'
        }]
      })
      expect(mockSetPaintProperty.mock.calls.length).toBe(4)
    });

    it('initColorMap with layer is water', () => {
      Style.initColorMap({
        layers:[{
            layer: 'water',
            color: '#FFFFFF'
        }]
      })
      expect(mockSetPaintProperty.mock.calls.length).toBe(6)
    });

    it('initColorMap with layer is province', () => {
      Style.initColorMap({
        layers:[{
            layer: 'province',
            color: '#FFFFFF'
        }]
      })
      expect(mockSetPaintProperty.mock.calls.length).toBe(1)
    });

    it('initColorMap with layer is area', () => {
      Style.initColorMap({
        layers:[{
            layer: 'area',
            color: '#FFFFFF'
        }]
      })
      expect(mockSetPaintProperty.mock.calls.length).toBe(2)
    });

    it('initColorMap with layer is building', () => {
      Style.initColorMap({
        layers:[{
            layer: 'building',
            color: '#FFFFFF'
        }]
      })
      expect(mockSetPaintProperty.mock.calls.length).toBe(1)
    });
});
