# THiNKNET Maps

![THiNKNET Maps Logo](/static/image/logo_thinknet_maps.png)

**thinknetmaps Library** สำหรับการใช้งานแผนที่ดิจิตอลบนเว็บไซต์ด้วย Javascript
มีฟังก์ชันรองรับการแสดงผล และ Interaction บนแผนที่ พร้อมกับ Map Style ที่มีให้เลือกใช้กว่า 10 แบบ

**Official Site** : [https://maps.thinknet.co.th](https://maps.thinknet.co.th)

**For Developers** : [https://developer-maps.thinknet.co.th](https://developer-maps.thinknet.co.th)
สำหรับจัดการ API Key และรับสิทธิ์การเข้าถึง THiNKNET Maps บน Application ของคุณ

**ดูตัวอย่างเพิ่มเติมได้ที่**: [DEMO](https://demo-maps.thinknet.co.th)

## :mega: Upcoming Releases

- [ ] ปรับปรุงฟังก์ชัน addLine
- [ ] แก้ไขรูปทรงของ line และ polygon ได้

## :pushpin: Release Notes 1.1.0-rc2

- [x] ปรับปรุงการจัดการ Event listener ของ Marker และ Popup ในแผนที่
- [x] ฟังก์ชัน getMarker สำหรับเรียกข้อมูล Marker ที่ id นั้น
- [x] ฟังก์ชัน getAllMarker สำหรับเรียกข้อมูล Marker ทั้งหมด
- [x] ฟังก์ชัน removeMarker สำหรับการลบ Marker บนแผนที่
- [x] ยกเลิกการใช้งาน ฟังก์ชัน addMarkerArray
- [x] ยกเลิกการใช้งาน ฟังก์ชัน addMarkerImageArray
- [x] Syntax autocomplete
- [x] ย้าย option description ของ Marker เข้าไปใน Popup option
- [x] ฟังก์ชัน addPopup สำหรับการเพิ่ม Popup ให้ Marker
- [x] แก้ไขแผนที่ไม่สามารถใช้งานได้ เมื่อเปิดหลายแผนที่ในหน้าเว็บเดียวกัน
- [x] แก้ไขโลโก้ไม่แสดง เมื่อเปิดหลายแผนที่ในหน้าเว็บเดียวกัน
- [x] แก้ไข Popup ไม่แสดงบนแผนที่
- [x] แก้ bug ฟังก์ชัน clearEventScroll ไม่สามารถใช้งานได้

## :clipboard: Features

- [แสดงแผนที่บนเว็บไซต์](#get-started)
- [การกำหนดการแสดงภาษาบนแผนที่](./wiki/th/MAPSTYLE.md#%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%9A%E0%B8%99%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88)
- [Map Style](#map-style)
  - [เปลี่ยน Map Style](#change-map-style)
- [Scrolling protection](#protected-scrolling)
- [Marker](#marker)
- [Geometry](#geometry)
- [API Document](#)
  - [Search](./wiki/th/API_SEARCH.md)
  - [Suggest](./wiki/th/API_SUGGEST.md)
  - [Reverse Geocoding](./wiki/th/API_REVERSE_GEOCODING.md)
  - [Public Transport Routing](./wiki/th/API_PUBLIC_TRANSPORT_ROUTING.md)
  - [Static Data](./wiki/th/API_STATIC_DATA.md)

## :inbox_tray: ติดตั้ง THiNKNET Maps

### ติดตั้งผ่าน NPM

```shell
$ npm install thinknetmaps --save
```

จากนั้นนำ `thinknetmaps` เข้าสู่โปรเจค

```javascript
const thinknetmaps = require('thinknetmaps')
require('node_modules/thinknetmaps/dist/thinknetmaps.css')
```

---

### หรือดาวน์โหลดจาก THiNKNET Maps Server สำหรับใช้บน HTML

```html
<script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0-rc2.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0-rc2.min.css' rel='stylesheet' />
```

## :electric_plug: เริ่มใช้งาน THiNKNET Maps API

<a name="get-started"></a>

### เริ่มต้นสร้างแผนที่

สร้าง div สำหรับเป็นพื้นที่ให้ render map ลงบนหน้าเว็บ และก่อนที่จะใช้ THiNKNET Maps คุณต้องทำการสร้าง `app_id` และ `api_key` จาก [THiNKNET Maps](https://developer-maps.thinknet.co.th)
เพื่อนำมาใช้งานกับแผนที่ของคุณ

```html
<html>
  <head>
    <script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0-rc2.min.js'></script>
    <link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0-rc2.min.css' rel='stylesheet' />
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

ชื่อของ container จะต้องตรงกับ ID ของ div ที่ใช้แสดงแผนที่ และคุณก็สามารถใช้ชื่อ container อื่นๆได้เช่นกัน

### THiNKNET Maps initial options

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| container | ID ของ container ที่จะใช้ render map | string | map |
| app_id | Application ID ของคุณ | string | - |
| api_key | API key ของคุณ | string | - |
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

<a name="map-style"></a>

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

<a name="change-map-style"></a>

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

- [addMarker](#add-marker)
- [addMarkerImage](#add-marker-image)
- [addMarker with popup](#add-marker-with-popup)
- [addPopup](#add-popup)
- [setMarker](#set-marker)
- [removeMarker](#remove-marker)
- [clearMarker](#clear-marker)
- [getMarker](#get-marker)
- [getAllMarker](#get-markers)

<a name="add-marker"></a>

#### map.addMarker(options)

| Property | Description | Type | Default |
|--|--|--|--|
| id | ระบุ ID ให้แต่ละ marker ( ห้ามซ้ำเด็ดขาด ) | string | (Random ID) |
| lat | latitude ของ Marker | number | - |
| lng | longitude ของ Marker | number | - |
| offset | ระยะห่างของ icon กับพิกัดของ Marker | number[] | [0, 0] |
| onClick | event ที่จะเกิดขึ้นเมื่อผู้ใช้ click | function | - |
| icon | เปลี่ยน Icon | string | - |
| draggable | ทำให้ Marker สามารถลากวางได้ | boolean | false |
| onDragEnd | event ที่จะเกิดขึ้นเมื่อผู้ใช้ drag เสร็จสิ้น | function | - |
| popup | แสดง [Popup](#add-marker-with-popup) บน Marker | object | - |

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

เพิ่ม Marker ในลักษณะ icon ที่มาจาก THiNKNET Maps

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

เพิ่ม Marker ที่เป็นรูปภาพ โดยเป็น URL ของรูป

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

<a name="add-marker-with-popup"></a>

#### map.addMarker(options) กับ Popup

| Property | Description | Type | Default |
|--|--|--|--|
| description | คำอธิบายเมื่อ Popup แสดงขึ้น | string | - |
| action | เมื่อ action นี้ถูกเรียก popup จะแสดง มี 2 รูปแบบคือ `click` และ `hover` | string | click |
|offset| ระยะห่างของ Popup กับพิกัดของ Marker | number[] | [0, 0] |

###### เพิ่ม Popup ลงใน Marker

![marker's popup](/static/image/popup.png)

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lat: 13.72,
    lng: 100.49,
    icon: 'mmg_car_2_orange',
    popup: {
      action: 'click',
      description: 'รถ ว. บางบอน 2'
    }
  })
}
```

<a name="add-popup"></a>

#### map.addPopup(options)

| Property | Description | Type | Default |
|--|--|--|--|
| id | ID ของ Marker ที่ จะเพิ่ม Popup | string | - |
| description | คำอธิบายเมื่อ Popup แสดงขึ้น | string | - |
| action | เมื่อ action นี้ถูกเรียก Popup จะแสดง มี 2 รูปแบบคือ `click` และ `hover` | string | click |
|offset| ระยะห่างของ Popup กับพิกัดของ Marker | number[] | [0, 0] |

##### เพิ่ม Popup ลงใน Marker ผ่านฟังก์ชัน (.addPopup)

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
    description: 'รถ ว. บางบอน 2'
  })
}
```

---

<a name="set-marker"></a>

#### map.setMarker(options) ปรับตำแหน่ง Marker

| Property | Description | Type | Default |
|--|--|--|--|
| id | ID ของ Marker ที่ต้องการ update | string | - |
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

Javascript

```javascript
map.on('load', function() {
  map.addMarker({
    id: 'bangbon',
    lng: 100.61,
    lat: 13.66,
    icon: 'mmg_car_2_orange',
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

<a name="remove-marker"></a>

#### map.removeMarker(id) ลบ Marker

| Property | Description | Type | Default |
|--|--|--|--|
| id | ID ของ Marker ที่ต้องการลบออก | string | - |

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

ลบ Marker ทั้งหมดในแผนที่

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

เรียกขอ Marker ตาม ID ที่ต้องการ

| Property | Description | Type | Default |
|--|--|--|--|
| id | ID ของ Marker | string | - |

<a name="get-markers"></a>

#### map.getAllMarker()

เรียกขอ Marker ทั้งหมด

---

### Geometry

- [addLine](#add-line)
- [addPolygon](#add-polygon)

<a name="add-line"></a>

#### map.addLine(options)

วาดเส้นลงแผนที่

| Property | Description | Type | Default |
|--|--|--|--|
| id | ระบุ ID ให้แต่ละ Line (ห้ามซ้ำเด็ดขาด) | string | (Random ID) |
| coordinates | Array ของพิกัดแต่ละจุด (เพื่อที่จะวาดเส้นต้องมีมากกว่า 1 จุด) | array(number[]) | - |
| style | รูปแบบของเส้น | object | - |

###### Line style

| Property | Description | Type | Default |
|--|--|--|--|
| lineWidth | ความหนาของเส้น | number | - |
| color | รหัสสีของเส้น | string | - |

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

<a name="add-polygon"></a>

#### map.addPolygon(options)

วาด Polygon ลงบนแผนที่

| Property | Description | Type | Default |
|--|--|--|--|
| id | ระบุ ID ให้แต่ละ Polygon (ห้ามซ้ำเด็ดขาด) | string | (Random ID) |
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
    <script src='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0-rc2.min.js'></script>
<link href='https://api-maps.thinknet.co.th/libs/thinknetmaps.1.1.0-rc2.min.css' rel='stylesheet' />
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
