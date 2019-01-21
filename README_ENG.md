# THiNKNET Maps

![THiNKNET Maps Logo](/static/image/logo_thinknet_maps.png)

**thinknetmaps Library** Build digital map in website based on javascript. There are many function to render, interact and adjustable map style over 10 styles.

**Official Site** : [https://maps.thinknet.co.th](https://maps.thinknet.co.th)

**For Developers** : [https://developer-maps.thinknet.co.th](https://developer-maps.thinknet.co.th)
for manage your API key and retrieve access to THiNKNET Maps on your application.

**More examples**: [DEMO](https://demo-maps.thinknet.co.th)

## :mega: Upcoming Releases

- [ ] Improves addLine function
- [ ] Adjust shape of line and polygon

## :pushpin: Release Notes 1.1.0

- [x] Better Marker and Popup event listener manipulation
- [x] Enable to get layer and source of Marker by put its id
- [x] Enable to get layer and source of all Marker
- [x] Enable to remove Marker by ID
- [x] addMarkerArray function are deprecated
- [x] addMarkerImageArray function are deprecated
- [x] Syntax autocomplete
- [x] Moved marker's description into popup option
- [x] Enable to add popup to marker by id
- [x] Fixed a map can't use when running many maps on a single page
- [x] Fixed THiNKNET Maps logo don't display when running many maps on a single page

## :clipboard: Features

- [Get Started](#get-started)
- [Language options](./wiki/en/MAPSTYLE.md#%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%9A%E0%B8%99%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88)
- [Map Style](#map-style)
  - [Change Map Style](#change-map-style)
- [Scrolling protection](#protected-scrolling)
- [Marker](#marker)
- [Geometry](#geometry)
- [API Document](#)
  - [Search](./wiki/en/API_SEARCH.md)
  - [Suggest](./wiki/en/API_SUGGEST.md)
  - [Reverse Geocoding](./wiki/en/API_REVERSE_GEOCODING.md)
  - [Public Transport Routing](./wiki/en/API_PUBLIC_TRANSPORT_ROUTING.md)
  - [Static Data](./wiki/en/API_STATIC_DATA.md)

## :inbox_tray: Install THiNKNET Maps

### via NPM

```shell
$ npm install thinknetmaps --save
```

Then import `thinknetmaps` into project

```javascript
const thinknetmaps = require('thinknetmaps')
require('node_modules/thinknetmaps/dist/thinknetmaps.css')
```

---

### Alternatively, download from THiNKNET server to embed on HTML

```html
<script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0.min.css' rel='stylesheet' />
```

## :electric_plug: Get started with THiNKNET Maps API

<a name="get-started"></a>

### Create map

Create div to make render area for map, but you should have both of `app_id` and `api_key` before using THiNKNET Maps (Create both from
 [THiNKNET Maps](https://developer-maps.thinknet.co.th))

```html
<html>
  <head>
    <script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0.min.js'></script>
    <link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0.min.css' rel='stylesheet' />
  </head>
  <body>
    <div id="map" style="height: 100vh;" />
    <script>
      const map = new thinknetmaps.Map({
        container: 'map',
        app_id: 'YOUR_APP_ID',
        api_key: 'YOUR_API_KEY',
      })
    </script>
  </body>
</html>
```

Map's `container` option and `div` ID should be the same name. Otherwise, it can be the other name.

### THiNKNET Maps options

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| app_id | Your application ID | string | - |
| api_key | Your API Key | string | - |
| center | Location of center point on initial map | object | { lng: 100.49, lat: 13.72 } |
| zoom | Zoom level on initial map (from 1 to 22) | number | 9 |
| navigationCtrl | Display navigator bar for adjust viewpoint | boolean | false |
| protectScroll | Prevent scrolling on map | boolean | false |
| style | Map style | string | ivory |

To use map function, each function must called on event `map.on('load', function...)`. See example below

```javascript
map.on('load', function() {
  ...
})
```

<a name="map-style"></a>

### Map Styles

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

<a name="change-map-style"></a>

#### Change map style

You can change map style in 2 ways

##### via map create option

```javascript
const map = new thinknetmaps.Map({
  container: 'map', // div's id for render map
  app_id: 'YOUR_APP_ID',
  api_key: 'YOUR_API_KEY',
  style: 'MAP_STYLE'
})
```

##### via `.setStyle(style)` function

```javascript
map.setStyle('satellite')
```

---

#### Protected Scrolling

![protected scrolling](/static/image/protected-scroll.png)

```javascript
const map = new thinknetmaps.Map({
  container: 'map',
  app_id: 'YOUR_APP_ID',
  api_key: 'YOUR_API_KEY',
  protectScroll: true,
});
```

---

### Marker

- [addMarker](#add-marker)
- [addMarkerImage](#add-marker-image)
- [addMarker with popup](#add-marker-with-popup)
- [setMarker](#set-marker)
- [removeMarker](#remove-marker)
- [clearMarker](#clear-marker)
- [getMarker](#get-marker)
- [getAllMarker](#get-markers)

<a name="add-marker"></a>

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
        alert('Bang Bon truck')
    }
  })
})
```

###### Icon Marker

Set marker appearance as icon from THiNKNET Maps provided icon

![styled marker](/static/image/custom-marker.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    icon: 'mmg_car_2_orange',
  })
})
```

<a name="add-marker-image"></a>

##### map.addMarkerImage(options)

Set marker appearance as image from user URL

| Property | Description | Type | Default |
|--|--|--|--|
| url | image's URL | string | - |

![Image marker](/static/image/image-marker-example.png)

```javascript
map.on('load', function() {
  map.addMarkerImage({
    lat: 13.72,  // require
    lng: 100.20, // require
    url: 'YOUR IMAGE'
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
    icon: 'mmg_car_2_orange',
    popup: {
      action: 'click'
      description: 'Bangbon 6 wheels drive',
    }
  })
}
```

<a name="add-popup"></a>

#### map.addPopup(options)

| Property | Description | Type | Default |
|--|--|--|--|
| id | Marker's ID which popup would appear | string | - |
| description | Popup text | string | - |
| action | Which event that popup appears. Available options are `click` and `hover` | string | click |
|offset| Popup offset from marker coordinate (px) | number[] | [0, 0] |

##### add Popup to Marker through map function (.addPopup)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    icon: 'mmg_car_2_orange'
  })

  map.addPopup({
    id: 'bangbon',
    action: 'click',
    description: 'Bangbon 6 wheels drive'
  })
}
```

---

<a name="set-marker"></a>

#### map.setMarker(options)

Set marker's coordinate

| Property | Description | Type | Default |
|--|--|--|--|
| id | Marker's id that you want to updated location | string | - |
| lat | Latitude | number | - |
| lng | Longitude | number | - |

##### Example

HTML

```html
<select id="selected-value">
  <option value="100.61,13.66">Bang Na</option>
  <option value="100.49,13.65">Bang Mot</option>
  <option value="100.39,13.66">Bang Bon</option>
</select>
```

Javascript

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lng: 100.61,
    lat: 13.66,
    icon: 'mmg_car_2_orange',
    onClick: function() {
      alert('Bang Bon 6 wheels truck')
    }
  })

  document.getElementById('selected-value').addEventListener('change', function(val) {
    const lngLat = val.target.value.split(',')
    console.log(lngLat)
    map.setMarker({
      id: 'bangbon',
      lng: lngLat[0],
      lat: lngLat[1],
    })
  })
}
```

<a name="remove-marker"></a>

#### map.removeMarker(id) ลบ Marker

| Property | Description | Type | Default |
|--|--|--|--|
| id | Marker ID for remove | string | - |

![Remove Marker](/static/image/remove-marker.gif)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    offset: [0, -10],
    size: 1.9,
    icon: 'mmg_car_2_orange',
    onClick: () => {
        map.removeMarker('bangbon')
      }
    })

  map.addMarker({
    id: 'bangkhae',
    lat: 13.74,
    lng: 100.40,
    icon: 'mmg_car_2_orange',
    onClick: () => {
      map.removeMarker('bangkhae')
    }
  })

  map.addMarker({
      id: 'shop',
      lat: 13.7,
      lng: 100.35,
      onClick: () => {
        map.removeMarker('shop')
      }
  });
})
```

<a name="clear-marker"></a>

#### map.clearMarker()

Clear all marker in the map

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    offset: [0, -10],
    size: 1.9,
    icon: 'mmg_car_2_orange',
    onClick: () => {
        map.removeMarker('bangbon')
      }
    })

  map.addMarker({
    id: 'bangkhae',
    lat: 13.74,
    lng: 100.40,
    icon: 'mmg_car_2_orange',
    onClick: () => {
      map.removeMarker('bangkhae')
    }
  })

  map.addMarker({
      id: 'shop',
      lat: 13.7,
      lng: 100.35,
      onClick: () => {
        map.removeMarker('shop')
      }
  })

  map.clearMarker() // remove all marker
})
```

<a name="get-marker"></a>

#### map.getMarker(id)

Get marker's property from provided ID

| Property | Description | Type | Default |
|--|--|--|--|
| id | Marker's ID | string | - |

<a name="get-markers"></a>

#### map.getAllMarker()

Get all marker's property

---

### Geometry

- [addLine](#add-line)
- [addPolygon](#add-polygon)

<a name="add-line"></a>

#### map.addLine(options)

Draw graphic lines to the map

| Property | Description | Type | Default |
|--|--|--|--|
| id | identity id foreach line ( unique ) | string | (random id) |
| coordinates | array of coordinate ( at least 1 point ) | array(number[]) | - |
| style | style of line | object | - |

##### Line style

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

<a name="add-polygon"></a>

#### map.addPolygon(options)

Draw graphical polygon shape to the map

| Property | Description | Type | Default |
|--|--|--|--|
| id | identity id foreach polygon ( unique ) | string | (random id) |
| coordinates | array of coordinate ( at least 2 point ) | array(number[]) | - |

To create polygon, You should put array of coordinate by order

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
    <script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0.min.css' rel='stylesheet' />
  </head>
  <body>
    <div id="map" style="height: 100vh;"></div>
    <script>
        const map = new thinknetmaps.Map({
            container: 'map',
            app_id: 'YOUR_APP_ID',
            api_key: 'YOUR_API_KEY'
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
