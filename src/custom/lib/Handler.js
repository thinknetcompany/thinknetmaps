/* eslint-disable no-undef */
// @flow
import Logger from '../util/Logger';

const isOverlayClosed = {};
const isKeyUp = {};
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

const initStyle = (container, map) => {
    const id = map._canvasContainer.offsetParent.id;
    document.getElementById(`${container}-canvas`).style.zIndex = 1;

    const element = document.createElement("div");
    element.setAttribute('id', `${container}-overlay`);
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
    document.getElementById(id).appendChild(element);
};

const openOverlay = (text = null, container) => {
    const thinketMapsOverlay = document.getElementById(`${container}-overlay`);
    const thinketMaps = document.getElementById(`${container}-canvas`);
    thinketMapsOverlay.innerHTML = text;
    thinketMapsOverlay.style.zIndex = 1;
    thinketMapsOverlay.style.opacity = 0.5;
    thinketMaps.style.zIndex = -1;
    thinketMapsOverlay.style.transitionDuration = '0.5s';
};

const closeOverlay = (container) => {
    const thinketMapsOverlay = document.getElementById(`${container}-overlay`);
    const thinketMaps = document.getElementById(`${container}-canvas`);
    thinketMapsOverlay.style.zIndex = -1;
    thinketMapsOverlay.style.opacity = 0;
    thinketMaps.style.zIndex = 1;
    thinketMaps.style.transition = 'z-index 0.3s';
    thinketMapsOverlay.style.transitionDuration = '0.3s';
};

const handleMobile = (mobileText, container, map) => {
    const thinketMapsOverlay = document.getElementById(`${container}-overlay`);
    map.on('touchstart', (event) => {
        if (event.points.length < 2) {
            openOverlay(mobileText, container);
            map.dragPan.disable();
        } else {
            closeOverlay(container);
            map.dragPan.enable();
        }
    });
    thinketMapsOverlay.addEventListener('touchstart', (e) => {
        if (e.touches.length < 2) {
            openOverlay(mobileText, container);
        } else {
            closeOverlay(container);
            map.dragPan.enable();
        }
    });
    map.on('touchend', () => {
        closeOverlay(container);
    });
};

const _onScroll = (container) => {
    if (!isOverlayClosed[container]) {
        const textShow = isWin ? winText : macText;
        openOverlay(textShow, container);
    }
};

const _onKeydown = (e, container, map) => {
    const thinketMaps = document.getElementById(`${container}-canvas`);
    if (isWin) {
        if (e.ctrlKey) {
            isKeyUp[container] = false;
            isOverlayClosed[container] = true;
            thinketMaps.addEventListener('scroll', () => _onScroll(container));
            thinketMaps.removeEventListener('wheel', () => _onScroll(container));
            closeOverlay(container);
            map.scrollZoom.enable();
        }
    } else if (isMac) {
        if (e.metaKey) {
            isKeyUp[container] = false;
            isOverlayClosed[container] = true;
            thinketMaps.addEventListener('scroll', () =>  _onScroll(container));
            thinketMaps.removeEventListener('wheel', () => _onScroll(container));
            closeOverlay(container);
            map.scrollZoom.enable();
        }
    }
};

const _onKeyUp = (e, container, map) => {
    const thinketMaps = document.getElementById(`${container}-canvas`);
    if (isWin) {
        if (e.which === 17) {
            isKeyUp[container] = true;
            thinketMaps.addEventListener('wheel', () => _onScroll(container));
        }
    } else if (isMac) {
        if (e.which === 91) {
            isKeyUp[container] = true;
            thinketMaps.addEventListener('wheel', () => _onScroll(container));
        }
    }
    isOverlayClosed[container] = false;
    map.scrollZoom.disable();
};

const _onMouseOver = (container) => {
    isOverlayClosed[container] = true;
};

const _onMouseOut = (container) => {
    if (isKeyUp[container]) isOverlayClosed[container] = false;
    closeOverlay(container);
};

const handleDesktop = (container, map) => {
    const thinketMaps = document.getElementById(`${container}-canvas`);
    if (isWin || isMac) {
        map.scrollZoom.disable();
        const thinketMapsOverlay = document.getElementById(`${container}-overlay`);
        document.addEventListener('keydown', (e) => _onKeydown(e, container, map));
        thinketMaps.addEventListener('scroll', () => _onScroll(container));
        thinketMaps.addEventListener('wheel', () => _onScroll(container));
        thinketMaps.addEventListener('mouseover', _onMouseOver);
        thinketMapsOverlay.addEventListener('mouseout', () => _onMouseOut(container));
        document.body.addEventListener('keyup', (e) => _onKeyUp(e, container, map));
    }
};

const clearEventScroll = () => {
    const map = this;
    const thinketMaps = document.getElementById(`${container}-canvas`);
    const thinketMapsOverlay = document.getElementById(`${container}-overlay`);
    document.addEventListener('keydown', (e) => _onKeydown(e, container, map));
    thinketMaps.removeEventListener('scroll', () => _onScroll(container));
    thinketMaps.removeEventListener('wheel', () => _onScroll(container));
    thinketMaps.addEventListener('mouseover', () => _onMouseOver(container));
    thinketMapsOverlay.addEventListener('mouseout', () => _onMouseOut(container));
    document.body.addEventListener('keyup', (e) => _onKeyUp(e, container, map));
};

const disableScroll = function (map, container) {
    isOverlayClosed[container] = false;
    Logger.info(disableScroll.name);
    const mapsCanvasArray = document.getElementsByClassName('mapboxgl-canvas');
    mapsCanvasArray[mapsCanvasArray.length - 1].setAttribute("id", `${container}-canvas`);
    overWrite(map);
    initStyle(container, map);
    handleMobile(mobileText, container, map);
    handleDesktop(container, map);
};

export default {
    disableScroll,
    clearEventScroll,
};
