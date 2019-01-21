// Type definitions for thinknetmaps v1.1.0
// Project: https://github.com/thinknetcompany/thinknetmaps
// Definitions by: THiNKNET Maps Company <https://github.com/thinknetcompany>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="geojson" />

export = thinknetmaps;
export as namespace thinknetmaps;

declare namespace thinknetmaps {

    type LngLatLike = LngLat | { lng: number; lat: number; } | { lon: number; lat: number; } | [number, number];
    type Style = 'almond' | 'chathai' | 'charcoal' | 'cloudy' | 'hybrid' | 'ivory' | 'lightsteel' | 'midnight' | 'satellite' | 'spearmint' | 'terrain';
    type LineStyle = { lineWidth: number; color: string; }
    type Anchor = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

    /**
     * Map
     */
    export class Map extends Evented {
        constructor(options?: ThinknetmapOptions);

        setStyle(style: Style): this;

        on(type: string, listener: (ev: any) => void): this;
        once(type: string, listener: (ev: any) => void): this;

        addMarker(options: MarkerOptions): this;

        addPopup(options: AddPopupOptions): this;

        setMarker(id: string, lat: number, lng: number): this;

        removeMarker(id: string): this;

        clearMarker(): this;

        getMarker(id: string): this;

        getAllMarker(): this;

        addMarkerImage(lat: number, lng: number, url: string): this;

        addLine(id: string, coordinates: [number[]], style: LineStyle): this;

        addPolygon(id: string, coordinates: [number[]]): this;

        fitBounds(coordinates: [number[]]): this;

        removeSource(id: string): this;

        removeLayer(id: string): this;

        getLayer(id: string): Layer;

        setLayoutProperty(layer: string, name: string, value: any): this;
    }

    export interface ThinknetmapOptions {
        /** Id which rendered. */
        container?: string;

        /** App id of THiNKNET Maps plateform. */
        app_id: string;

        /** Api key of THiNKNET Maps plateform. */
        api_key: string;

        /** Initial map center. */
        center?: LngLatLike;

        /** aoom of map. */
        zoom?: number;

        /** If true, Enable navigation controller. */
        navigationCtrl?: boolean;

        /** If true, Enable protected scroll. */
        protectScroll?: boolean;

        /** Style of map. */
        style?: Style;
    }

    export interface MarkerOptions {
        /** Id of marker. */
        id: string;

        /** Number of latitude. */
        lat: number;

        /** Number of Longitude. */
        lng: number;

        /** Distance between icon and marker. */
        offset: number[];

        /** Click event listener function. */
        onClick: Function;

        /** Html of icon. */
        icon: string;

        /** If true, Enable moving marker feature. */
        draggable: boolean;

        /** Drag end event listener function. */
        onDragEnd: Function;

        /** Popup options. */
        popup: MarkerPopupOptions;

    }

    export interface MarkerPopupOptions {
        /** Description content of marker. */
        description: string;

        /** Event for open popup. */
        action: string;

        /** Distance between popup and marker. */
        offset: number[];
    }

    export interface AddPopupOptions {
        /** Marker ID which you want to add popup to. */
        id: string;

        /** Description content of marker. */
        description: string;

        /** Event for open popup. */
        action: string;

        /** Distance between popup and marker. */
        offset: number[];
    }

    export interface Layer {
        id: string;
        type?: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';

        metadata?: any;
        ref?: string;

        source?: string;

        'source-layer'?: string;

        minzoom?: number;
        maxzoom?: number;

        interactive?: boolean;

        filter?: any[];
    }

    /**
     * Popup
     */
    export class Popup extends Evented {
        constructor(options?: PopupOptions);

        addTo(map: Map): this;

        isOpen(): boolean;

        remove(): this;

        getLngLat(): LngLat;

        setLngLat(lnglat: LngLatLike): this;

        setText(text: string): this;

        setHTML(html: string): this;

        setDOMContent(htmlNode: Node): this;
    }

    /**
     * LngLat
     */
    export class LngLat {
        lng: number;
        lat: number;

        constructor(lng: number, lat: number);

        /** Return a new LngLat object whose longitude is wrapped to the range (-180, 180). */
        wrap(): LngLat;

        /** Return a LngLat as an array */
        toArray(): number[];

        /** Return a LngLat as a string */
        toString(): string;

        static convert(input: LngLatLike): LngLat;
    }

    export interface PopupOptions {
        closeButton?: boolean;

        closeOnClick?: boolean;

        anchor?: Anchor;

        offset?: number;

        className?: string;
    }

    /**
     * Evented
     */
    export class Evented {
        on(type: string, listener: Function): this;

        off(type?: string | any, listener?: Function): this;

        once(type: string, listener: Function): this;

        // https://github.com/mapbox/mapbox-gl-js/issues/6522
        fire(type: string, properties?: { [key: string]: any }): this;
    }

}
