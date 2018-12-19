![THiNKNET Maps Logo](/static/image/logo_thinknet_maps.png)

# thinknetmaps

**Map GL Library** for build digital map on website by Javascript. There are many function to display, interact and adjustable map style up to 10 styles.

**Official Site**: https://maps.thinknet.co.th

**For Developers**: https://developer-maps.thinknet.co.th for manage your API key and retrieve access to THiNKNET Maps on your application

**Explore an example**: [DEMO](https://demo-maps.thinknet.co.th)

## :mega: Upcoming Releases
- [ ] Improves addLine and addMarker function
- [ ] Adjust shape of line and polygon
- [ ] getMarker function
- [ ] Snippets

## :pushpin: Release Notes 1.0.0
- [x] Fix show overlay hint when scrolling 
- [x] Fix logger error problem

## Features
* [Display map on website](#-get-start-with-thinknetmaps-api)
* [Select language in map](./wiki/en/MAPSTYLE.md#choose-maps-language)
* [Map Style](#map-style)
    * [Change Map Style](#change-map-style)
* [Protect scroll map](#protected-scrolling)
* [Marker](#marker)
    * [Add marker](#add-marker-to-map)
    * [Icon marker](#icon-marker)
    * [Draggable Marker](#draggable-marker)
    * [Add popup to marker](#add-popup-to-marker)
    * [Re-location marker](#mapsetmarkeroptions-re-location-marker)
* [Geometry](#geometry)
    * [Add line](#mapaddlineoptions-draw-line)
    * [Add polygon](#mapaddpolygonoptions-draw-polygon)
* [API Document](#API-Document)
    * [Search](./wiki/en/API_SEARCH.md)
    * [Suggest](./wiki/en/API_SUGGEST.md)
    * [Reverse Geocoding](./wiki/en/API_REVERSE_GEOCODING.md)
    * [Public Transport Routing](./wiki/en/API_PUBLIC_TRANSPORT_ROUTING.md)
    * [Static Data](./wiki/en/API_STATIC_DATA.md)
  
## :inbox_tray: Install THiNKNET Maps
#### Install via NPM

Install Dependencies

```shell
$ npm install thinknetmaps --save
```

Then `import thinknetmaps` into project

```javascript
const thinknetmaps = require('thinknetmaps')
require('node_modules/thinknetmaps/dist/thinknetmaps.css')
```
---

#### Or download from thinknet server for using on HTML

```html
<script src='https://api-maps.thinknet.co.th/thinknetmaps/1.0.0/js/thinknetmaps.js'></script>
<link href='https://api-maps.thinknet.co.th/thinknetmaps/1.0.0/css/thinknetmaps.css' rel='stylesheet' />
```


## :electric_plug: Get start with THiNKNET Maps API
### Initial map

Create `<div id="YOUR_MAP">` for render map on website, but you should have both of `api_key` and `app_id` before using THiNKNET Maps (you can create both from [THiNKNET Maps](https://developer-maps.thinknet.co.th))

```html
<html>
  <head>
    <script src='https://api-maps.thinknet.co.th/thinknetmaps/1.0.0/js/thinknetmaps.js'></script>
    <link href='https://api-maps.thinknet.co.th/thinknetmaps/1.0.0/css/thinknetmaps.css' rel='stylesheet' />
  </head>
  <body>
    <div id="map" style="height: 100vh;" />
    <script>
      const map = new thinknetmaps.Map({
        container: 'map', // div's id for render map
        app_id: 'YOUR_APP_ID',
        api_key: 'YOUR_APP_ID',
      })
    </script>
  </body>
</html>
```
*`<div id="YOUR_MAP">` and `container: "YOUR_MAP"` should be the same name*

### THiNKNET Maps initial options
| Property | Description | Type | Default |
|----------|-------------|------|---------|
| container | Container ID for render map | string | map |
| app_id | Your application ID | string | - |
| api_key | Your API Key | string | - |
| center | Location of center point on initial map | object | { lng: 100.49, lat: 13.72 } |
| zoom | Zoom level on initial map (from 1 to 22) | number | 9 |
| navigationCtrl | Display navigator bar for adjust viewpoint | boolean | false |
| protectScroll | Prevent scrolling on map | boolean | false
| style | Map style | string | ivory

To use map function, each function must called on event `map.on('load', function...)` e.g.
```javascript
map.on('load', function() {
  ...
})
```

### Map style

#### Style List
- [Almond](./wiki/en/MAPSTYLE.md#almond)
- [Cha thai](./wiki/en/MAPSTYLE.md#cha-thai)
- [Charcoal](./wiki/en/MAPSTYLE.md#charcoal)
- [Cloudy](./wiki/en/MAPSTYLE.md#cloudy)
- [Hybrid](./wiki/en/MAPSTYLE.md#hybrid)
- [Ivory](./wiki/en/MAPSTYLE.md#ivory)
- [Lightsteel](./wiki/en/MAPSTYLE.md#lightsteel)
- [Midnight](./wiki/en/MAPSTYLE.md#midnight)
- [Satellite](./wiki/en/MAPSTYLE.md#satellite)
- [Spearmint](./wiki/en/MAPSTYLE.md#spearmint)
- [Terrain](./wiki/en/MAPSTYLE.md#terrain)

![map style satellite](/static/image/map-style/satellite.png)

#### Change Map Style

You can change map style in 2 ways

##### via Initial map

```javascript
const map = new thinknetmaps.Map({
  container: 'map', // div's id for render map
  app_id: 'YOUR_APP_ID',
  api_key: 'YOUR_APP_ID',
  style: 'MAP_STYLE'
})
```

##### via Function

```javascript
map.setStyle('satellite')
```
---

#### Protected Scrolling

![protected scrolling](/static/image/protected-scroll.png)

```javascript
const map = new thinknetmaps.Map({
  container: 'map',
  app_id: '<YOUR_APP_ID>',
  api_key: '<YOUR_API_KEY>',
  protectScroll: true,
});
```
---

### Marker
#### map.addMarker(options)
| Property | Description | Type | Default |
|--|--|--|--|
| id | Define ID for each marker (DO NOT USE DUPLICATE NAME) | string | (Random ID) |
| lat | Marker's latitude | number | - |
| lng | Marker's longitude | number | - |
| offset | Icon offset from marker coordinate (px) | number[] | [0, 0] |
| onClick | Callback event when clicked | function | - |
| icon | Change marker icon | string | - |
| draggable | Make marker to be draggable | boolean | false |
| onDragEnd | Callback event when drag finished | function | - |
| popup | Show [Popup](#mapaddmarkeroptions-with-popup) on Marker | object | - |

###### Add marker to map

![simple marker](/static/image/marker.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    offset: [0, -10],
    onClick: function() {
        alert('Bang Bon 6 wheels truck')
    }
  })
})
```

###### Icon Marker
![styled marker](/static/image/custom-marker.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    icon: 'tn_car_2_orange',
  })
})
```

###### Draggable Marker
![draggable marker](/static/image/draggable-marker.gif)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.50,
    lng: 100.49,
    draggable: true,
    onClick: function(e) {
      const {lng, lat} = e.lngLat
      alert(`you are at [${lng}, ${lat}]`)
    }
  })

  map.addMarker({
    id: 'bangbon1',
    lat: 13.45,
    lng: 100.79,
    draggable: true,
    onDragEnd: function(e) {
      const {lng, lat} = e.lngLat
      alert(`you are at [${lng}, ${lat}]`)
    }
  })
}
```

---

#### map.addMarker(options) with Popup
| Property | Description | Type | Default |
|--|--|--|--|
| description | Popup text | string | - |
| action | Which event that popup appears. Available options are `click` and `hover` | string | click |
|offset| Popup offset from marker coordinate (px) | number[] | [0, 0] |

###### Add popup to Marker
![marker's popup](/static/image/popup.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    icon: 'tn_car_2_orange',
    description: 'Bangbon 6 wheels drive',
    popup: {
      action: 'click'
    }
  })
}
```

#### map.setMarker(options) Re-location Marker
| Property | Description | Type | Default |
|--|--|--|--|
| id | Marker's id that need to updated location | string | - |
| lat | latitude of Marker | number | - |
| lng | longitude of Marker | number | - |

###### Example

HTML
```html
<select id="selected-value">
  <option value="100.61,13.66">Bang Na</option>
  <option value="100.49,13.65">Bang Mot</option>
  <option value="100.39,13.66">Bang Bon</option>
</select>
```
javascript

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'truck',
    lng: 100.61,
    lat: 13.66,
    icon: 'tn_car_2_orange',
    onClick: function() {
      alert('Bang Bon 6 wheels truck')
    }
  })

  document.getElementById('selected-value').addEventListener('change', function(val) {
    const lngLat = val.target.value.split(',')
    console.log(lngLat)
    map.setMarker({
      id: 'truck',
      lng: lngLat[0],
      lat: lngLat[1],
    })
  })
}
```

----
#### map.addMarkerImage(options) add marker with image
| Property | Description | Type | Default |
|--|--|--|--|
| url | url of picture | string | - |

![Image marker](/static/image/image-marker-example.png)

```javascript
map.on('load', function() {
  map.addMarkerImage({
    lat: 13.72,  // require
    lng: 100.20, // require
    url: '<your image>'
  })
})
```
---

### Geometry
#### map.addLine(options) draw line
| Property | Description | Type | Default |
|--|--|--|--|
| id | identity id foreach line ( unique ) | string | (random id) |
| coordinates | array of coordinate ( at least 1 point ) | array(number[]) | - |
| style | style of line | object | - |

###### Line style
| Property | Description | Type | Default |
|--|--|--|--|
| lineWidth | width of line | number | - |
| color | color of line | string | - |

Example Draw line with location (lng, lat) into Array 
![draw line](/static/image/line.png)

```javascript
map.on('load', function() {
  map.addLine({
    id: 'phra-pradaeng',
    coordinates: [
      [100.47644313104138, 13.681937298079163],
      [100.48129943712564, 13.675842487108369],
      [100.50780677440406, 13.67191026727113],
      [100.5265613225339, 13.693628535272623],
      [100.54052320248576, 13.69873993645703],
      [100.55559187760178, 13.719054839020814]
    ],
    style: {
      lineWidth: 5,
    }
  })

  map.addLine({
    id: 'rama-9',
    coordinates: [
      [100.58888632828723, 13.630326416375254],
      [100.59795464990867, 13.599711115944729],
      [100.61036393209162, 13.589969053546099],
      [100.60415929098656, 13.573731393137876],
      [100.63947801727284, 13.52547579371847]
    ],
    style: {
      color: '#000FF0'
    }
  })
}
```

#### map.addPolygon(options) draw Polygon
| Property | Description | Type | Default |
|--|--|--|--|
| id | identity id foreach polygon ( unique ) | string | (random id) |
| coordinates | array of coordinate ( at least 2 point ) | array(number[]) | - |
draw polygon by adding array of coordinate with order

![draw polygon](/static/image/polygon.png)

```javascript
map.on('load', function() {
  map.addPolygon({
    id: 'city-district',
    coordinates:[
      [100.5182085132937, 13.810625871384914],
      [100.49004639314808, 13.757788616172789],
      [100.51436822418873, 13.739137321964094],
      [100.54829077800093, 13.713644819353718],
      [100.58093323543875, 13.787627594325201],
      [100.5521310671059, 13.833621879410586]
    ]
  })
}
```
---

## :bulb: Code Example
```html
<html>
  <head>
    <title>DEMO</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api-maps.thinknet.co.th/thinknetmaps/1.0.0/js/thinknetmaps.js'></script>
    <link href='https://api-maps.thinknet.co.th/thinknetmaps/1.0.0/css/thinknetmaps.css' rel='stylesheet' />
  </head>
  <body>
    <div id="map" style="height: 100vh;"></div>
    <script>
        const map = new thinknetmaps.Map({
            container: 'map',
            app_id: '<YOUR_APP_ID>',
            api_key: '<YOUR_API_KEY>'
        });

        map.on('load', function() {
          map.addMarker({
            id: 'bangbon',
            lat: 13.72,
            lng: 100.49,
            onClick: function() {
                alert('Bang Bon 6 wheels truck')
            }
          })

          map.addPolygon({
            id: 'city-district',
            coordinates:[
              [100.5182085132937, 13.810625871384914],
              [100.49004639314808, 13.757788616172789],
              [100.51436822418873, 13.739137321964094],
              [100.54829077800093, 13.713644819353718],
              [100.58093323543875, 13.787627594325201],
              [100.5521310671059, 13.833621879410586]
            ]
          })
        })
    </script>
  </body>
</html>
```