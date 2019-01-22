// @flow
import Popup from '../../ui/popup';
import Logger from '../util/Logger';
import { randomID } from '../util';
import handleDuplicateID from '../util/handleDuplicateID';

let logFirst = true;

const popups = [];

const eventShow = function (map, id, geojson) {
    popups[id] = new Popup({
        closeOnClick: false
    })
        .setLngLat(geojson.features[0].geometry.coordinates)
        .setHTML(geojson.features[0].properties.description)
        .addTo(map);
    popups[id]._container.style.zIndex = 1;
};

const eventClick = function (map, id, payload) {
    map.on('click', id, function (e) {
        popups[id] = new Popup({
            anchor: payload.anchor || '',
            offset: payload.offset || [0, 0]
        }).setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.description)
            .addTo(this);
        popups[id]._container.style.zIndex = 1;
    });
    map.on('mouseenter', id, function () {
        this.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', id, function () {
        this.getCanvas().style.cursor = '';
    });
};

const eventHover = function (map, id, payload) {
    const popup = new Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: payload.anchor || '',
        offset: payload.offset || [0, 0]
    });
    map.on('mouseenter', id, function (e) {
        this.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.description)
            .addTo(this);
        popup._container.style.zIndex = 1;
    });
    map.on('mouseleave', id, function () {
        this.getCanvas().style.cursor = '';
        popup.remove();
    });
};

const removePopup = function (id, map = this) {
    if (popups[id]) {
        popups[id].remove();
        delete popups[id];
        if (map._delegatedListeners.click) {
            const removingListener = map._delegatedListeners.click.find(({ layer }) => id === layer);
            if (removingListener) {
                map.off('click', id, removingListener.listener);
            }
        }
        if (map._delegatedListeners.mouseenter) {
            map._delegatedListeners.mouseenter.forEach(({ layer, listener }) => {
                if (layer === id) {
                    map.off('mouseenter', id, listener);
                }
            });
        }
        if (map._delegatedListeners.mouseleave) {
            map._delegatedListeners.mouseleave.forEach(({ layer, listener }) => {
                if (layer === id) {
                    map.off('mouseleave', id, listener);
                }
            });
        }
    }
};

const addPopup = function (payload = {}) {
    const ID = payload.id ? handleDuplicateID(payload.id) : randomID();

    const geojson = this.getSource(ID)._data;
    if (payload.description && geojson) {
        geojson.features[0].properties.description = payload.description;
    }
    this.getSource(ID).setData(geojson);

    const action = payload.action || 'show';

    if (action === 'show') {
        try {
            eventShow(this, ID, geojson);
            if (!Logger.getDebug()) {
                Logger.info(addPopup.name, null, {}, logFirst);
            } else {
                Logger.debug(addPopup.name, null, payload);
            }
        } catch (error) {
            Logger.error(addPopup.name, error.message);
        }
    } else if (action === 'click') {
        try {
            eventClick(this, ID, payload);
            if (!Logger.getDebug()) {
                Logger.info(addPopup.name, null, {}, logFirst);
            } else {
                Logger.debug(addPopup.name, null, payload);
            }
        } catch (error) {
            Logger.error(addPopup.name, error.message);
        }
    } else if (action === 'hover') {
        try {
            eventHover(this, ID, payload);
            if (!Logger.getDebug()) {
                Logger.info(addPopup.name, null, {}, logFirst);
            } else {
                Logger.debug(addPopup.name, null, payload);
            }
        } catch (error) {
            Logger.error(addPopup.name, error.message);
        }
    }
    logFirst = false;
};

export default {
    addPopup,
    removePopup
};
