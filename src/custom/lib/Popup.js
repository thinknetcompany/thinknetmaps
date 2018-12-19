// @flow
import Popup from '../../ui/popup';
import Logger from '../util/Logger';
import handleDuplicateID from '../util/handleDuplicateID';

let logFirst = true;

const popups = [];

const eventShow = function (map, idMarker, geojson) {
    popups[idMarker] = new Popup({
        closeOnClick: false
    })
        .setLngLat(geojson.features[0].geometry.coordinates)
        .setHTML(geojson.features[0].properties.description)
        .addTo(map);
};

const eventClick = function (map, idMarker, payload) {
    map.on('click', idMarker, function (e) {
        popups[idMarker] = new Popup({
            anchor: payload.anchor || '',
            offset: payload.offset || [0, 0]
        }).setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.description)
            .addTo(this);
    });
    map.on('mouseenter', idMarker, function () {
        this.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', idMarker, function () {
        this.getCanvas().style.cursor = '';
    });
};

const eventHover = function (map, idMarker, payload) {
    const popup = new Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: payload.anchor || '',
        offset: payload.offset || [0, 0]
    });
    map.on('mouseenter', idMarker, function (e) {
        this.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.description)
            .addTo(this);
    });
    map.on('mouseleave', idMarker, function () {
        this.getCanvas().style.cursor = '';
        popup.remove();
    });
};

const removePopup = function (idMarker) {
    if (popups[idMarker]) {
        popups[idMarker].remove();
        delete popups[idMarker];
    }
};

const addPopup = function (payload = {}) {
    const ID = payload.id ? handleDuplicateID(payload.id) : `places${Math.floor(Math.random() * 1000) + 1}`;

    const geojson = this.getSource(ID)._data;
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
