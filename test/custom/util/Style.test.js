/* eslint-disable */
import Style from '../../../src/custom/util/Style';
import { getJSON, ResourceType } from '../../../src/util/ajax';
import Debugger from '../../../src/custom/util/Debugger';

jest.mock('../../../src/util/evented');
jest.mock('../../../src/style/style')
jest.mock('../../../src/util/mapbox');
jest.mock('../../../src/util/ajax');
jest.mock('../../../src/custom/util/Debugger');

describe('Test of util/Style', () => {
  const mockFire = jest.fn()
  const mockTransformRequest = jest.fn()
  const mockAlertMissingKey = jest.fn()
  afterEach(()=>{
    mockFire.mockClear()
    mockTransformRequest.mockClear()
    mockAlertMissingKey.mockClear()
  })

  it('Style to be used but error', () => {
    const erorr = true;
    const json = {}
    Debugger.alertMissingKey = mockAlertMissingKey
    getJSON.mockImplementation((req,callback)=>callback(erorr,json))

    Style.prototype.fire = mockFire
    Style.prototype.map = {
      _transformRequest: mockTransformRequest
    }
    Style.prototype.loadURL('url',{validate:false,accessToken:'test'});

    expect(mockTransformRequest).toBeCalled()
    expect(mockFire).toBeCalled()
    expect(mockAlertMissingKey).toBeCalled()
  });

  it('Style to be used correct', () => {
    const erorr = false;
    const json = true
    const mockLoad = jest.fn()
    getJSON.mockImplementation((req,callback)=>callback(erorr,json))
    
    Style.prototype.fire = mockFire
    Style.prototype.map = {
      _transformRequest: mockTransformRequest
    }
    Style.prototype._load = mockLoad
    Style.prototype.loadURL('test');

    expect(mockTransformRequest).toBeCalled()
    expect(mockFire).toBeCalled()
    expect(mockLoad).toBeCalled()

  });

  it('Style to be used case else', () => {
    const erorr = false;
    const json = false
    const mockLoad = jest.fn()
    getJSON.mockImplementation((req,callback)=>callback(erorr,json))
    
    Style.prototype.fire = mockFire
    Style.prototype.map = {
      _transformRequest: mockTransformRequest
    }
    Style.prototype._load = mockLoad
    Style.prototype.loadURL('test');

    expect(mockTransformRequest).toBeCalled()
    expect(mockFire).toBeCalled()

  });
});
