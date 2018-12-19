// @flow
import DOM from '../../util/dom';
/**
 * 
 * @param {String} appID App ID from https://developer-maps.thinknet.co.th
 * @param {String} apiKey API key from https://developer-maps.thinknet.co.th
 * @param {boolean} [valid=true] check if App ID and API key are invalid
 */
const alertMissingKey = (appID, apiKey, valid = true) => {
    if ((!appID || !apiKey) || !valid) {
        const errorMessage = (!valid) ? `Error: App ID or API key are invalid` :
            `Error: App ID and API Key should be provided for THINKNET Maps`;
        document.getElementsByClassName('mapboxgl-canvas')[0].remove();
        const container = document.getElementsByClassName('mapboxgl-map')[0];
        const alertMessage1 = DOM.create('p', 'mapboxgl-error');
        alertMessage1.innerHTML = errorMessage;
        const alertMessage2 = DOM.create('p', 'mapboxgl-error');
        alertMessage2.innerHTML = `Get your key at <a href="https://developer-maps.thinknet.co.th">https://developer-maps.thinknet.co.th</a>`;
        container.appendChild(alertMessage1);
        container.appendChild(alertMessage2);
    }
};

export default {
    alertMissingKey
};
