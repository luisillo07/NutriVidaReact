# Nombre del Equipo

- Team Salud

## Integrantes

- Javier Espinoza - jav.espinozav@duocuc.cl
- Benjamin Neira - ben.neiran@duocuc.cl
- Luis Laffertte - lu.laffertte@duocuc.cl

## Caso

NutriVida

## Descripción del caso

NutriVida es una aplicación orientada a digitalizar y presentar una solución web al negocio. 
La plataforma permite a los usuarios buscar información relevante y poder gestionar las citas con los profesionales en cuestión

El sistema busca facilitar el contacto entre los pacientes y la clínica, bajando la fricción y el ausentismo de citas por parte de los pacientes

## Estructura del proyecto

src/
├── assets/
├── components/
│   ├── atoms/
│   │   ├── boton.jsx
│   │   └── enlace.jsx
│   ├── molecules/
│   │   └── formulario_campo.jsx
│   ├── organisms/
│   │   └── formulario_login.jsx
│   └── templates/
├── pages/
│   └── login.jsx
├── App.jsx
├── index.css
└── main.jsx

## Tecnologías utilizadas

- React
- Vite
- React Bootstrap
- Bootstrap
- JavaScript
- HTML
- CSS

## Cómo ejecutar el proyecto

Primero clonar el repositorio y entrar a la carpeta:
- git clone https://github.com/luisillo07/NutriVidaReact.git
- cd NutriVidaReact

Luego instalar las dependencias:
- npm install

Ejecutar el proyecto: 
- npm run dev

Y finalmente abrir el navegador:
- http://localhost:5173/

## Navegación entre páginas

La navegación usa `react-router-dom`, siguiendo el enfoque de la guía del módulo.
`src/App.jsx` contiene `BrowserRouter`, `Routes` y el mapa de rutas:

- `/`: Inicio.
- `/nutricionistas`: Nutricionistas.
- `/login`: Login.
- `*`: página no encontrada, para cualquier otra dirección.

`main.jsx` solo monta `App`; el router vive en `App.jsx`.
`PlantillaPrincipal` llama a `useNavigate` y entrega la función `navigate` al menú
y al footer mediante la prop `onNavegar`. Estos componentes conservan sus enlaces
con `href`, cancelan la recarga con `preventDefault()` y llaman a `onNavegar(ruta)`.

```jsx
// Dentro de una página o plantilla, al nivel superior del componente:
const navigate = useNavigate();

// En un botón de esa página:
<button onClick={() => navigate("/nutricionistas")}>Ver nutricionistas</button>

// En App.jsx, para agregar una página previamente importada:
<Route path="/nueva-pagina" element={<NuevaPagina />} />
```

Solo las páginas y plantillas importan el router. Los átomos, moléculas y organismos
reciben funciones por props. Por ejemplo, `Enlace` recibe `onClick` y `Boton` también.
La navegación permite usar Atrás y Adelante sin recargar la aplicación.

Para agregar una página: crea su componente en `src/pages`, impórtalo en `App.jsx`,
agrega su `Route` y conecta el enlace correspondiente del menú y del footer con `ir`.
Servicios, Nosotros, Contacto y Agendar muestran la página no encontrada hasta que
se creen sus páginas y rutas.

En producción, configura el alojamiento para servir `index.html` cuando se abra
una ruta de la aplicación directamente (por ejemplo, `/nutricionistas`).

## Material complementario
https://drive.google.com/drive/folders/1lc6M8MVXT_l2MKJLL5OqpnABWThHOioA?usp=drive_link
