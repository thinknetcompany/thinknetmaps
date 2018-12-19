/* eslint-disable */
import Popup from '../../../src/custom/lib/Popup';
import Logger from '../../../src/custom/util/Logger.js'

jest.mock('../../../src/ui/popup.js', () => (
    class Popup {
        constructor () {}
        setLngLat (param) {
            return {
                setHTML: (param) => {
                    if (param === 'fail') throw new Error('FAIL')
                    return {
                        addTo: (param) => new Popup()
                    }
                }
            }
        }
        remove (id) {
            return console.warn('remove popup success')
        }
    }
))
jest.mock('../../../src/custom/util/Logger.js', () => ({
    getDebug: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn()
}))
console.warn = jest.fn()

describe('Unit test: Popup', () => {
    const geojson = {
        features: [
            {
                geometry: {
                    coordinates: 11
                },
                properties: {
                    description: 'mockDescription'
                }
            }
        ]
    }
    const geojsonFail = {
        features: [
            {
                geometry: {
                    coordinates: 11
                },
                properties: {
                    description: 'fail'
                }
            }
        ]
    }
    const payloadShow = {id: 'show', action: 'show'}
    const payloadClick = {id: 'click', action: 'click'}
    const payloadHover = {id: 'hover', action: 'hover'}

    beforeEach(() => {
        jest.resetAllMocks()
        Popup.getSource = (id) => ({
            _data: geojson,
            setData: jest.fn()
        })
        Popup.on = (param1, id, callback) => {
            if (id === 'fail') throw new Error('FAIL')
            callback.call({getCanvas: ()=> ({style: ({cursor: 'mockCanvas'})})},geojson)
            return 'mock map.on'
        }
    })

    it('addMarker: default', () => {
        Logger.getDebug.mockReturnValue(false)
        Popup.addPopup()
        expect(Logger.info).toBeCalledWith('addPopup', null, {}, true);
    });

    it('addMarker: action = show and Logger debug mode = false', () => {
        Logger.getDebug.mockReturnValue(false)
        Popup.addPopup(payloadShow)
        expect(Logger.info).toBeCalledWith('addPopup', null, {}, false);
    });
    it('addMarker: action = show and Logger debug mode = true', () => {
        Logger.getDebug.mockReturnValue(true)
        Popup.addPopup({action: 'show'})
        expect(Logger.debug).toBeCalledWith('addPopup', null, {action: 'show'});
    });
    it('addMarker: action = show, FAIL', () => {
        Popup.getSource = (id) => ({
            _data: geojsonFail,
            setData: jest.fn()
        })
        const payloadShowFail = {id: 'fail', action: 'show'}
        Logger.getDebug.mockReturnValue(true)
        Popup.addPopup(payloadShowFail)
        expect(Logger.error).toBeCalledWith('addPopup', 'FAIL');
    });

    it('addMarker: action = click and Logger debug mode = false', () => {
        Logger.getDebug.mockReturnValue(false)
        Popup.addPopup(payloadClick)
        expect(Logger.info).toBeCalledWith('addPopup', null, {}, false)
    });
    it('addMarker: action = click and Logger debug mode = true', () => {
        Logger.getDebug.mockReturnValue(true)
        Popup.addPopup(payloadClick)
        expect(Logger.debug).toBeCalledWith('addPopup', null, payloadClick)
    });
    it('addMarker: action = click, FAIL', () => {
        Popup.getSource = (id) => ({
            _data: geojsonFail,
            setData: jest.fn()
        })
        const payloadClickFail = {id: 'fail', action: 'click'}
        Popup.addPopup(payloadClickFail)
        expect(Logger.error).toBeCalledWith('addPopup', 'FAIL')
    });

    it('addMarker: action = hover and Logger debug mode = false', () => {
        Logger.getDebug.mockReturnValue(false)
        Popup.addPopup(payloadHover)
        expect(Logger.info).toBeCalledWith('addPopup', null, {}, false)
    });
    it('addMarker: action = hover and Logger debug mode = true', () => {
        Logger.getDebug.mockReturnValue(true)
        Popup.addPopup(payloadHover)
        expect(Logger.debug).toBeCalledWith('addPopup', null, payloadHover)
    });
    it('addMarker: action = hover, FAIL', () => {
        Popup.getSource = (id) => ({
            _data: geojsonFail,
            setData: jest.fn()
        })
        const payloadHoverFail = {id: 'fail', action: 'hover'}
        Popup.addPopup(payloadHoverFail)
        expect(Logger.error).toBeCalledWith('addPopup', 'FAIL')
    });

    it('addMarker: action = outOfScope', () => {
        const payloadOutScope = {id: 'out', action: 'out'}
        Popup.addPopup(payloadOutScope)
        expect(Logger.debug).not.toBeCalled()
        expect(Logger.info).not.toBeCalled()
        expect(Logger.error).not.toBeCalled()
    });
    
    // remove function
    it('removePopup: Success', () => {
        Popup.addPopup(payloadShow)
        Popup.removePopup('show')
        expect(console.warn).toBeCalledWith('remove popup success')
    });
    it('removePopup: Not found ID', () => {
        Popup.removePopup('show')
        expect(console.warn).not.toBeCalled()
    });
})