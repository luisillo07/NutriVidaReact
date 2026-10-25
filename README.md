# NutriVida — Team Salud

Aplicación frontend para una clínica nutricional de Temuco, desarrollada con React y Vite. Permite consultar servicios y profesionales, solicitar una cita y gestionarla según el rol de paciente o secretaría.

El proyecto académico utiliza datos simulados. Las citas se asocian con los pacientes mediante el RUT y se mantienen en el estado de la aplicación durante la navegación.

## Integrantes

- Javier Espinoza — jav.espinozav@duocuc.cl
- Benjamin Neira — ben.neiran@duocuc.cl
- Luis Laffertte — lu.laffertte@duocuc.cl

## Caso de negocio y alcance

NutriVida busca facilitar el acceso a la información de la clínica y la gestión de citas entre pacientes y secretaría. El recorrido principal consiste en solicitar una cita, ingresar con una cuenta de demostración y consultar o gestionar esa reserva.

La aplicación incluye:

- Páginas de Inicio, Servicios, Nosotros, Nutricionistas y Contacto.
- Formulario de contacto con validación y confirmación de envío simulada.
- Inicio de sesión con usuarios simulados y navegación según su rol.
- Solicitud pública de citas, sin necesidad de iniciar sesión previamente.
- Consulta de citas propias por RUT y reprogramación o cancelación del paciente.
- Consulta de todas las citas, confirmación, cancelación y eliminación por secretaría.
- Componentes reutilizables organizados mediante Atomic Design y diseño responsivo con Bootstrap.
- Diez pruebas con Vitest y reporte de cobertura.

## Tecnologías

| Área | Herramientas |
| --- | --- |
| Interfaz y estado | React 19, JavaScript, JSX |
| Desarrollo y compilación | Vite 8 |
| Navegación | React Router DOM |
| Diseño | Bootstrap 5, React Bootstrap, CSS |
| Pruebas | Vitest 5, Testing Library, jsdom |
| Cobertura | Proveedor V8 de Vitest |
| Análisis de código | Oxlint |

Las dependencias se declaran en [package.json](package.json) y sus versiones resueltas están en [package-lock.json](package-lock.json).

## Instalación y ejecución

El entorno comprobado utiliza **Node.js 24.18.1** y npm. Para consultar las versiones instaladas:

```bash
node --version
npm --version
```

Clona el repositorio y entra en la carpeta que contiene `package.json`:

```bash
git clone https://github.com/luisillo07/NutriVidaReact.git
cd NutriVidaReact
npm install
npm run dev
```

Abre la dirección que indique Vite en la terminal, normalmente `http://localhost:5173/`. Si el puerto está ocupado, Vite puede utilizar otro. No se requieren variables de entorno ni un backend para esta demostración.

## Cuentas de demostración

Los usuarios se encuentran en [src/data/usuarios.js](src/data/usuarios.js). Son cuentas simuladas para el proyecto académico.

| Rol | Nombre | Correo | Contraseña | RUT |
| --- | --- | --- | --- | --- |
| Paciente | Carlos Pinto | carlospinto@gmail.com | carlos1234 | 12.345.678-5 |
| Secretaría | Carla Pinto | carlapinto@nutrivida.cl | carla1234 | 11.111.111-1 |

Al ingresar, el paciente es dirigido a **Mis citas** y la secretaria a **Gestión de citas**. El menú **Mi cuenta** permite regresar al listado correspondiente y cerrar sesión.

Para demostrar la asociación por RUT, solicita una cita con `12.345.678-5` y luego ingresa como Carlos. Su reserva aparecerá aunque se haya solicitado antes de iniciar sesión. Los puntos, espacios, guion y mayúsculas de la letra K se normalizan para comparar los RUT.

## Rutas y acceso

El mapa de rutas está en [src/App.jsx](src/App.jsx).

| Ruta | Página | Acceso |
| --- | --- | --- |
| `/` | Inicio | Público |
| `/servicios` | Servicios | Público |
| `/nosotros` | Nosotros | Público |
| `/nutricionistas` | Nutricionistas | Público |
| `/contacto` | Contacto | Público |
| `/login` | Inicio de sesión | Público |
| `/agendar` | Solicitar cita | Público |
| `/mis-citas` | Mis citas | Paciente |
| `/gestion-citas` | Gestión de citas | Secretaría |
| Cualquier otra dirección (`*`) | Página no encontrada | Público |

Al intentar entrar a un listado privado sin el rol correspondiente, la aplicación redirige a `/login`.

`main.jsx` monta la aplicación y `App.jsx` contiene `BrowserRouter`, `Routes` y las rutas. Las páginas y la plantilla usan el router; los componentes de navegación reciben funciones mediante props. Los enlaces conservan su `href` y cancelan la recarga con `preventDefault()` para navegar dentro de React.

## CRUD de citas y permisos

Las citas comienzan con estado **Pendiente** y un identificador generado con `crypto.randomUUID()`.

| Operación | Quién puede realizarla | Comportamiento |
| --- | --- | --- |
| Crear | Cualquier visitante | Solicita una cita con los datos del paciente y un horario válido. |
| Consultar | Paciente | Ve las citas asociadas con su RUT. |
| Consultar | Secretaría | Ve todas las citas registradas en la sesión de la aplicación. |
| Reprogramar | Paciente | Cambia fecha y hora de una cita propia futura, Pendiente o Confirmada. Vuelve a quedar Pendiente. |
| Confirmar | Secretaría | Confirma una cita Pendiente futura, después de volver a validar el horario. |
| Cancelar | Paciente o secretaría | Cancela una cita futura activa; el paciente solo puede cancelar las propias. |
| Eliminar | Secretaría | Quita definitivamente del listado una cita Cancelada, incluso si su fecha ya pasó. |

**Cancelar y eliminar son acciones diferentes:** cancelar conserva el registro y libera su horario; eliminar lo quita del arreglo. Las acciones disponibles se muestran en cada tarjeta y se confirman mediante un diálogo.

## Reglas y validaciones

Las validaciones generales están en [src/utils/validaciones.js](src/utils/validaciones.js) y las reglas de agenda en [src/utils/citas.js](src/utils/citas.js).

- Nombre, RUT, correo, teléfono, nutricionista, fecha, hora y motivo son obligatorios en la solicitud.
- El RUT se normaliza y su dígito verificador se comprueba con módulo 11.
- El correo debe tener un formato válido y el teléfono debe corresponder al formato móvil chileno admitido, por ejemplo `912345678` o `+56912345678`.
- El profesional seleccionado debe existir y atender el día solicitado.
- La fecha y hora deben ser válidas y futuras, interpretadas en la zona local del navegador.
- Cada cita dura **30 minutos** y debe comenzar en un bloque de 30 minutos contado desde la apertura del profesional.
- La cita completa debe quedar dentro del horario de atención.
- Se impiden superposiciones tanto del nutricionista como del paciente, comparando este último por RUT.
- Las citas Canceladas no ocupan horario. Al reprogramar se excluye la propia cita de la búsqueda de conflictos.
- Las operaciones comprueban rol, propiedad, estado y fecha de la cita antes de modificarla.

Los días y horarios de cada profesional están definidos en [src/data/nutricionistas.js](src/data/nutricionistas.js).

## Arquitectura y Atomic Design

Estructura resumida; se muestran algunos componentes representativos de cada nivel:

```text
NutriVidaReact/
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/          # Boton, Enlace, EntradaTexto, Imagen…
│   │   ├── molecules/      # FormularioCampo, CampoSeleccion, TarjetaCita…
│   │   ├── organisms/      # Formularios, ListaCitas, navegación y footer
│   │   │   ├── formulario_login.jsx
│   │   │   ├── formulario_login.test.jsx
│   │   │   ├── formulario_cita.jsx
│   │   │   └── formulario_cita.test.jsx
│   │   └── templates/      # PlantillaPrincipal
│   ├── data/               # Usuarios, profesionales y contenido simulado
│   ├── pages/              # Las páginas del mapa de rutas
│   ├── utils/
│   │   ├── validaciones.js
│   │   ├── validaciones.test.js
│   │   ├── citas.js
│   │   └── citas.test.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── setupTests.js
└── coverage/               # Generada por Vitest; excluida de Git
```

| Pieza | Responsabilidad |
| --- | --- |
| Átomos | Elementos básicos reutilizables, como botones e inputs. |
| Moléculas | Combinaciones pequeñas, como un campo con etiqueta y error o una tarjeta de cita. |
| Organismos | Formularios, listados, navegación y footer. Reciben datos y acciones mediante props. |
| Plantilla | Estructura común de cabecera, contenido recibido por `children` y pie. |
| Páginas | Contenido de cada ruta y conexión con la plantilla. |
| App | Estado compartido de usuario y citas, acciones del CRUD y mapa de rutas. |
| Utils | Funciones de validación y reglas reutilizadas por los formularios y las acciones. |

`useState` guarda los campos, errores y resultados de los formularios. También mantiene `usuarioActual` y `citas` en `App`. Los datos bajan mediante props y los componentes avisan al padre mediante funciones como `onIngresar` y `onAgendar`. Las actualizaciones de citas crean nuevos arreglos y objetos con operaciones como `map`, `filter` y el operador de propagación (`...`).

## Pruebas unitarias

Las pruebas utilizan Vitest, jsdom y Testing Library. Cada caso sigue la preparación, acción y comprobación (Arrange, Act, Assert), con la sintaxis `describe`, `it` y `expect`.

| Archivo | Casos |
| --- | --- |
| `src/utils/validaciones.test.js` | 3: normalizar el RUT, aceptar un dígito correcto y rechazar uno incorrecto. |
| `src/utils/citas.test.js` | 3: fecha pasada, horario ocupado del profesional y cita de otro paciente. |
| `src/components/organisms/formulario_login.test.jsx` | 2: contraseña incorrecta e ingreso válido. |
| `src/components/organisms/formulario_cita.test.jsx` | 2: solicitud vacía y solicitud válida. |

Son **10 casos pequeños**: seis de funciones y cuatro de componentes. Las funciones del padre se simulan con `vi.fn()` para observar sus llamadas. `setupTests.js` fija la fecha de prueba al 7 de enero de 2030 a las 08:00 locales y limpia los componentes y los espías después de cada caso.

```bash
npm test                 # Modo vigilante; salir con q
npm run test:run         # Ejecutar las diez una vez
npm run test:cov         # Ejecutar y medir cobertura
npm run lint            # Analizar el código
```

`test:watch` y `test:coverage` se conservan como nombres alternativos del modo vigilante y de cobertura.

### Resultados y cobertura

La ejecución del **25 de octubre de 2026** terminó con **10 pruebas aprobadas, 0 fallidas y 0 omitidas**.

| Métrica global | Cobertura |
| --- | --- |
| Instrucciones | 35,21 % |
| Ramas | 38,43 % |
| Funciones | 23,48 % |
| Líneas | 37,53 % |

Se mide todo el código JavaScript y JSX de `src`, incluso los archivos que estas diez pruebas no ejecutan. Se excluyen las pruebas y `setupTests.js`. Las rutas, las acciones de App y el recorrido completo del CRUD no están automatizados en esta selección.

Después de ejecutar `npm run test:cov`, abre `coverage/index.html`. La carpeta `coverage/` se regenera localmente y no se sube a Git. Los porcentajes corresponden a la ejecución indicada y pueden cambiar al modificar el código o las pruebas.

## Recorrido principal

1. Abre `/agendar` y solicita una cita futura con el RUT de Carlos, eligiendo un día y horario de atención del profesional.
2. Ingresa como paciente y consulta la reserva en **Mis citas**.
3. Reprograma a otro horario disponible; la cita quedará Pendiente.
4. Cierra sesión e ingresa como secretaría. Confirma la solicitud desde **Gestión de citas**.
5. Cancela la cita y comprueba que conserve el registro con estado Cancelada.
6. Elimina la cita cancelada y comprueba que desaparezca del listado.
7. Ejecuta las diez pruebas y consulta la cobertura.

Para comprobar el filtro por RUT, también puedes registrar una cita de otro paciente en un horario disponible: Carlos no debe verla y secretaría sí. Esta revisión del CRUD es manual y adicional a las diez pruebas unitarias.

## Compilación y alojamiento

```bash
npm run build
npm run preview
```

`build` genera la carpeta `dist/`; `preview` permite revisar esa compilación localmente en la dirección que indique la terminal. Al alojar `dist/`, configura el servidor para devolver `index.html` cuando se abra directamente una ruta como `/mis-citas`, ya que la aplicación utiliza `BrowserRouter`.

## Limitaciones actuales

- La sesión y las citas viven en memoria: navegar o cerrar sesión conserva las reservas, pero recargar la página reinicia la sesión y borra las citas.
- El acceso por roles y las credenciales se simulan en el frontend; no existe autenticación de servidor ni una base de datos.
- El formulario de contacto valida y muestra una confirmación simulada; no envía correos ni guarda mensajes en un servidor.
- El enlace **Regístrate** se conserva en el login, pero todavía no tiene un flujo de registro implementado.
- Las pruebas no comprueban la apariencia responsiva real, el mapa externo ni todas las reglas del CRUD. La cobertura muestra las partes sin ejecutar.
- La instalación de dependencias informó dos vulnerabilidades altas; su revisión queda pendiente.
