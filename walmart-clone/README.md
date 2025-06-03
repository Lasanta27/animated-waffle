# La Guelaguetza - Despliegue en Netlify

## Instrucciones de Despliegue

1. Ve a [Netlify](https://app.netlify.com)
2. Inicia sesión o crea una cuenta si aún no tienes una
3. En el dashboard de Netlify, haz clic en "Add new site" > "Deploy manually"
4. Arrastra y suelta la carpeta `walmart-clone` completa a la zona de despliegue
5. Espera a que Netlify complete el despliegue
6. Una vez completado, Netlify te proporcionará una URL (ejemplo: https://tu-sitio-12345.netlify.app)

## Verificación de Google Search Console

La configuración para Google Search Console ya está implementada:

1. Archivo de verificación: `google8cc75487fa326658.html`
2. Meta tag en `index.html`:
   ```html
   <meta name="google-site-verification" content="hFZ6m2pUZcs2daOnQMkiq_8N6937q2fCpHn0bi3cHDU">
   ```

Después del despliegue:
1. Usa la URL proporcionada por Netlify en Google Search Console
2. Haz clic en "Verificar"

## Estructura del Proyecto

```
walmart-clone/
├── index.html
├── google8cc75487fa326658.html
├── netlify.toml
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   └── main.js
└── categories/
    ├── alebrijes.html
    ├── barro-negro.html
    ├── huipiles.html
    ├── mezcal.html
    ├── tapetes.html
    └── textiles.html
