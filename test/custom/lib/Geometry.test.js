/* eslint-disable */
import map from '../../../src/custom/lib/Geometry.js';
import Logger from '../../../src/custom/util/Logger';

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

jest.mock('../../../src/custom/util/handleDuplicateID');
jest.mock('../../../src/custom/util');
jest.mock('../../../src/custom/constant',()=>({
  LOG_CONSTANT:{
    UNDEFINED_COORDINATES: 'UNDEFINED_COORDINATES'
  }
}));

describe('Test lib Geometry', () => {
  beforeEach(()=>{
    const mockAddSource = jest.fn()
    const mockAddLayer = jest.fn()

    map.addSource = mockAddSource
    map.addLayer = mockAddLayer
  })

  afterEach(()=>{
    delete Logger.getDebug
    mockWarn.mockClear()
    mockError.mockClear()
    mockInfo.mockClear()
    mockDebug.mockClear()
  })

  it('addPolygon without payload and catch', () => {
    map.addPolygon({})
    expect(mockError).toBeCalled()
  });

  it('addPolygon without coordinates', () => {
    map.addPolygon({
      id:1,
      style:{
        fillColor: undefined,
        fillOpacity: undefined
      }
    })
    expect(mockWarn).toBeCalled()
  });

  it('addPolygon use Logger.info with coordinates', () => {
    Logger.getDebug = () => false
    map.addPolygon({coordinates:[0,0]})
    expect(mockInfo).toBeCalled()
  });

  it('addPolygon and use Logger.info', () => {
    Logger.getDebug = () => true
    map.addPolygon({})
    expect(mockDebug).toBeCalled()
  });

  it('addLine without payload', () => {
    map.addLine({})
    expect(mockWarn).toBeCalled()
    expect(mockError).toBeCalled()
  });

  it('addLine with coordinates', () => {
    map.addLine({
        id:1,
        coordinates:[0,0],
        style:{
          color: undefined,
          lineWidth: undefined
        }
    })
    expect(mockError).toBeCalled()
  });

  it('addLine use Logger.info', () => {
    Logger.getDebug = () => false

    map.addLine({id:1})
    expect(mockInfo).toBeCalled()
  });

  it('addLine use Logger.debug', () => {
    Logger.getDebug = () => true

    map.addLine({})
    expect(mockDebug).toBeCalled()
  });
});
