/* eslint-disable */


const mockInfo = jest.fn()

jest.mock('../../../src/custom/util/Logger',()=>({
  info: ()=>mockInfo(),
}))

jest.mock('../../../src/custom/util/handleDuplicateID');
jest.mock('../../../src/custom/util');
jest.mock('../../../src/custom/constant',()=>({
  LOG_CONSTANT:{
    UNDEFINED_COORDINATES: 'UNDEFINED_COORDINATES'
  }
}));

describe('Test lib Handler', () => {
  const mockAppendChild = jest.fn()
  beforeEach(()=>{
    jest.resetModules();

    document.getElementsByClassName = jest.fn().mockReturnValue([{
      style:{
        zIndex: 1
      },
      addEventListener: (text,callback)=>{callback()}
    }])
  })

  afterEach(()=>{
    mockInfo.mockClear()
    mockAppendChild.mockClear()
  })

  it('initStyle to be used', () => {
    const Handler = require('../../../src/custom/lib/Handler').default
    const mockSetAttribute = jest.fn()

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{}
    })

    document.createElement = jest.fn().mockReturnValue({
      setAttribute: mockSetAttribute,
      style:{ },
    })

    Handler.disableScroll({
      scrollZoom:{
        disable: jest.fn()
      },
      dragPan: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      on: jest.fn(),
    })
    const map ={
      scrollZoom:{
        enable: jest.fn(),
        disable: jest.fn()
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
    }
    expect(mockInfo).toBeCalled()
    expect(mockSetAttribute).toBeCalled()
    expect(mockAppendChild).toBeCalled()

  });

  it('handleMobile to be used in if case', () => {
    const Handler = require('../../../src/custom/lib/Handler').default
    const mockDisable = jest.fn()
    const touchstart = {
      points:[1],
      touches:[0]
    }

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
      addEventListener: (text,callback)=>{callback(touchstart)}
    })

    Handler.disableScroll({
      scrollZoom:{
        disable: jest.fn()
      },
      on: (text,callback) => {callback(touchstart)},
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {
        _ignoreEvent: {},
        disable: mockDisable
      },
    })

    expect(mockDisable).toBeCalled()
  });

  it('handleMobile to be used in else case', () => {
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockEnable = jest.fn()
    const touchstart = {
      points:[1,1],
      touches:[0,0]
    }

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
      addEventListener: (text,callback)=>{callback(touchstart)}
    })

    Handler.disableScroll({
      scrollZoom:{
        disable: jest.fn()
      },
      on: (text,callback) => {callback(touchstart)},
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {
        _ignoreEvent: {},
        enable: mockEnable
      },
    })

    expect(mockEnable).toBeCalled()
  });

  it('clearEventScroll to be used', () => {
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockRemoveEventListener = jest.fn()
    document.getElementsByClassName = jest.fn().mockReturnValue([{
      removeEventListener: mockRemoveEventListener
    }])
    document.getElementById = jest.fn().mockReturnValue({
      removeEventListener: mockRemoveEventListener
    })
    Handler.clearEventScroll({})
    expect(mockRemoveEventListener).toBeCalled()
  });

  it('handleDesktop , _onKeydown ,_onKeyUp to be used', () => {
    Object.defineProperty(window.navigator,'appVersion', {
      value:['Win'],
      writable: true
    })
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockEnable = jest.fn()
    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 17
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        ctrlKey: true
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: jest.fn()
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: [0,1,2]
    })
    expect(mockEnable).toBeCalled()
  });
  
  it('else handleDesktop , _onKeydown ,_onKeyUp to be used', () => {
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockEnable = jest.fn()
    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 17
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        ctrlKey: true
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: jest.fn()
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: 0,
    })
    expect(mockEnable).toBeCalled()
  });

  it('overWrite to be used in boxZoom', () => {
    const Handler = require('../../../src/custom/lib/Handler').default
    const mockIsActive = jest.fn()
    const mockEnable = jest.fn()
    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 0
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        ctrlKey: false
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: jest.fn()
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
      boxZoom: {
        isActive:()=> true
      }
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: 0,
    })
    expect(mockAppendChild).toBeCalled()
  });

  it('overWrite to be used in dragRotate', () => {
    const Handler = require('../../../src/custom/lib/Handler').default
    const mockIsActive = jest.fn()
    const mockEnable = jest.fn()
    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 17
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        ctrlKey: true
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: jest.fn()
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
      dragRotate: {
        isActive:()=> true
      }
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: 0,
    })
    expect(mockEnable).toBeCalled()
    expect(mockAppendChild).toBeCalled()
  });

  it('handleDesktop , _onKeydown ,_onKeyUp to be used in Mac', () => {
    Object.defineProperty(window.navigator,'appVersion', {
      value:['Mac'],
      writable: true
    })
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockEnable = jest.fn()
    const mockDisable = jest.fn()
    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 91
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        metaKey: true
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: mockDisable
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: 0,
    })

    expect(mockEnable).toBeCalled()
    expect(mockDisable).toBeCalled()
  });

  it('handleDesktop , _onKeydown ,_onKeyUp to be used in Mac', () => {
    Object.defineProperty(window.navigator,'appVersion', {
      value:['Mac'],
      writable: true
    })
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockEnable = jest.fn()
    const mockDisable = jest.fn()

    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 0
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        metaKey: false
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: jest.fn(),
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: mockDisable
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {},
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: 0,
    })
    expect(mockDisable).toBeCalled()
  });

  it('handleDesktop , _onKeydown ,_onKeyUp to be used in Mac', () => {
    Object.defineProperty(window.navigator,'appVersion', {
      value:['Win'],
      writable: true
    })
    const Handler = require('../../../src/custom/lib/Handler').default

    const mockEnable = jest.fn()
    const mockDisable = jest.fn()

    document.body.addEventListener = jest.fn((text,callback)=>{
      callback({
        which: 0
      })
    })
    document.addEventListener = jest.fn((text,callback)=>{
      callback({
        metaKey: false
      })
    })

    document.getElementById = jest.fn().mockReturnValue({
      appendChild: mockAppendChild,
      addEventListener: (text,callback)=>{callback({touches:[0,0]})},
      style:{},
    })
    const map ={
      scrollZoom:{
        enable: mockEnable,
        disable: mockDisable
      },
      on: jest.fn(),
      _canvasContainer:{
        offsetParent:{
          id:1
        }
      },
      dragPan: {
        enable: mockEnable
      },
    }
    Handler.disableScroll(map)
    map.dragPan._ignoreEvent({
      touches: 0,
      ctrlKey: true
    })
    expect(mockDisable).toBeCalled()
  });
});
