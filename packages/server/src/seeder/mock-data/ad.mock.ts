import { ATTRIBUTE_NAMES, CURRENCY } from 'src/util/constants';

export const AdMock = [
  {
    name: 'Eladó nagypolgári lakás, szép, szecessziós házban',
    price: 315000,
    currency: CURRENCY.EURO,
    description:
      'Eladó egy szép szecessziós házban egy teljesen felújított, kicsi közös előtérrel két lakássá osztott 4. emeleti lakás. A felújítás során létrehoztak egy nappali + 2 hálószobás, 2 fürdőszobás, valamint egy garzonlakást. A hálószobákban és a garzonban is egy-egy galériázott rész növeli a hasznos térkihasználást. Belmagasság 380 cm. Ebben a felállásban a lakás kitűnően tudja mind a hosszútávú lakáskiadást, mind két generáció együtt- és különélését szolgálni. A lakás csendes, világos, a lift és a bejárat között egy zárható ajtó teszi még biztonságosabbá. Központi elhelyezkedésének köszönhetően könnyedén elérhető az összes fontos fővárosi hivatal, felsőoktatási intézmény, színház és még sok minden más. A lakásnak egy tulajdonosa van, per- és tehermentes, azonnal birtokba vehető. További részletek személyesen, hívjon bizalommal!',
    images: [
      'https://img.jofogas.hu/hdimages/Nagypolgari_lakas__szep__szecesszios_hazban_az_Astorianal_179671832713263.jpg',
      'https://img.jofogas.hu/hdimages/Nagypolgari_lakas__szep__szecesszios_hazban_az_Astorianal_173231832713264.jpg',
      'https://img.jofogas.hu/hdimages/Nagypolgari_lakas__szep__szecesszios_hazban_az_Astorianal_174321832713366.jpg',
    ],
    thumbnail:
      'https://img.jofogas.hu/hdimages/Nagypolgari_lakas__szep__szecesszios_hazban_az_Astorianal_179671832713263.jpg',
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.FLOOR,
        value: 4,
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.YEAR_OF_CONSTRUCTION,
        value: 1997,
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.ROOMS,
        value: 4,
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.USABLE_AREA,
        value: 96,
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'elado-lakas',
  },
  {
    name: 'Eladó egy újszerű Canon 1DX II sok extrával',
    price: 12000,
    currency: CURRENCY.LEI,
    description:
      'Eladó egy újszerű, 77E expós Canon 1DX II dobozával, összes gyári tartozékával, plusz extra tartozékkal(plusz akku, 1db 128Gb Sandisk Pro Cfast, 1db 64Gb Transcend Cfast, valamint 1db Cfast kártya olvasó).',
    images: [
      'https://img.jofogas.hu/hdimages/Elado_egy_ujszeru_Canon_1DX_II_sok_extraval_498201896703787.jpg',
      'https://img.jofogas.hu/hdimages/Elado_egy_ujszeru_Canon_1DX_II_sok_extraval_508731896703859.jpg',
      'https://img.jofogas.hu/hdimages/Elado_egy_ujszeru_Canon_1DX_II_sok_extraval_507781896703597.jpg',
    ],
    thumbnail:
      'https://img.jofogas.hu/hdimages/Elado_egy_ujszeru_Canon_1DX_II_sok_extraval_498201896703787.jpg',
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.CAMERA_PHOTO.CONDITION,
        value: 'Használt',
      },
      {
        key: ATTRIBUTE_NAMES.CAMERA_PHOTO.BRAND,
        value: 'Canon',
      },
      {
        key: ATTRIBUTE_NAMES.CAMERA_PHOTO.CATEGORY,
        value: 'Fényképezőgép',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'fenykepezogep-kamera',
  },
  {
    name: 'AUDI RS6 Avant 4.0 V8 TFSI Performance quattro',
    price: 63000,
    currency: CURRENCY.EURO,
    description:
      '46.573 KM Futás! Performance! Limitált Kiadás! 2017 Modellév! Teljesen újszerű műszaki, esztétikai és szerkezeti állapotú autó. Kopásmentes minden porcikáján újszerű utastér. Km futása garantált, akár hivatalos szakszervizben is átvizsgáltatható. Jelenleg frissen szervizelve, új gumikkal. Fényezése karcmentes, nincsenek horpadások, ajtórányitások. Matrix LED Fényszórók, Panoráma Tető, Bose HIFI, Nagy Navigáció, Nappa Sport Bőr Belső, 4 Zónás Klíma, Sávelhagyás Figyelmeztető, STB. Csere - Beszámtítás Lehetséges! Azonnal Elvihető, Tehermentes! Összes gyári dokumentációval, 3 db indítókulccsal, kódkártyával. Köszönjük, hogy megtekintette hirdetésünket! Folyamatosan bővülő, válogatott, kevés km-t futott, többségében gyári fényezésű készlettel várjuk ügyfeleinket. Állapotfelmérés és értékegyeztetés után gépjárművét készpénzért megvásároljuk, akár hitellel terhelt jármű esetén is. Autóink időpont egyeztetés alapján hétvégén is megtekinthetők. Biztosítás megkötése, Eredetiségvizsgálat továbbá Okmányirodai ügyintézés helyben megvárható! Autóink előzetes egyeztetés alapján szervizben átvizsgáltathatók.',
    images: [
      'https://img.jofogas.hu/hdimages/AUDI_RS6_Avant_4_0_V8_TFSI_Performance_quattro____689121866236094.jpg',
      'https://img.jofogas.hu/hdimages/AUDI_RS6_Avant_4_0_V8_TFSI_Performance_quattro____706721866236095.jpg',
      'https://img.jofogas.hu/hdimages/AUDI_RS6_Avant_4_0_V8_TFSI_Performance_quattro____721801866236290.jpg',
    ],
    thumbnail:
      'https://img.jofogas.hu/hdimages/AUDI_RS6_Avant_4_0_V8_TFSI_Performance_quattro____689121866236094.jpg',
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.CARS.COLOR,
        value: 'Szürke',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.BRAND,
        value: 'Audi',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.MODEL,
        value: 'A6',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.CAR_BODY,
        value: 'Kombi',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.CONDITION,
        value: 'Új',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.ENGINE_CAPACITY,
        value: 2016,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.GEARBOX,
        value: 'Manuális',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.TURNOVER,
        value: 46500,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.YEAR_OF_MANUFACTURE,
        value: 2006,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.COMBUSTIBLE,
        value: 'Benzin',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'auto',
  },
  {
    name:
      'Bontatlan Új iphone 12 Pro Max 256GB Azonnal Átvehető Deák Minden Szín',
    price: 5800,
    currency: CURRENCY.LEI,
    description:
      'Bontatlan Új iphone 12 Pro Max 256GB 1 év hivatalos Apple garancia Deák Térnél Azonnal Átvehető Minden Szín',
    images: [
      'https://img.jofogas.hu/hdimages/Bontatlan_Uj_iphone_12_Pro_Max_256GB_Azonnal_Atveheto_Deak_Minden_Szin_961901847251477.jpg',
      'https://frankfurt.apollo.olxcdn.com/v1/files/t7deuluxlgqc3-RO/image;s=1000x700',
    ],
    thumbnail:
      'https://img.jofogas.hu/hdimages/Bontatlan_Uj_iphone_12_Pro_Max_256GB_Azonnal_Atveheto_Deak_Minden_Szin_961901847251477.jpg',
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.PHONES.BRAND,
        value: 'Apple',
      },
      {
        key: ATTRIBUTE_NAMES.PHONES.CONDITION,
        value: 'Új',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'mobiltelefon-kommunikacio',
  },
  {
    name: 'Építési telek engedélyezési tervekkel eladó!',
    price: 45500,
    currency: 'euro',
    description:
      'A telken a közművek közül csatorna vezetékes víz és villany megtalálható, a gáz a telekhatáron. Ha gyorsan szeretne saját házat ez az Öné lehet és az átírást követően azonnal hozzákezdhet az építkezéshez!',
    images: [
      'https://img.jofogas.hu/hdimages/Epitesi_telek_engedelyezesi_tervekkel_elado__348331890402273.jpg',
      'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Im5nY2N3MHd2MmR0bS1BUk8iLCJ3IjpbeyJmbiI6Im8xemN3cmR4dDZ4bi1BUk8iLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.zfdihCgVeR5v6ek7XMVu-nOKBsHPExNxVUBtaFsZFFU/image;s=1280x1024;q=80',
      'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Im5nY2N3MHd2MmR0bS1BUk8iLCJ3IjpbeyJmbiI6Im8xemN3cmR4dDZ4bi1BUk8iLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.zfdihCgVeR5v6ek7XMVu-nOKBsHPExNxVUBtaFsZFFU/image;s=1280x1024;q=80',
    ],
    thumbnail:
      'https://img.jofogas.hu/hdimages/Epitesi_telek_engedelyezesi_tervekkel_elado__348331890402273.jpg',
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.LAND.USABLE_AREA,
        value: 875,
      },
      {
        key: ATTRIBUTE_NAMES.LAND.TYPE,
        value: 'Beltelek',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: 'telek',
  },
  {
    name: 'OLED Smart LG TV, 139 cm, OLED55B8PLA, 4K Ultra HD',
    price: 5500,
    currency: 'lei',
    description:
      'Lg (OLED55B8PLA) 139 cm, Ultra HD 4K Cinema HDR 10 Pro, Webos 4.0 Smart LED TV, inteligens Alpha7 processorral, Dolby Atmos térhangzás, 3840 x 2160 pixel, Dimming-Active Depth Enhance, digitális tunerek DVB-T, DVB-C, DVB-S, Dolby Digital, Wifi, DLNA támogatás, PVR támogatás, Böngésző, beépített Wi-Fi, HDMI 4 db, USB 3 db, magyar menü.',
    images: [
      'https://img.jofogas.hu/hdimages/Lg__OLED65B9PLA__165_cm__Ultra_HD_4K_Cinema_HDR_10_Pro__OLED_TV_501191899289695.jpg',
      'https://frankfurt.apollo.olxcdn.com/v1/files/f1gt0xkdl28i1-RO/image;s=1000x700',
    ],
    thumbnail:
      'https://img.jofogas.hu/hdimages/Lg__OLED65B9PLA__165_cm__Ultra_HD_4K_Cinema_HDR_10_Pro__OLED_TV_501191899289695.jpg',
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.TV.CONDITION,
        value: 'Használt',
      },
      {
        key: ATTRIBUTE_NAMES.TV.BRAND,
        value: 'LG',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: 'TV',
  },
];
