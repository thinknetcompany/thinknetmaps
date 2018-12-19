/* eslint-disable */
import  Marker  from '../../../src/custom/lib/Marker';
import Logger from '../../../src/custom/util/Logger';

global.filterInput = jest.fn()
global.layerIDs = []

const mockWarn = jest.fn()
const mockInfo = jest.fn()
const mockError = jest.fn()
const mockDebug = jest.fn()
const mockGetDebug = jest.fn()
jest.mock('../../../src/custom/util/Logger', ()=>({
    warn: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    getDebug: jest.fn(()=>false),
}));
jest.mock('../../../src/custom/util/handleDuplicateID');
jest.mock('../../../src/custom/util');
jest.mock('../../../src/custom/constant',()=>({
    LOG_CONSTANT:{
        UNDEFINED_LATLNG: "eiei"
    }
}));
describe('Test lib Marker', () => {
    

    //////////////////////////////////////////////////////
    /////////////////////addMarkerFilter//////////////////
    //////////////////////////////////////////////////////


    it('Function addMarkerFilter try logger.getdebug = true', () => {
        Logger.getDebug.mockImplementation(()=>true)
        Marker.setLayoutProperty = jest.fn()
        global.filterInput.addEventListener = jest.fn((a,b)=>{
                b({
                    "target":{
                        "value": "1"
                    }
                })
        });
        Marker.addSource = jest.fn()
        Marker.getLayer = jest.fn()
        Marker.addLayer = jest.fn()
        Marker.addMarkerFilter({
            "places":  [{
                    "properties":{
                        "icon": 1,
                        "label":1
                    }
                }]
        })
        expect(Marker.addLayer).toBeCalledWith({
            "filter": [
              "==",
              "label",
              1,
            ],
            "id": "poi-1",
            "layout": {
              "icon-allow-overlap": true,
              "icon-image": 1,
              "text-field": 1,
              "text-font": [
                "Open Sans Bold",
                "Arial Unicode MS Bold",
              ],
              "text-letter-spacing": 0.05,
              "text-offset": [
                0,
                1.5,
              ],
              "text-size": 11,
              "text-transform": "uppercase",
            },
            "paint": {
              "text-color": "#202",
              "text-halo-color": "#fff",
              "text-halo-width": 2,
            },
            "source": "places",
            "type": "symbol",
            })
    });

    it('Function addMarkerFilter no through try logger.getdebug = true', () => {
        Logger.getDebug.mockImplementation(()=>true)
        Marker.setLayoutProperty = jest.fn()
        global.filterInput.addEventListener = jest.fn((a,b)=>{
                b({
                    "target":{
                        "value": "1"
                    }
                })
        });
        Marker.addSource = jest.fn()
        Marker.getLayer = jest.fn((a)=>true)
        Marker.addLayer = jest.fn()
        Marker.addMarkerFilter({
            "places":  [{
                    "properties":{
                        "icon": 1,
                        "label":1
                    }
                }]
        })

        expect(Logger.error).toBeCalledWith("addMarkerFilter", undefined, {}, false)
    });
    
    it('Function addMarkerFilter logger,getdebug = false', () => {
        Logger.getDebug.mockImplementation(()=>false)
        Marker.setLayoutProperty = jest.fn()
        global.filterInput.addEventListener = jest.fn((a,b)=>{
                b({
                    "target":{
                        "value": "1"
                    }
                })
        });
        Marker.addSource = jest.fn()
        Marker.getLayer = jest.fn()
        Marker.addLayer = jest.fn()
        Marker.addMarkerFilter({
            "places":  [{
                    "properties":{
                        "icon": 1,
                        "label":1
                    }
                }]
        })

        expect(Marker.setLayoutProperty).toBeCalled()
    });

    it('Function addMarkerFilter catch', () => {
        Marker.setLayoutProperty = jest.fn()
        global.filterInput.addEventListener = jest.fn((a,b)=>{
                b({
                    "target":{
                        "value": "1"
                    }
                })
        });
        delete Marker.addLayer
        Marker.addMarkerFilter({
            "places":  [{
                    "properties":{
                        "icon": 1,
                        "label":1
                    }
                }]
        })

        expect(Logger.error).toBeCalledWith(
            'addMarkerFilter',
            'map.addLayer is not a function',
            {},
            false
        )
    });

    it('Function addMarkerFilter no places', () => {
        Marker.addMarkerFilter()
        expect(Logger.warn).toBeCalledWith('addMarkerFilter',undefined,{},false)
    });

    //////////////////////////////////////////////////////
    /////////////////////addMarkerImageArray//////////////
    //////////////////////////////////////////////////////


    it('Function addMarkerImageArray with lat lng & imageUrl error', () => {
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(1,2)
            }catch(error){
                expect(Logger.error).toBeCalledWith('addMarkerFilter',undefined,{},false)
                expect(error).toEqual(1)
            }
        })
        Marker.addMarkerImageArray({
            "id": 1,
            "places": [{
                "lat":1,
                "lng":2
            },{
                "lat": 3,
                "lng": 4
            }]
        })
    });
    
    it('Function addMarkerImageArray no lat lng imageUrl ok', () => {
        Logger.getDebug.mockImplementation(()=>false)
        Marker.addLayer = jest.fn()
        Marker.addImage = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImageArray({
            "id": 1,
            "places": [1,2]
        })
        expect(Logger.info).toBeCalledWith('addMarkerImageArray',null,{},true)
    });

    it('Function addMarkerImageArray no lat lng imageUrl ok', () => {
        Logger.getDebug.mockImplementation(()=>true)
        Marker.addLayer = jest.fn()
        Marker.addImage = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImageArray({
            "id": 1,
            "places": [1,2]
        })
        expect(Logger.debug).toBeCalledWith(
            'addMarkerFilter',
            null,
            {"places": [{"properties": {"icon": 1, "label": 1}}]}
        )
    });

    it('Function addMarkerImageArray no lat lng imageUrl ok catch', () => {
        delete Marker.addLayer
        Marker.addImage = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImageArray({
            "id": 1,
            "places": [1,2]
        })
        expect(Logger.error).toBeCalledWith(
            'addMarkerFilter',
            'map.addLayer is not a function',
            {},
            false
        )
    });

    it('Function addMarkerImageArray no info', () => {
        delete Marker.addLayer
        Marker.addImage = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImageArray()
        expect(Logger.error).toBeCalledWith(
            'addMarkerFilter',
            'map.addLayer is not a function',
            {},
            false
        )
    });

    //////////////////////////////////////////////////////
    /////////////////////addMarkerImage///////////////////
    //////////////////////////////////////////////////////

    it('Function addMarkerImage === url error', () => {
        Marker.addImage = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(1,2)
            }catch(error){
                expect(error).toEqual(1)
                expect(Logger.error).toBeCalledWith('addMarkerImageArray',undefined,{},true)
            }
        })
        Marker.addMarkerImage()
    });

    it('Function addMarkerImage === loadImage url ok', () => {
        Marker.on = jest.fn((a,b,c)=>{
            if(a === 'mouseenter'){
                c.call({
                    onClick:()=>true
                })
            }
        });
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImage({
            "id": "1234",
            "onClick" : ()=>true,
            "lat": 1,
            "lng": 1
        })
        expect(Logger.error).toBeCalledWith(
            'addMarkerImageArray',
            'map.addLayer is not a function',
            {},
            false
        )
    });

    it('Function addMarkerImage url ok === try === Logger.getDebug = true', () => {
        Logger.getDebug.mockImplementation(()=>true)
        Marker.on = jest.fn((a,b,c)=>{
            if(a === 'mouseenter'){
                c.call({
                    onClick:()=>true
                })
            }
        });
        Marker.addImage = jest.fn()
        Marker.addLayer = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImage({
            "onClick" : ()=>true
        })
        expect(Logger.debug).toBeCalledWith(
            'addMarkerFilter',
            null,
            {"places": [{"properties": {"icon": 1, "label": 1}}]}
        )
    });
    
    it('Function addMarkerImage url ok & no lat lng getdebug = true', () => {
        Logger.getDebug.mockImplementation(()=>false)
        Marker.on = jest.fn((a,b,c)=>{
            if(a === 'mouseenter'){
                c.call({
                    onClick:()=>true
                })
            }
        });
        Marker.addImage = jest.fn()
        Marker.addLayer = jest.fn()
        Marker.loadImage = jest.fn((param1,param2)=>{
            try{
                param2(null,2)
            }catch(error){    }
        })
        Marker.addMarkerImage({
            "onClick" : ()=>true
        })
        expect(Logger.info).toBeCalledWith(
            'addMarkerFilter',
            null,
            {},
            false
        )
    });


    //////////////////////////////////////////////////////
    /////////////////////addMarkerArray///////////////////
    //////////////////////////////////////////////////////

    it('Function addMarkerArray === marker is not an array', () => {
        Marker.addLayer= jest.fn()
        Marker.addMarkerArray()
        expect(Logger.warn).toBeCalledWith(
            'addMarkerImage',
            'eiei',
            {},
            false
        )
    });

    it('Function addMarkerArray === marker is array === marker has lat lng === catch', () => {
        delete Marker.addLayer
        // Marker.addLayer= jest.fn()
        Marker.addMarkerArray({
            "id":1,
            "marker":[{
                "lat": 1,
                "lng": 2
            }],
            "icon":1
        })
        expect(Logger.error).toBeCalledWith(
            'addMarkerImage',
            undefined,
            {},
            true
        )
    });

    it('Function addMarkerArray marker is array Logger.getDebug = true', () => {
        Logger.getDebug.mockImplementation(()=>true)
        Marker.addLayer= jest.fn()
        Marker.addMarkerArray({
            "id":1,
            "marker":[1,2,3],
            "icon":1
        })
        expect(Logger.debug).toBeCalledWith(
            'addMarkerImageArray',
            null,
            {"img_url": undefined, "offset": undefined, "places": [1, 2], "size": undefined}
        )
    });

    //////////////////////////////////////////////////////
    /////////////////////setMarker////////////////////////
    //////////////////////////////////////////////////////
    it('Function setMarker === no lat lng', () => {
        Marker.setMarker()
        expect(Logger.warn).toBeCalledWith(
            'addMarkerArray',
            'undefined 1',
            {},
            false
        )
        expect(Logger.error).toBeCalledWith(
            'mkr-006',
            'this.getSource is not a function',
            {},
            true
        )
    });

    it('Function setMarker === has lat lng === try === Logger.getDebug() => false', () => {
        Logger.getDebug.mockImplementation(()=>false)
        Marker.getSource = () =>{
            return {
                "setData" : () =>{}
            }
        }
        Marker.setMarker({
            "id": 1,
            "lat": 1,
            "lng": 1
        })

        expect(Logger.info).toBeCalledWith(
            'addMarkerImage',
            null,
            {},
            false
        )
    });

    it('Function setMarker === has lat lng === catch === Logger.getDebug() => true', () => {
        Logger.getDebug.mockImplementation(()=>true)
        Marker.setMarker({
            "id": 1,
            "lat": 1,
            "lng": 1
        })
        expect(Logger.debug).toBeCalledWith(
            'addMarkerImage',
            null,
            {"id": undefined, "img_url": undefined, "lat": undefined, "lng": undefined, "offset": [0, 0], "onClick": true, "size": 1}
        )
    });

    //////////////////////////////////////////////////////
    /////////////////////removeMarker/////////////////////
    //////////////////////////////////////////////////////

    it('Function removeMarker === map.getLayer is true', () => {
        const mockRemovePopup = jest.fn()
        const mockRemoveLayer = jest.fn()
        const mockRemoveSource = jest.fn()
        const mockMapParam = {
            getLayer: () => true,
            removePopup: mockRemovePopup,
            removeLayer: mockRemoveLayer,
            removeSource: mockRemoveSource
        }
        Marker.removeMarker(1, mockMapParam)
        expect(mockRemovePopup).toBeCalled()
        expect(mockRemoveSource).toBeCalled()
        expect(mockRemoveSource).toBeCalled() 
    });

    it('Function removeMarker === map.getLayer is false', () => {
        const mockMapParam = {
            getLayer: () => false
        }
        console.warn = jest.fn()
        Marker.removeMarker(1)
        expect(console.warn).toBeCalledWith('marker ID does not exist')
    });

    //////////////////////////////////////////////////////
    /////////////////////clearMarker//////////////////////
    //////////////////////////////////////////////////////
    it('Function clearMarkers', () => {
      const mockRemoveMarker = jest.fn()
        Marker.clearMarkers()
    });

    //////////////////////////////////////////////////////
    /////////////////////addMarker////////////////////////
    //////////////////////////////////////////////////////

    it('Function addMarker === payload has no lat lng', () => {
        Marker.addMarker()
        expect(Logger.debug).toBeCalledWith(
            'addMarkerArray',
            '',
            {"id": undefined, "markers": [1, 2, 3]}
        )
    })

    it('Function addMarker with error', () => {
        Marker.addMarker({
            "id":1,
            "onClick": ()=>true,
            "draggable": true,
            "popup": true,
            "lng":10.1
        })
        expect(Logger.error).toBeCalledWith(
            'mkr-006',
            'this.getSource is not a function',
            {},
            true
        )
    });

    it('Function addMarker with mouse enter', () => {
        Logger.getDebug.mockImplementation(()=>false)
        Marker.getSource = () =>{
            return {
                "setData" : () =>{}
            }
        }
        Marker.addLayer= jest.fn()
        Marker.on = jest.fn((a,b,c)=>{
            if(a === 'mouseenter'){
                c.call({
                    dragPan:{
                        disable:()=>true
                    }
                })
            }else if( a === 'mousedown'|| a === 'mousemove'){
                b({"lngLat":1})
            }
        })
        Marker.once = jest.fn((a,b)=>{
            b()
            b()
        })
        Marker.off= jest.fn((a,b)=>{
            b({"lngLat":1})
        })
        Marker.getCanvasContainer = () =>({
            "style": {
                "cursor": 1
            }
        })
        Marker.addLayer = jest.fn()
        Marker.addPopup = jest.fn()
        Marker.addMarker({
            "id":1,
            "onClick": ()=>true,
            "draggable": true,
            "popup": true,
            "onDragEnd":(a)=>{},
            "lat":10.1,
            "lng":20.2
        })
        expect(Logger.info).toBeCalledWith(
            'addMarkerArray',
            '',
            {},
            true
        )
    });
    
    it('Function addMarker with mouseleave', () => {
        let expectCall = false
        Marker.on = jest.fn((a,b,c)=>{
            if(a === 'mouseleave'){
                c.call({
                    dragPan:{
                        disable:()=>true,
                        enable:()=>{
                            expectCall = true
                        }
                    }
                })
            }else if( a === 'mousedown'|| a === 'mousemove'){
                b()
            }
        })
        Marker.getCanvasContainer = () =>({
            "style": {
                "cursor": 1
            }
        })
        Marker.addLayer = jest.fn()
        Marker.addPopup = jest.fn()
        Marker.addMarker({
            "id":1,
            "onClick": ()=>true,
            "draggable": true,
            "popup": true,
        })
        expect(expectCall).toBe(true)
    });
});
