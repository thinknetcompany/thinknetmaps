/* eslint-disable no-undef */
// @flow
import Logger from '../util/Logger';

const macText = 'กด ⌘ + Scroll เพื่อซูมแผนที่';
const winText = 'กด Ctrl + Scroll เพื่อซูมแผนที่';
const mobileText = 'ใช้ 2 นิ้วเพื่อเลื่อนแผนที่';

const isWin = navigator.appVersion.includes("Win");
const isMac = navigator.appVersion.includes("Mac");

const overWrite = (map) => {
    map.dragPan._ignoreEvent = function _ignoreEvent(e) {
        if (map.boxZoom && map.boxZoom.isActive()) {
            return true;
        }
        if (map.dragRotate && map.dragRotate.isActive()) {
            return true;
        }
        if (e.touches) {
            return (e.touches.length !== 2);
        } else {
            if (e.ctrlKey) return true;
            return e.type !== 'mousemove' && e.button && e.button !== 0; // left button
        }
    };
};

const initStyle = (map) => {
    const id = map._canvasContainer.offsetParent.id;
    document.getElementById(`${map.container}-canvas`).style.zIndex = 1;

    const element = document.createElement("div");
    element.setAttribute('id', `${map.container}-overlay`);
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.backgroundColor = 'black';
    element.style.color = 'white';
    element.style.opacity = 0;
    element.style.fontSize = '1.3rem';
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.justifyContent = 'center';
    element.style.alignItems = 'center';
    element.style.position = 'absolute';
    element.style.zIndex = 0;
    document.getElementById(id).appendChild(element);
};

const openOverlay = (text = null, map) => {
    const thinknetMapsOverlay = document.getElementById(`${map.container}-overlay`);
    thinknetMapsOverlay.innerHTML = text;
    thinknetMapsOverlay.classList.remove('hide-overlay');
    thinknetMapsOverlay.classList.add('show-overlay');
};

const closeOverlay = (map) => {
    const thinknetMapsOverlay = document.getElementById(`${map.container}-overlay`);
    thinknetMapsOverlay.classList.remove('show-overlay');
    thinknetMapsOverlay.classList.add('hide-overlay');
};

const handleMobile = (mobileText, map) => {
    const thinknetMapsOverlay = document.getElementById(`${map.container}-overlay`);
    map.on('touchstart', (event) => {
        if (event.points.length < 2) {
            openOverlay(mobileText, map);
            map.dragPan.disable();
        } else {
            closeOverlay(map);
            map.dragPan.enable();
        }
    });
    thinknetMapsOverlay.addEventListener('touchstart', (e) => {
        if (e.touches.length < 2) {
            openOverlay(mobileText, map);
        } else {
            closeOverlay(map);
            map.dragPan.enable();
        }
    });
    map.on('touchend', () => {
        closeOverlay(map);
    });
};

const _onScroll = (map) => {
    if (!map.handler.isOverlayClosed) {
        const textShow = isWin ? winText : macText;
        openOverlay(textShow, map);
    }
};

const keydownAction = (map) => {
    const thinknetMaps = document.getElementById(`${map.container}-canvas`);
    map.handler.isKeyUp = false;
    map.handler.isOverlayClosed = true;
    thinknetMaps.addEventListener('scroll', () => _onScroll(map));
    thinknetMaps.removeEventListener('wheel', () => _onScroll(map));
    closeOverlay(map);
    map.scrollZoom.enable();
};

const _onKeydown = (e,  map) => {
    if (isWin && e.ctrlKey) {
        keydownAction(map);
    } else if (isMac && e.metaKey) {
        keydownAction(map);
    }
};

const keyUpAction = (map) => {
    const thinknetMaps = document.getElementById(`${map.container}-canvas`);
    map.handler.isKeyUp = true;
    thinknetMaps.addEventListener('wheel', () => _onScroll(map));
};

const _onKeyUp = (e, map) => {
    if (isWin && e.which === 17) {
        keyUpAction(map);
    } else if (isMac && e.which === 91) {
        keyUpAction(map);
    }
    map.handler.isOverlayClosed = false;
    map.scrollZoom.disable();
};

const _onMouseOver = (map) => {
    if (map.handler.isKeyUp) map.handler.isOverlayClosed = false;
};

const _onMouseOut = (map) => {
    if (map.handler.isKeyUp) map.handler.isOverlayClosed = true;
    closeOverlay(map);
};

const handleDesktop = (map) => {
    const thinknetMaps = document.getElementById(`${map.container}-canvas`);
    if (isWin || isMac) {
        map.scrollZoom.disable();
        const thinknetMapsOverlay = document.getElementById(`${map.container}-overlay`);
        document.addEventListener('keydown', (e) => _onKeydown(e, map));
        thinknetMaps.addEventListener('scroll', () => _onScroll(map));
        thinknetMaps.addEventListener('wheel', () => _onScroll(map));
        thinknetMaps.addEventListener('mouseover', () => _onMouseOver(map));
        thinknetMapsOverlay.addEventListener('mouseout', () => _onMouseOut(map));
        document.body.addEventListener('keyup', (e) => _onKeyUp(e, map));
    }
};

const clearEventScroll = function () {
    const map = this;
    const thinknetMaps = document.getElementById(`${map.container}-canvas`);
    const thinknetMapsOverlay = document.getElementById(`${map.container}-overlay`);
    document.addEventListener('keydown', (e) => _onKeydown(e, map));
    thinknetMaps.removeEventListener('scroll', () => _onScroll(map));
    thinknetMaps.removeEventListener('wheel', () => _onScroll(map));
    thinknetMaps.addEventListener('mouseover', () => _onMouseOver(map));
    thinknetMapsOverlay.addEventListener('mouseout', () => _onMouseOut(map));
    document.body.addEventListener('keyup', (e) => _onKeyUp(e, map));
};

const disableScroll = function (map) {
    map.handler.isOverlayClosed = false;
    Logger.info(disableScroll.name);
    const mapsCanvasArray = document.getElementsByClassName('mapboxgl-canvas');
    mapsCanvasArray[mapsCanvasArray.length - 1].setAttribute("id", `${map.container}-canvas`);
    overWrite(map);
    initStyle(map);
    handleMobile(mobileText, map);
    handleDesktop(map);
};

export default {
    disableScroll,
    clearEventScroll,
};
