// @flow
import Logger from '../util/Logger';

let isOverlayClosed = 0;
let map = null;
const macText = 'กด ⌘ + Scroll เพื่อซูมแผนที่';
const winText = 'กด Ctrl + Scroll เพื่อซูมแผนที่';
const mobileText = 'ใช้ 2 นิ้วเพื่อเลื่อนแผนที่';

const isWin = navigator.appVersion.includes("Win");
const isMac = navigator.appVersion.includes("Mac");

const overWrite = () => {
    map.dragPan._ignoreEvent = function _ignoreEvent(e) {
        if (map.boxZoom && map.boxZoom.isActive()) { return true; }
        if (map.dragRotate && map.dragRotate.isActive()) { return true; }
        if (e.touches) {
            return (e.touches.length !== 2);
        } else {
            if (e.ctrlKey) return true;
            return e.type !== 'mousemove' && e.button && e.button !== 0; // left button
        }
    };
};

const initStyle = () => {
    const id = map._canvasContainer.offsetParent.id;
    document.getElementsByClassName("mapboxgl-canvas")[0].style.zIndex = 1;

    const element = document.createElement("div");
    element.setAttribute('id', 'thinknetmaps-overlay');
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

const openOverlay = (text = null) => {
    const thinketMapsOverlay = document.getElementById('thinknetmaps-overlay');
    const thinketMaps = document.getElementsByClassName('mapboxgl-canvas')[0];
    thinketMapsOverlay.innerHTML = text;
    thinketMapsOverlay.style.zIndex = 1;
    thinketMapsOverlay.style.opacity = 0.5;
    thinketMaps.style.zIndex = -1;
    thinketMapsOverlay.style.transitionDuration = '0.5s';
};

const closeOverlay = () => {
    const thinketMapsOverlay = document.getElementById('thinknetmaps-overlay');
    const thinketMaps = document.getElementsByClassName('mapboxgl-canvas')[0];
    thinketMapsOverlay.style.zIndex = -1;
    thinketMapsOverlay.style.opacity = 0;
    thinketMaps.style.zIndex = 1;
    thinketMaps.style.transition = 'z-index 0.3s';
    thinketMapsOverlay.style.transitionDuration = '0.3s';
};

const handleMobile = (mobileText) => {
    const thinketMapsOverlay = document.getElementById('thinknetmaps-overlay');
    map.on('touchstart', (event) => {
        if (event.points.length < 2) {
            openOverlay(mobileText);
            map.dragPan.disable();
        } else {
            closeOverlay();
            map.dragPan.enable();
        }
    });
    thinketMapsOverlay.addEventListener('touchstart', (e) => {
        if (e.touches.length < 2) {
            openOverlay(mobileText);
        } else {
            closeOverlay();
            map.dragPan.enable();
        }
    });
    map.on('touchend', () => {
        closeOverlay();
    });
};

const _onScroll = () => {
    if (isOverlayClosed === 1) {
        const textShow = isWin ? winText : macText;
        openOverlay(textShow);
    }
};

const _onKeydown = (e) => {
    if (isWin) {
        if (e.ctrlKey) {
            document.removeEventListener('wheel', _onScroll);
            isOverlayClosed = 1;
            closeOverlay();
            map.scrollZoom.enable();
        }
    } else if (isMac) {
        if (e.metaKey) {
            document.removeEventListener('wheel', _onScroll);
            isOverlayClosed = 1;
            closeOverlay();
            map.scrollZoom.enable();
        }
    }
};

const _onMouseOver = () => {
    isOverlayClosed = 1;
};

const _onMouseOut = () => {
    isOverlayClosed = 0;
    closeOverlay();
};

const _onKeyUp = (e) => {
    if (isWin) {
        if (e.which === 17) {
            document.addEventListener('wheel', _onScroll);
        }
    } else if (isMac) {
        if (e.which === 91) {
            document.addEventListener('wheel', _onScroll);
        }
    }
    isOverlayClosed = 0;
    map.scrollZoom.disable();
};

const handleDesktop = () => {
    const thinketMaps = document.getElementsByClassName('mapboxgl-canvas')[0];
    if (isWin || isMac) {
        map.scrollZoom.disable();
        const thinketMapsOverlay = document.getElementById('thinknetmaps-overlay');
        document.addEventListener('keydown', _onKeydown);
        document.addEventListener('scroll', _onScroll);
        document.addEventListener('wheel', _onScroll);
        thinketMaps.addEventListener('mouseover', _onMouseOver);
        thinketMapsOverlay.addEventListener('mouseout', _onMouseOut);
        document.body.addEventListener('keyup', _onKeyUp);
    }
};

const clearEventScroll = function () {
    const thinketMaps = document.getElementsByClassName('mapboxgl-canvas')[0];
    const thinketMapsOverlay = document.getElementById('thinknetmaps-overlay');
    document.removeEventListener('keydown', _onKeydown);
    document.removeEventListener('scroll', _onScroll);
    document.removeEventListener('wheel', _onScroll);
    thinketMaps.removeEventListener('mouseover', _onMouseOver);
    thinketMapsOverlay.removeEventListener('mouseout', _onMouseOut);
    document.body.removeEventListener('keyup', _onKeyUp);
};

const disableScroll = function (newMap) {
    map = newMap;
    Logger.info(disableScroll.name);
    overWrite();
    initStyle();
    handleMobile(mobileText);
    handleDesktop(winText, macText);
};

export default {
    disableScroll,
    clearEventScroll,
};
