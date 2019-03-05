# **Service Static Data API Document**
Service สำหรับดึงข้อมูล ภูมิภาค, จังหวัด, อำเภอ/เขต, ตำบล/แขวง, สถานศึกษา(ระดับวิทยาลัยและมหาวิทยาลัย), นิคมอุตสาหกรรม ในประเทศไทย

## Features
* [Countries](#countries)
    * [Get All Countries](#get-all-countries)
    * [Get Country by `country_code`](#get-country-by-country_code)
* [Regions](#regions)
* [Provinces](#provinces)
    * [Get All Provinces](#get-all-provinces)
    * [Get Province By `province_code`](#get-province-by-province_code)
* [Districts](#districts)
    * [Get All Districts](#get-all-districts)
    * [Get District By `district_code`](#get-district-by-district_code)
* [Sub Districts](#sub-districts)
    * [Get All Sub Districts](#get-all-sub-districts)
    * [Get Sub District By `sub_district_code`](#get-sub-district-by-sub_district_code)
* [Industrial Estates](#industrial-estates)
    * [Get All Industrial Estates](#get-all-industrial-estates)
    * [Get Industrial Estates By `industrial_estate_code`](#get-industrial-estates-by-industrial_estate_code)
* [Educations](#education-places)
    * [Get All Education Places](#get-all-education-places)
    * [Get Education Place By `education_code`](#get-education-place-by-education_code)
* [Transit Routes](#transit-routes)
    * [Get All Transit Routes](#get-all-transit-routes)
    * [Get Transit Routes by `transit_route_code`](#get-transit-routes-by-transit_route_code)
* [Transit Stations](#transit-stations)
    * [Get All Transit Stations](#get-all-transit-stations)
    * [Get Transit Stations by `transit_station_code`](#get-transit-stations-by-transit_station_code)
* [Bus Lines](#bus-lines)
    * [Get All Bus Lines](#get-all-bus-lines)
    * [Get Bus Lines by `bus_line_id`](#get-bus-lines-by-bus_line_id)
* [Bus Stops](#bus-stops)
    * [Get All Bus Stops](#get-all-bus-stops)
    * [Get Bus Stops by `bus_stop_id`](#get-bus-stops-by-bus_stop_id)
* [Advanced Options](#advanced-options)
    * [Example](#example)

## Countries
### Get All Countries
ดึงข้อมูลประเทศทั้งหมด
> **GET** `https://api-maps.thinknet.co.th/v1/static/countries`

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| id | id ของประเทศ | String |
| name | ชื่อประเทศ | String |
| alpha2_cntry_code | รหัสย่อของประเทศ 2 หลัก ตามมาตรฐาน ISO3166-1 Alpha-2 | String |
| alpha3_cntry_code | รหัสย่อของประเทศ 3 หลัก ตามมาตรฐาน ISO3166-1 Alpha-3 | String |
| currency | เงินตราของประเทศ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;type | ประเภทสกุลเงิน | String |
| &nbsp;&nbsp;&nbsp;&nbsp;code | รหัสย่อของสกุลเงิน | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/countries?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
  {
    "currency": {
      "type": "Florin",
      "code": "AWG"
    },
    "id": "1",
    "alpha2_cntry_code": "AW",
    "alpha3_cntry_code": "ABW",
    "name": "Aruba"
  },
  ...
]
```

### Get Country by `country_code`
ดึงข้อมูลประเทศ จาก รหัสของประเทศ
> **GET** `https://api-maps.thinknet.co.th/v1/static/countries/:id`

#### Params
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสของประเทศ | String |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| id | id ของประเทศ | String |
| name | ชื่อประเทศ | String |
| alpha2_cntry_code | รหัสย่อของประเทศ 2 หลัก ตามมาตรฐาน ISO3166-1 Alpha-2 | String |
| alpha3_cntry_code | รหัสย่อของประเทศ 3 หลัก ตามมาตรฐาน ISO3166-1 Alpha-3 | String |
| currency | เงินตราของประเทศ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;type | ประเภทสกุลเงิน | String |
| &nbsp;&nbsp;&nbsp;&nbsp;code | รหัสย่อของสกุลเงิน | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/countries/1?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
  "currency": {
    "type": "Florin",
    "code": "AWG"
  },
  "id": "1",
  "alpha2_cntry_code": "AW",
  "alpha3_cntry_code": "ABW",
  "name": "Aruba"
}
```

---

## Regions
ดึงข้อมูล ภูมิภาค ทั้งหมดของประเทศไทย **ไม่มีข้อมูล polygon และ centroid*
> **GET** `https://api-maps.thinknet.co.th/v1/static/regions`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| type_id | รหัสของการจัดรูปแบบภูมิภาคประกอบด้วย `"1" ( Official )`, `"2" ( Tourism Authority of Thailand )`, `"3" ( Jobthai )` | String | "1", "2", "3" | "1" |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| type_id | รหัสของประเภทการจัดรูปแบบภูมิภาคประกอบด้วย | String |
| region_id | รหัสของภูมิภาค | String |
| type | ประเภทการจัดรูปแบบภูมิภาค | String |
| name | รหัสของภูมิภาค | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภูมิภาคภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภูมิภาคภาษาอังกฤษ | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/regions?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`


```
[
    {
        "name": {
          "th": "ภาคเหนือ",
          "en": "North"
        },
        "label": {
          "th": "เหนือ",
          "en": "North"
        },
        "type_id": "1",
        "id": "1",
        "type": "Official"
    },
    ...
]
```

ดึงข้อมูล ภูมิภาค แบบ Official ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/regions?type_id=1&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`


```
[
    {
        "name": {
          "th": "ภาคเหนือ",
          "en": "North"
        },
        "label": {
          "th": "เหนือ",
          "en": "North"
        },
        "type_id": "1",
        "id": "1",
        "type": "Official"
    },
    ...
]
```

ดึงข้อมูล ภูมิภาค แบบ Tourism Authority of Thailand ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/regions?type_id=2&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`


```
[
    {
        "name": {
          "th": "ภาคเหนือ",
          "en": "North"
        },
        "label": {
          "th": "เหนือ",
          "en": "North"
        },
        "type_id": "2",
        "id": "1",
        "type": "Tourism Authority of Thailand"
    },
    ...
]
```

ดึงข้อมูล ภูมิภาค แบบ JobThai ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/regions?type_id=3&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`


```
[
    {
        "name": {
          "th": "ภาคเหนือ",
          "en": "North"
        },
        "label": {
          "th": "เหนือ",
          "en": "North"
        },
        "type_id": "3",
        "id": "1",
        "type": "JobThai"
    },
    ...
]
```
---

## Provinces
### Get All Provinces
ดึงข้อมูล จังหวัด ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| region_official_code | รหัสภูมิภาคของการจัดภูมิภาคแบบ `Offical` | String | - | - |
| region_tourism_code | รหัสภูมิภาคของการจัดภูมิภาคแบบ `Tourism Authority of Thailand` | String | - | - |
| region_jobthai_code | รหัสภูมิภาคของการจัดภูมิภาคแบบ `Jobthai` | String | - | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อจังหวัด | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อจังหวัดภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อจังหวัดภาษาอังกฤษ | String |
| code | รหัสของจังหวัด | String |
| region_code | รหัสของภูมิภาค | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;official | รหัสของภูมิภาคแบบ `Official` | String |
| &nbsp;&nbsp;&nbsp;&nbsp;tourism | รหัสของภูมิภาคแบบ `Tourism Authority of Thailand` | String | &nbsp;&nbsp;&nbsp;&nbsp;tourism | รหัสของภูมิภาคแบบ `Tourism Authority of Thailand` | String |
| &nbsp;&nbsp;&nbsp;&nbsp;jobthai | รหัสของภูมิภาคแบบ `Jobthai` | String |

#### Example Response

> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "กรุงเทพมหานคร",
            "en": "Bangkok"
        },
        "region_code": {
            "official": "4",
            "tourism": "3",
            "jobthai": "6"
        },
        "code": "01"
    },
    ...
]
```

ดึงข้อมูล จังหวัดแบบ office ในภาคที่รหัสเป็น 4 ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces?region_official_code=4&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "กรุงเทพมหานคร",
            "en": "Bangkok"
        },
        "region_code": {
            "official": "4",
            "tourism": "3",
            "jobthai": "6"
        },
        "code": "01"
    },
    {
        "name": {
            "th": "ชัยนาท",
            "en": "Chai Nat"
        },
        "region_code": {
            "official": "4",
            "tourism": "3",
            "jobthai": "3"
        },
        "code": "10"
    },
    ...
]
```

ดึงข้อมูล จังหวัดแบบ tourism ในภาคที่รหัสเป็น 4 ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces?region_tourism_code=4&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "จันทบุรี",
            "en": "Chanthaburi"
        },
        "region_code": {
            "official": "5",
            "tourism": "4",
            "jobthai": "4"
        },
        "code": "07"
    },
    ...
]
```

ดึงข้อมูล จังหวัดแบบ jobthai ในภาคที่รหัสเป็น 4 ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces?region_jobthai_code=4&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "จันทบุรี",
            "en": "Chanthaburi"
        },
        "region_code": {
            "official": "5",
            "tourism": "4",
            "jobthai": "4"
        },
        "code": "07"
    },
    ...
]
```

### Get Provinces by `province_code`
ดึงข้อมูล จังหวัด จากรหัสของจังหวัด
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces/:code`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| code | รหัสของจังหวัด | String | "01" - "77" | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อจังหวัด | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อจังหวัดภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อจังหวัดภาษาอังกฤษ | String |
| code | รหัสของจังหวัด | String |
| region_code | รหัสของภูมิภาค | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;official | รหัสของภูมิภาคแบบ `Official` | String |
| &nbsp;&nbsp;&nbsp;&nbsp;tourism | รหัสของภูมิภาคแบบ `Tourism Authority of Thailand` | String |
| &nbsp;&nbsp;&nbsp;&nbsp;jobthai | รหัสของภูมิภาคแบบ `Jobthai` | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces/01?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    "name": {
        "th": "กรุงเทพมหานคร",
        "en": "Bangkok"
    },
    "region_code": {
        "official": "4",
        "tourism": "3",
        "jobthai": "6"
    },
    "code": "01"
}
```


-----

## Districts
### Get All Districts

ข้อมูลอำเภอ/เขตทั้งหมดในประเทศไทย

> **GET** `https://api-maps.thinknet.co.th/v1/static/districts`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| province_code | รหัสจังหวัด | String | "01" - "77" | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อเขต/อำเภอ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อเขต/อำเภอภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อเขต/อำเภอภาษาอังกฤษ | String |
| code | รหัสเขต/อำเภอ | String |
| province_code | รหัสจังหวัด | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/districts?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "แม่สะเรียง",
            "en": "Mae Sariang"
        },
        "code": "4406",
        "province_code": "44"
    },
    {
        "name": {
            "th": "ท้ายเหมือง",
            "en": "Thai Mueang"
        },
        "code": "3408",
        "province_code": "34"
    },
    ...
]
```


### Get District by `district_code`
กรองข้อมูลจากรหัสเขต/อำเภอ

> **GET** `https://api-maps.thinknet.co.th/v1/static/districts/:code`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| code | รหัสเขต/อำเภอ | String | "01xx" - "77xx" | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อเขต/อำเภอ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อเขต/อำเภอภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อเขต/อำเภอภาษาอังกฤษ | String |
| code | รหัสเขต/อำเภอ | String |
| province_code | รหัสจังหวัด | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/districts/0116?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    "name": {
        "th": "บางกะปิ",
        "en": "Bang Kapi"
    },
    "code": "0116",
    "province_code": "01"
}
```

-----

## Sub Districts
### Get All Sub-Districts
ดึงข้อมูล ตำบล/แขวง ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/sub-districts`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| province_code | รหัสของจังหวัด | String | "01" - "77" | - |
| district_code | รหัสของอำเภอ/เขต | String | "0101" - "77xx" | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อตำบล/แขวง | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อชื่อตำบล/แขวงภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อชื่อตำบล/แขวงภาษาอังกฤษ | String |
| code | รหัสของตำบล/แขวง | String |
| province_code | รหัสจังหวัด | String |
| district_code | รหัสอำเภอ/เขต | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/sub-districts?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "คลองตัน",
            "en": "Khlong Tan"
        },
        "code": "010101",
        "district_code": "0101",
        "province_code": "01"
    },
    {
        "name": {
            "th": "คลองเตย",
            "en": "Khlong Toei"
        },
        "code": "010102",
        "district_code": "0101",
        "province_code": "01"
    },
    ...
]
```

### Get Sub District by `sub_district_code`
กรองข้อมูลจากรหัสของ แขวง/ตำบล
> **GET** `https://api-maps.thinknet.co.th/v1/static/sub-districts/:code`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| code | รหัสแขวง/ตำบล | String | "010101" - "77xxxx" | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อตำบล/แขวง | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อตำบล/แขวงภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อตำบล/แขวงภาษาอังกฤษ | String |
| code | รหัสของตำบล/แขวง | String |
| province_code | รหัสของจังหวัด | String |
| district_code | รหัสของอำเภอ/เขต | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/sub-districts/010101?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    "name": {
        "th": "คลองตัน",
        "en": "Khlong Tan"
    },
    "code": "010101",
    "district_code": "0101",
    "province_code": "01"
}
```

-----

## Education Places
### Get All Education Places
ดึงข้อมูล สถานศึกษาระดับวิทยาลัยและมหาวิทยาลัย ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/educations

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| province_code | รหัสของจังหวัด | String | "01" - "77" | - |
| category | ประเภทของสถานศึกษา | String | "university", "college" | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อของสถานศึกษา | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| label | ชื่อย่อของสถานศึกษา | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อย่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อย่อภาษาอังกฤษ | String |
| id | รหัสของสถานศึกษา | String |
| province_code | รหัสของจังหวัด | String |
| district_code | รหัสของอำเภอ/เขต | String |
| sub_district_code | รหัสของตำบล/แขวง | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/educations?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "มหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง",
            "en": "Thammasat University Lampang Campus"
        },
        "label": {
            "th": "ม.ธรรมศาสตร์",
            "en": "Thammasat University"
        },
        "id": "1000237",
        "province_code": "52",
        "district_code": "5213",
        "sub_district_code": "521301",
        "category": "University"
    },
    {
        "name": {
            "th": "วิทยาลัยสารพัดช่างน่าน",
            "en": "Nan Polytechnic College"
        },
        "label": {
            "th": "วิทยาลัยสารพัดช่างน่าน",
            "en": "Nan Polytechnic College"
        },
        "id": "1000239",
        "province_code": "26",
        "district_code": "2601",
        "sub_district_code": "260106",
        "category": "College"
    },
    ...
]
```

### Get Education Place by `education_code`
ดึงข้อมูล สถานศึกษาระดับวิทยาลัยและมหาวิทยาลัย ในประเทศไทย จาก `education_code`
> **GET** `https://api-maps.thinknet.co.th/v1/static/educations/:id`

#### Params
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสของสถานศึกษา | String |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อของสถานศึกษา | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| label | ชื่อย่อของสถานศึกษา | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อย่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อย่อภาษาอังกฤษ | String |
| id | รหัสของสถานศึกษา | String |
| province_code | รหัสของจังหวัด | String |
| district_code | รหัสของอำเภอ/เขต | String |
| sub_district_code | รหัสของตำบล/แขวง | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/educations/1000237?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    "name": {
        "th": "มหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง",
        "en": "Thammasat University Lampang Campus"
    },
    "label": {
        "th": "ม.ธรรมศาสตร์",
        "en": "Thammasat University"
    },
    "id": "1000237",
    "province_code": "52",
    "district_code": "5213",
    "sub_district_code": "521301",
    "category": "University"
}
```

-----


## Industrial Estates
### Get All Industrial-Estates
ดึงข้อมูล นิคมอุตสาหกรรม ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/industrial-estates`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| province_code | รหัสของจังหวัด | String | "01" - "77" | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสของ นิคมอุตสาหกรรม | String |
| name | ชื่อ นิคมอุตสาหกรรม | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| label | ชื่อย่อ นิคมอุตสาหกรรม | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อย่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อย่อภาษาอังกฤษ | String |
| sub_district_code | รหัสของ ตำบล/แขวง | String |
| district_code | รหัสของ อำเภอ/เขต | String |
| province_code | รหัสของจังหวัด | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/industrial-estates?province_code=01&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        "name": {
            "th": "สวนอุตสาหกรรมเครือสหพัฒน์ ลำพูน",
            "en": "Saha Group Industrial Park Lamphun"
        },
        "label": {
            "th": "สวนอุตสาหกรรมเครือสหพัฒน์ ลำพูน",
            "en": "Saha Group Industrial Park Lamphun"
        },
        "id": 1040452,
        "province_code": "53",
        "district_code": "5301",
        "sub_district_code": "530106"
    },
    {
        "name": {
            "th": "นิคมอุตสาหกรรมสมุทรสาคร",
            "en": "Samut Sakhon Industrial Estate"
        },
        "label": {
            "th": "นิคมอุตสาหกรรมสมุทรสาคร",
            "en": "Samut Sakhon Industrial Estate"
        },
        "id": 1090388,
        "province_code": "61",
        "district_code": "6101",
        "sub_district_code": "610111"
    },
    ...
]
```

### Get Industrial Estates By `industrial_estate_code`
กรองข้อมูลจากรหัสของ นิคมอุตสาหกรรม
> **GET** `https://api-maps.thinknet.co.th/v1/static/industrial-estates/:id`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| id | รหัสของนิคมอุตสาหกรรม | String | - | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสของ นิคมอุตสาหกรรม | String |
| name | ชื่อ นิคมอุตสาหกรรม | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| label | ชื่อย่อ นิคมอุตสาหกรรม | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อย่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อย่อภาษาอังกฤษ | String |
| sub_district_code | รหัสของ ตำบล/แขวง | String |
| district_code | รหัสของ อำเภอ/เขต | String |
| province_code | รหัสของจังหวัด | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/industrial-estates/1094184?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    "name": {
        "th": "นิคมอุตสาหกรรมบางปะอิน",
        "en": "Bang Pa-in Industrial Estate"
    },
    "label": {
        "th": "นิคมอุตสาหกรรมบางปะอิน",
        "en": "Bang Pa-in Industrial Estate"
    },
    "id": 1094184,
    "province_code": "32",
    "district_code": "3208",
    "sub_district_code": "320808"
}
```

-----

## Transit Routes
### Get All Transit-Routes
ดึงข้อมูล เส้นทางการขนส่ง ทั้งหมดของประเทศไทย
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-routes`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| type | กรองประเภทของ เส้นทางการขนส่ง | String | BTS,MRT,ARL,BRT | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อ เส้นทางการขนส่ง | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| id | รหัสของ เส้นทางการขนส่ง | String |
| color | สีตัวแทนของ เส้นทางการขนส่ง | String |
| type | ประเภทของ เส้นทางการขนส่ง | String |
| transit_stations | สถานีทั้งหมดที่อยู่ระหว่าง เส้นทางการขนส่ง | Array Object |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-routes?type=BRT&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        name: {
            th: "รถไฟฟ้ามหานคร สายฉลองรัชธรรม (สายสีม่วง)",
            en: "MRT Chalong Ratchadham Line (The Purple Line)"
        },
        id: "1",
        color: "Purple",
        type: "MRT",
        transit_stations: [
            {
                name: {
                    th: "สถานีรถไฟฟ้าเอ็มอาร์ทีเตาปูน",
                    en: "Tao Poon MRT Station"
                },
                label: {
                    th: "สถานีเตาปูน",
                    en: "Tao Poon MRT Station"
                },
                id: "1369126",
                type: "MRT",
                province_code: "01",
                district_code: "0121",
                sub_district_code: "012101",
                order: 0
            },
            ...
        ]
    },
    ...
]
```


### Get Transit Routes By `transit_route_code`
ดึงข้อมูลจากรหัสของ เส้นทางการขนส่ง
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-routes/:id`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| id | รหัสของเส้นทางการขนส่ง | String | - | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อ เส้นทางการขนส่ง | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| id | รหัสของ เส้นทางการขนส่ง | String |
| color | สีตัวแทนของ เส้นทางการขนส่ง | String |
| type | ประเภทของ เส้นทางการขนส่ง | String |
| transit_stations | สถานีทั้งหมดที่อยู่ระหว่าง เส้นทางการขนส่ง | Array Object |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-routes/1?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    name: {
        th: "รถไฟฟ้ามหานคร สายฉลองรัชธรรม (สายสีม่วง)",
        en: "MRT Chalong Ratchadham Line (The Purple Line)"
    },
    id: "1",
    color: "Purple",
    type: "MRT",
    transit_stations: [
        {
            name: {
                th: "สถานีรถไฟฟ้าเอ็มอาร์ทีเตาปูน",
                en: "Tao Poon MRT Station"
            },
            label: {
                th: "สถานีเตาปูน",
                en: "Tao Poon MRT Station"
            },
            id: "1369126",
            type: "MRT",
            province_code: "01",
            district_code: "0121",
            sub_district_code: "012101",
            order: 0
        },
        ...
    ]
}
```

-----

## Transits Stations
### Get All Transit-Stations
ดึงข้อมูลสถานีของรถไฟฟ้าทั้งหมดในกรุงเทพมหานคร
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-stations`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| type | ประเภทของสถานี | String | BTS,MRT,ARL,BRT | -|
| transit_route_id | รหัสของสายรถไฟฟ้า | String | 1-6 | -|

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสสถานี | String |
| name | ชื่อสถานี | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| label | ชื่อย่อสถานี | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อย่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อย่อภาษาอังกฤษ | String |
| type | ประเภทของสถานี | String |
| sub_district_code | รหัสของ ตำบล/แขวง | String |
| district_code | รหัสของ อำเภอ/เขต | String |
| province_code | รหัสของจังหวัด | String |
| order | ลำดับของสถานี | Number |
| transit_route_id | รหัสของเส้นทางขนส่งที่ผ่าน | Array |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-stations?&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        id: "1304456",
        name: {
            th: "A4 สถานีรถไฟฟ้าแอร์พอร์ต เรล ลิงค์ หัวหมาก",
            en: "A4 Hua Mak Airport Rail Link Station"
        },
        label: {
            th: "A4 สถานีหัวหมาก",
            en: "A4 Hua Mak Airport Rail Link Station"
        },
        type: "ARL",
        province_code: "01",
        district_code: "0142",
        sub_district_code: "014201",
        transit_route_id: [
            "6"
        ]
    },
    ...
]
```

### Get Transit Stations By `transit_station_code`
กรองข้อมูลจากรหัสของ สถานี
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-stations/:id`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| id | รหัสของสถานี | String | - | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสสถานี | String |
| name | ชื่อสถานี | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| label | ชื่อย่อสถานี | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อย่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อย่อภาษาอังกฤษ | String |
| type | ประเภทของสถานี | String |
| sub_district_code | รหัสของ ตำบล/แขวง | String |
| district_code | รหัสของ อำเภอ/เขต | String |
| province_code | รหัสของจังหวัด | String |
| order | ลำดับของสถานี | Number |
| transit_route_id | รหัสของเส้นทางขนส่งที่ผ่าน | Array |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/transit-stations/1304456?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    id: "1304456",
    name: {
        th: "A4 สถานีรถไฟฟ้าแอร์พอร์ต เรล ลิงค์ หัวหมาก",
        en: "A4 Hua Mak Airport Rail Link Station"
    },
    label: {
        th: "A4 สถานีหัวหมาก",
        en: "A4 Hua Mak Airport Rail Link Station"
    },
    type: "ARL",
    province_code: "01",
    district_code: "0142",
    sub_district_code: "014201",
    transit_route_id: [
        "6"
    ]
}
```

-----

## Bus Lines
### Get All Bus Lines
ดึงข้อมูล เส้นทางรถเมล์ ในกรุงเทพมหานคร
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-lines`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| bus_direction | ทิศทางของรถเมล์ | String | "inbound", "outbound" | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| label | ชื่อสายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| bus_start | จุดต้นสายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อจุดต้นสายภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อจุดต้นสายภาษาอังกฤษ | String |
| bus_end | จุดปลายสายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อจุดปลายสายภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อจุดปลายสายภาษาอังกฤษ | String |
| bus_direction | ทิศทางของรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อทิศทางภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อทิศทางภาษาอังกฤษ | String |
| id | รหัสของ สายรถเมล์ | String |
| bus_line | หมายเลขของสายรถเมล์ | String |
#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-lines?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        label: {
            th: "ถนนตก - ท่าเตียน",
            en: "Thanon Tok - Tha Tien"
        },
        bus_start: {
            th: "ถนนตก",
            en: "Thanon Tok"
        },
        bus_stop: {
            th: "ท่าเตียน",
            en: "Tha Tien"
        },
        bus_direction: {
            th: "เข้าเมือง",
            en: "inbound"
        },
        id: "1",
        bus_line: "1"
    },
    ...
]
```

### Get Bus Lines By `bus_id`
กรองข้อมูลจากรหัสของ สายรถเมล์
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-lines/:id`

#### Params
| Property | Description | Type |
|----------|-------------|------|
| id | รหัสของสายรถเมล์ | String |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| label | ชื่อสายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| bus_start | จุดต้นสายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อจุดต้นสายภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อจุดต้นสายภาษาอังกฤษ | String |
| bus_end | จุดปลายสายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อจุดปลายสายภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อจุดปลายสายภาษาอังกฤษ | String |
| bus_direction | ทิศทางของรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อทิศทางภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อทิศทางภาษาอังกฤษ | String |
| id | รหัสของ สายรถเมล์ | String |
| bus_line | หมายเลขของสายรถเมล์ | String |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-lines/1?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    label: {
        th: "ถนนตก - ท่าเตียน",
        en: "Thanon Tok - Tha Tien"
    },
    bus_start: {
        th: "ถนนตก",
        en: "Thanon Tok"
    },
    bus_stop: {
        th: "ท่าเตียน",
        en: "Tha Tien"
    },
    bus_direction: {
        th: "เข้าเมือง",
        en: "inbound"
    },
    id: "1",
    bus_line: "1"
}
```

----

## Bus Stops
### Get All Bus Stops
ดึงข้อมูล ป้ายรถเมล์ ในกรุงเทพมหานคร
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-stops`

#### Query Strings
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| bus_line | รหัสของสายรถเมล์ | String | - | - |

#### Response Array Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อป้ายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String 
| id | รหัสของ ป้ายรถเมล์ | String |
| bus_line | รหัสของสายรถเมล์ | String |
| sort_no | ลำดับของป้ายรถเมล์ในสายรถเมล์ | Number |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-stops?bus_line_id=1&app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
[
    {
        name: {
            th: "ตรงข้ามโรงพยาบาลเจริญกรุง(ตรงข้ามซอยเจริญกรุง 86)",
            en: "Opposite ropchut charoen krung"
        },
        id: "1",
        bus_line_id: "1",
        sort_no: 1
    },
    ...
]
```

### Get Bus Stops By `bus_stop_id`
กรองข้อมูลจากรหัสของ ป้ายรถเมล์
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-stops/:id`

#### Params
| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|------|----------------|---------------|
| id | รหัสของป้ายรถเมล์ | String | - | - |

#### Response Object
| Property | Description | Type |
|----------|-------------|------|
| name | ชื่อป้ายรถเมล์ | Object |
| &nbsp;&nbsp;&nbsp;&nbsp;th | ชื่อภาษาไทย | String |
| &nbsp;&nbsp;&nbsp;&nbsp;en | ชื่อภาษาอังกฤษ | String |
| id | รหัสของ ป้ายรถเมล์ | String |
| bus_line | รหัสของสายรถเมล์ | String |
| sort_no | ลำดับของป้ายรถเมล์ในสายรถเมล์ | Number |

#### Example Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-stops/1?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY`

```
{
    name: {
        th: "ตรงข้ามโรงพยาบาลเจริญกรุง(ตรงข้ามซอยเจริญกรุง 86)",
        en: "Opposite ropchut charoen krung"
    },
    id: "1",
    bus_line_id: "1",
    sort_no: 1
}
```

----

## Advanced Options
ตัวเลือกเพิ่มเติมสำหรับการรับข้อมูล

| Property | Description | Type | Allowed Values | Default Value |
|----------|-------------|--|----------------|---------------|
| centroid | แสดงจุดศูนย์กลางของพื้นที่ที่ค้นหา (ไม่รองรับ `Route regions`) | boolean | true, false | false |
| polygon | แสดงข้อมูลเชิง Geometry ของจังหวัด อำเภอ ตำบล (ไม่รองรับ `Route regions, educations`)| boolean | true, false | false |
| geom_line | แสดงข้อมูลเชิง Geometry ของสายรถเมล์ | boolean | true, false | false |


### Example
#### 1. แสดง Centroid ใน Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces/01?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY&centroid=true`

```
{
    "name": {
        "th": "กรุงเทพมหานคร",
        "en": "Bangkok"
    },
    "centroid": {
        lng: 100.620453270956,
        lat: 13.7676578582668
    },
    "code": "01",
    "region_code": "2"
}
```

#### 2. แสดง Polygon ใน Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/provinces/01?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY&polygon=true`

```
{
    "name": {
        "th": "กรุงเทพมหานคร",
        "en": "Bangkok"
    },
    "polygon": [
        [
            11199188.4986,
            1567874.7537
        ],
        ...
    ]
    "code": "01",
    "region_code": "2"
}
```

#### 3. แสดง Line ใน Response
> **GET** `https://api-maps.thinknet.co.th/v1/static/bus-lines/1?app_id=YOUR_APP_ID&api_key=YOUR_API_KEY&geom_line=true`

```
{
    id: "1",
    label: {
        th: "1",
        en: "1"
    },
    bus_start: {
        th: "ถนนตก",
        en: "Thanon Tok"
    },
    bus_end: {
        th: "ท่าเตียน",
        en: "Tha Tien"
    },
    geom_line: [
        [
            100.365471839905,
            101.13.6331833617744
        ],
        ...
    ]
}
```
