# Mi Colombia

Diario visual personal para recorrer los 32 departamentos de Colombia.

## Ejecutar localmente

```bash
npm install
npm run dev
```

La aplicación no usa servicios remotos durante el uso. Las geometrías GeoJSON se sirven desde `public/geo`, y los estados se guardan en `localStorage` del navegador.

## Mapa

`public/geo/colombia-departamentos.geojson` contiene los 32 polígonos departamentales con códigos DIVIPOLA (`dpto_ccdgo`) y nombres. Se descargó de la capa **Departamentos** del servicio territorial 2025 del DANE, se simplificó para reducir su tamaño y se ajustó la orientación de los anillos exteriores para que la proyección SVG represente correctamente los polígonos. Bogotá D. C. se excluye porque el alcance del proyecto son los 32 departamentos. Fuente: [DANE Geoportal](https://geoportal.dane.gov.co/mparcgis/rest/services/Territoriales_DANE/Serv_Territoriales_DANE_2025/MapServer/1).

La representación usa SVG con la proyección Mercator de `d3-geo`, sin teselas ni dependencia de un proveedor de mapas. La simplificación geométrica se ejecutó conservando las formas; el archivo local mantiene los atributos identificadores del DANE.

## Datos personales

Los estados se almacenan en `localStorage` bajo la clave `mi-colombia-experiences-v1`. Se mantienen separados del catálogo geográfico. Los registros anteriores con estado `explored` se migran automáticamente a `visited`.

## Banderas departamentales

Los SVG de banderas se guardan en `public/flags` y se incluyen en el mapa localmente. La colección parte de [fonttools/region-flags](https://github.com/fonttools/region-flags); para San Andrés usé el archivo departamental de Wikimedia Commons porque el de la colección era un marcador genérico. `public/flags/COPYING.txt` conserva la nota de licencia y `public/flags/sources.json` enlaza cada código con su archivo fuente.

El Archipiélago de San Andrés, Providencia y Santa Catalina es un solo departamento (DIVIPOLA 88). Como sus islas están lejos del territorio continental y quedan diminutas a escala nacional, el mapa las muestra en un recuadro ampliado e interactivo.
