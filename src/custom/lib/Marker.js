// @flow
import Logger from '../util/Logger';
import handleDuplicateID from '../util/handleDuplicateID';
import { randomID } from '../util';
import { LOG_CONSTANT } from '../constant';
import type Map from '../../ui/map';

const loggerDebug = {
    addMarker: true,
    addMarkerArray: true,
    addMarkerImage: true,
    addMarkerImageArray: true,
    addMarkerFilter: true,
    setMarker: true,
};

const markers = [];

const getMarker = function (id: string, map?: Map = this) {
    const layer = map.getLayer(id);
    const source = map.getSource(id);
    if (!layer || !source) {
        return null;
    }
    const marker = {
        id,
        layer,
        source,
    };
    return marker;
};

const getAllMarker = function () {
    return markers.map((id) => getMarker(id, this));
};

const removeMarker = function (id: string, map?: Map = this) {
    if (id) {
        const layer = map.getLayer(id);
        if (layer) {
            map.removePopup(id, this);
            map.removeLayer(id);
            if (map._delegatedListeners && map._delegatedListeners.click) {
                const selectedListener = map._delegatedListeners.click.find(({ layer }) => layer === id);
                if (selectedListener) {
                    map.off('click', id, selectedListener.listener);
                }
            }
            map.removeSource(id);
        } else {
            console.warn('specified marker does not exist');
        }
    }
};

const clearMarkers = function () {
    markers.forEach(id => {
        removeMarker(id, this);
    });
};

const addMarker = function (payload: {
    id: string,
    lng: number,
    lat: number,
    onClick?: any,
    size: number,
    offset?: any,
} = {}) {
    if (!payload.lng || !payload.lat) {
        Logger.warn(addMarker.name, LOG_CONSTANT.UNDEFINED_LATLNG, {}, loggerDebug.addMarker);
    }

    const ID = payload.id ? handleDuplicateID(payload.id) : randomID();
    markers.push(ID);

    const geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {
                "description": (payload.popup && payload.popup.description) || '',
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    payload.lng,
                    payload.lat,
                ]
            }
        }],
    };
    const args = {
        id: ID || '',
        lat: payload.lat || '',
        lng: payload.lng || '',
        size: payload.size || 1,
        offset: payload.offset || [0, 0],
    };

    try {
        if (payload.onClick) {
            args.onClick = (payload.onClick !== undefined);
            this.on('click', ID, payload.onClick);
        }

        if (payload.draggable) {
            args.draggable = payload.draggable;
            let isDragging;
            let isCursorOverPoint;
            const canvas = this.getCanvasContainer();
            const onMove = (e) => {
                if (!isDragging) return;
                const coords = e.lngLat;
                // Set a UI indicator for dragging.
                canvas.style.cursor = 'grabbing';
                // Update the Point feature in `geojson` coordinates
                // and call setData to the source layer `point` on it.
                geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
                this.getSource(ID).setData(geojson);

            };

            const onMouseUp = (e) => {
                if (!isDragging) return;
                if (payload.onDragEnd && isDragging)
                    payload.onDragEnd(e);

                canvas.style.cursor = '';
                isDragging = false;

                // Unbind mouse events
                this.off('mousemove', onMove);
            };

            const onMouseDown = () => {
                if (!isCursorOverPoint) return;

                isDragging = true;

                // Set a cursor indicator
                canvas.style.cursor = 'grab';

                // Mouse events
                this.on('mousemove', onMove);

                this.once('mouseup', onMouseUp);
            };

            this.on('mouseenter', ID, function () {
                canvas.style.cursor = 'move';
                isCursorOverPoint = true;
                this.dragPan.disable();
            });

            this.on('mouseleave', ID, function () {
                canvas.style.cursor = '';
                isCursorOverPoint = false;
                this.dragPan.enable();
            });
            this.on('mousedown', onMouseDown);
        }

        this.addLayer({
            "id": ID, // use when hover popup
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": geojson
            },
            "layout": {
                "icon-image": payload.icon || 'mmg_pin_1_orange',
                "icon-allow-overlap": true,
                'icon-size': payload.size || 1,
                'icon-offset': payload.offset || [0, 0],
            }
        });

        if (payload.popup) {
            payload.popup.id = ID;
            this.addPopup(payload.popup);
        }
        if (!Logger.getDebug()) {
            Logger.info(addMarker.name, '', {}, loggerDebug.addMarker);
        } else {
            Logger.debug(addMarker.name, '', args, loggerDebug.addMarker);
        }
    } catch (error) {
        Logger.error(addMarker.name, error.message, {}, loggerDebug.addMarker);
        console.log(error);
    }
    loggerDebug.addMarker = false;
};

const addMarkerImage = function (info = {}) {
    const {
        id,
        url,
        description,
        lat,
        lng,
        size,
        offset,
        onClick
    } = info;
    if (!lat || !lng) {
        Logger.warn(addMarkerImage.name, LOG_CONSTANT.UNDEFINED_LATLNG, {}, loggerDebug.addMarkerImage);
    }
    const map = this;
    const ID = id ? handleDuplicateID(id) : randomID();
    markers.push(ID);
    const args = {
        id: ID,
        lat,
        lng,
        img_url: url,
        size: size || 1,
        offset: offset || [0, 0],
    };
    map.loadImage(url || '', (error, image) => {
        if (error) {
            Logger.error(addMarkerImage.name, error.message, {}, loggerDebug.addMarkerImage);
            throw error;
        }

        try {
            map.addImage(ID, image);
            if (onClick) {
                args.onClick = (onClick !== undefined);
                this.on('click', ID, onClick);
            }

            map.addLayer({
                'id': ID, // use when hover popup
                'type': 'symbol',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [{
                            'type': 'Feature',
                            'properties': {
                                'description': description || '',
                                'icon': 'theatre'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [lng, lat]
                            }
                        }]
                    }
                },
                'layout': {
                    'icon-image': ID,
                    'icon-size': size || 1,
                    'icon-offset': offset || [0, 0]
                }
            });
            if (!Logger.getDebug()) {
                Logger.info(addMarkerImage.name, null, {}, loggerDebug.addMarkerImage);
            } else {
                Logger.debug(addMarkerImage.name, null, args);
            }
        } catch (error) {
            Logger.error(addMarkerImage.name, error.message, {}, loggerDebug.addMarkerImage);
        }
    });
    loggerDebug.addMarkerImage = false;
};

const setMarker = function (payload = {}) {
    const SET_MARKER = 'mkr-006';
    const {
        id,
        lng,
        lat
    } = payload;

    if (!lat || !lng) {
        Logger.warn(addMarkerImage.name, LOG_CONSTANT.UNDEFINED_LATLNG, {}, loggerDebug.setMarker);
    }

    const geojson = {
        "type": "Point",
        "coordinates": [
            lng,
            lat,
        ]
    };

    try {
        this.getSource(id).setData(geojson);
        if (!Logger.getDebug()) {
            Logger.info(SET_MARKER, null, payload, loggerDebug.setMarker);
        } else {
            Logger.debug(SET_MARKER, null, payload);
        }
    } catch (error) {
        Logger.error(SET_MARKER, error.message, {}, loggerDebug.setMarker);
    }
    loggerDebug.setMarker = Logger.getDebug();
};

export default {
    getMarker,
    getAllMarker,
    addMarker,
    removeMarker,
    clearMarkers,
    addMarkerImage,
    setMarker,
};
