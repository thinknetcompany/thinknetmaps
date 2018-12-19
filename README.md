![THiNKNET Maps Logo](https://s3-ap-southeast-1.amazonaws.com/thinknet-maps-resource/common-mapmagic-image/logo_thinknet_maps.png)

# THINKNET Maps

**thinknetmaps Library** สำหรับการใช้งานแผนที่ดิจิตอลบนเว็บไซต์ด้วย Javascript 
มีฟังก์ชันรองรับการแสดงผล และ Interaction บนแผนที่ พร้อมกับ Map Style ที่มีให้เลือกใช้กว่า 10 แบบ

**Official Site** : https://maps.thinknet.co.th

**For Developers** : https://developer-maps.thinknet.co.th
สำหรับจัดการ API Key และรับสิทธิ์การเข้าถึง THiNKNET Maps บน Application ของคุณ

**ดูตัวอย่างเพิ่มเติมได้ที่**: [DEMO](https://demo-maps.thinknet.co.th)


## :mega: Upcoming Releases
- [ ] ปรับปรุงฟังก์ชัน addLine และ addMarker
- [ ] แก้ไขรูปทรงของ line และ polygon ได้
- [ ] ฟังก์ชัน getMarker
- [ ] Snippets

## :pushpin: Release Notes 1.0.0
- [x] แก้ให้ overlay แสดงเมื่อมีการ scroll
- [x] แก้ไข logger ใช้งานไม่ได้

## :clipboard: Features
* [แสดงแผนที่บนเว็ปไซต์](#-เริ่มใช้งาน-thinknetmaps-api)
* [การกำหนดการแสดงภาษาบนแผนที่](./wiki/th/MAPSTYLE.md#%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%9A%E0%B8%99%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88)
* [Map Style](#map-style)
  * [เปลี่ยน Map Style](#%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99-map-style)
* [Scroll protection](#protected-scrolling)
* [Marker](#marker)
  * [เพิ่ม Marker](#%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1-marker-%E0%B8%A5%E0%B8%87%E0%B8%9A%E0%B8%99%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88)
  * [ปรับแต่ง Marker](#icon-marker)
  * [เพิ่ม Popup บน Marker](#%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1-popup-%E0%B8%A5%E0%B8%87%E0%B9%83%E0%B8%99-marker)
  * [เปลี่ยนตำแหน่ง Marker](#mapsetmarkeroptions-%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%95%E0%B8%B3%E0%B9%81%E0%B8%AB%E0%B8%99%E0%B9%88%E0%B8%87-marker)
  * [Marker แบบลากวาง](#draggable-marker)
  * [Image Marker](#mapaddmarkerimageoptions-%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1-marker-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%A0%E0%B8%B2%E0%B8%9E)
* [Geometry](#geometry)
  * [Line](#mapaddlineoptions-%E0%B8%A7%E0%B8%B2%E0%B8%94%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A5%E0%B8%87%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88)
  * [Polygon](#mapaddpolygonoptions-%E0%B8%A7%E0%B8%B2%E0%B8%94-polygon)
* [API Document](#API-Document)
  * [Search](./wiki/th/API_SEARCH.md)
  * [Suggest](./wiki/th/API_SUGGEST.md)
  * [Reverse Geocoding](./wiki/th/API_REVERSE_GEOCODING.md)
  * [Public Transport Routing](./wiki/th/API_PUBLIC_TRANSPORT_ROUTING.md)
  * [Static Data](./wiki/th/API_STATIC_DATA.md)


## :inbox_tray: ติดตั้ง THINKNET Maps
#### ติดตั้งผ่าน NPM

ติดตั่ง dependencies

```shell
$ npm install thinknetmaps --save
```

จากนั้น `import thinknetmaps` เข้าสู่โปรเจค

```javascript
const thinknetmaps = require('thinknetmaps')
require('node_modules/thinknetmaps/dist/thinknetmaps.css')
```
---

#### หรือดาวน์โหลดจาก THINKNET Maps Server สำหรับใช้บน HTML

```html
<script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.0.0.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.0.0.min.css' rel='stylesheet' />
```


## :electric_plug: เริ่มใช้งาน THINKNET Maps API
### เริ่มต้นสร้างแผนที่

สร้าง div สำหรับเป็นพื้นที่ให้ render map ลงบนหน้าเว็ป และก่อนที่จะใช้ THINKNET Maps คุณต้องทำการสร้าง `app_id` และ `api_key` จาก [THiNKNET Maps](https://developer-maps.thinknet.co.th)
เพื่อนำมาใช้งานกับแผนที่ของคุณ

```html
<html>
  <head>
    <script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.0.0.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.0.0.min.css' rel='stylesheet' />
  </head>
  <body>
    <div id="map" style="height: 100vh;" />
    <script>
      const map = new thinknetmaps.Map({
        container: 'map', // id ของ div ที่จะให้ map ไป render
        app_id: 'YOUR_APP_ID',
        api_key: 'YOUR_API_KEY',
      })
    </script>
  </body>
</html>
```

ชื่อของ container จะต้องตรงกับ id ของ div ที่ใช้แสดงแผนที่ และคุณก็สามารถใช้ชื่อ container อื่นๆได้เช่นกัน
### THiNKNET Maps initial options
| Property | Description | Type | Default |
|----------|-------------|------|---------|
| container | id ของ container ที่จะใช้ render map | string | map |
| app_id | Application ID ของคุณ | string | - |
| api_key | API Key ของคุณ | string | - |
| center | จุดเริ่มต้นของแผนที่ | object | { lng: 100.49, lat: 13.72 } |
| zoom | ระดับการซูมขณะเริ่มแผนที่ จะต้องอยู่ระหว่าง 1 - 22 | integer | 9 |
| navigationCtrl | แสดงแถบปรับมุมมองของแผนที่ | boolean | false |
| protectScroll | ป้องกันการเลื่อนโดนแผนที่ | boolean | false |

การเรียกใช้ฟังก์ชันแผนที่ ทุกฟังก์ชันจะต้องเรียกหลังจากที่แผนที่ load เสร็จแล้ว ด้วยการเรียกฟังก์ชันใน `map.on('load', function...)` ดังนี้
```javascript
map.on('load', function() {
  ...
})
```

### Map Styles
#### รายชื่อ Map Style
- [Almond](./wiki/th/MAPSTYLE.md#almond)
- [Cha thai](./wiki/th/MAPSTYLE.md#cha-thai)
- [Charcoal](./wiki/th/MAPSTYLE.md#charcoal)
- [Cloudy](./wiki/th/MAPSTYLE.md#cloudy)
- [Hybrid](./wiki/th/MAPSTYLE.md#hybrid)
- [Ivory](./wiki/th/MAPSTYLE.md#ivory)
- [Lightsteel](./wiki/th/MAPSTYLE.md#lightsteel)
- [Midnight](./wiki/th/MAPSTYLE.md#midnight)
- [Satellite](./wiki/th/MAPSTYLE.md#satellite)
- [Spearmint](./wiki/th/MAPSTYLE.md#spearmint)
- [Terrain](./wiki/th/MAPSTYLE.md#terrain)

![map style satellite](/static/image/map-style/satellite.png)

#### เปลี่ยน Map Style
สามารถเปลี่ยน Map Style ได้ 2 ทาง คือ

##### ผ่านทาง Initial map

```javascript
const map = new thinknetmaps.Map({
  container: 'map', // div's id for render map
  app_id: 'YOUR_APP_ID',
  api_key: 'YOUR_API_KEY',
  style: 'MAP_STYLE'
})
```

##### ผ่านทางฟังก์ชั่น `setStyle`

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
#### map.addMarker(options)
| Property | Description | Type | Default |
|--|--|--|--|
| id | ระบุ id ให้แต่ละ marker ( ห้ามซ้ำเด็ดขาด ) | string | (Random ID) |
| lat | latitude ของ Marker | number | - |
| lng | longitude ของ Marker | number | - |
| offset | ระยะห่างของ icon กับพิกัดของ Marker | number[] | [0, 0] |
| onClick | event ที่จะเกิดขึ้นเมื่อผู้ใช้ click | function | - |
| icon | เปลี่ยน icon | string | - |
| draggable | ทำให้ Marker สามารถลากวางได้ | boolean | false |
| onDragEnd | event ที่จะเกิดขึ้นเมื่อผู้ใช้ drag เสร็จสิ้น | function | - |
| popup | แสดง [Popup](#mapaddmarkeroptions-กับ-popup) บน Marker | object | - |

###### เพิ่ม Marker ลงบนแผนที่

![simple marker](/static/image/marker.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    offset: [0, -10],
    onClick: function() {
        alert('รถรับส่ง 6 ล้อ บางบอน')
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

#### map.addMarker(options) กับ Popup
| Property | Description | Type | Default |
|--|--|--|--|
| description | คำอธิบายเมื่อ popup แสดงขึ้น | string | - |
| action | เมื่อ action นี้ถูกเรียก popup จะแสดง มี 2 รูปแบบคือ `click` และ `hover` | string | click |
|offset| ระยะห่างของ popup กับพิกัดของ Marker | number[] | [0, 0] |

###### เพิ่ม Popup ลงใน Marker
![marker's popup](/static/image/popup.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    icon: 'tn_car_2_orange',
    description: 'รถ ว. บางบอน 2',
    popup: {
      action: 'click'
    }
  })
}
```

#### map.setMarker(options) ปรับตำแหน่ง Marker
| Property | Description | Type | Default |
|--|--|--|--|
| id | id ของ Marker ที่ต้องการ update ค่า | string | - |
| lat | latitude ของ Marker | number | - |
| lng | longitude ของ Marker | number | - |

###### ตัวอย่าง

HTML
```html
<select id="selected-value">
  <option value="100.61,13.66">บางนา</option>
  <option value="100.49,13.65">บางมด</option>
  <option value="100.39,13.66">บางบอน</option>
</select>
```
javascript

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lng: 100.61,
    lat: 13.66,
    icon: 'tn_car_2_orange',
    onClick: function() {
      alert('รถรับส่ง 6 ล้อ บางบอน')
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

----
#### map.addMarkerImage(options) เพิ่ม Marker ที่เป็นรูปภาพ
| Property | Description | Type | Default |
|--|--|--|--|
| url | URL รูปภาพ | string | - |

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
---
### Geometry
#### map.addLine(options) วาดเส้นลงแผนที่
| Property | Description | Type | Default |
|--|--|--|--|
| id | ระบุ id ให้แต่ละ Line (ห้ามซ้ำเด็ดขาด) | string | (random id) |
| coordinates | Array ของพิกัดแต่ละจุด (เพื่อที่จะวาดเส้นต้องมีมากกว่า 1 จุด) | array(number[]) | - |
| style | รูปแบบของเส้น | object | - |

###### Line style
| Property | Description | Type | Default |
|--|--|--|--|
| lineWidth | ความหนาของเส้น | number | - |
| color | สีของเส้น | string | - |

ตัวอย่างการวาดเส้น โดยการเพิ่มตำแหน่ง (lng, lat) ลงใน Array อย่างเป็นลำดับ

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

#### map.addPolygon(options) วาด Polygon
| Property | Description | Type | Default |
|--|--|--|--|
| id | ระบุ id ให้แต่ละ Polygon (ห้ามซ้ำเด็ดขาด) | string | (random id) |
| coordinates | Array ของพิกัดแต่ละจุด (เพื่อที่จะวาด Polygon ต้องมีมากกว่า 2 จุด) | array(number[]) | - |
วาด Polygon โดยการเพิ่มตำแหน่ง (lat, lng) ลงใน Array อย่างเป็นลำดับ

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

## :bulb: Code ตัวอย่าง
```html
<html>
  <head>
    <title>DEMO</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.0.0.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.0.0.min.css' rel='stylesheet' />
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
                alert('รถรับส่ง 6 ล้อ บางบอน')
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
