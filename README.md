# JetBreak

> Plataforma full-stack para el seguimiento de vuelos en tiempo real y la gestión de reclamos a aerolíneas.

[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Características principales](#características-principales)
- [Arquitectura](#arquitectura)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [API REST](#api-rest)
- [Modelo de datos](#modelo-de-datos)
- [Autenticación](#autenticación)
- [Documentación Swagger](#documentación-swagger)
- [Scripts disponibles](#scripts-disponibles)
- [Testing](#testing)
- [Despliegue en Railway](#despliegue-en-railway)
- [Usuario de prueba](#usuario-de-prueba)

---

## Descripción

**JetBreak** es una aplicación web que permite a los usuarios gestionar su experiencia de vuelo de extremo a extremo: consultar llegadas y salidas en aeropuertos, hacer seguimiento de vuelos por código IATA, descubrir ofertas, encontrar comercios cercanos y registrar reclamos formales contra aerolíneas en caso de incidencias.

El sistema integra múltiples APIs aeronáuticas (Amadeus, Aviation Stack, Aviation Edge) y de geolocalización (Foursquare Places) detrás de un backend en Express con caché Redis, exponiendo una interfaz React moderna construida con Tailwind CSS y HeroUI.

---

## Características principales

- **Seguimiento de vuelos**: registra y monitorea vuelos por código IATA con estado actualizado.
- **Búsqueda de vuelos**: consulta llegadas y salidas de cualquier aeropuerto.
- **Geolocalización**: encuentra aeropuertos y comercios cercanos a partir de coordenadas GPS.
- **Ofertas de vuelos**: explora deals integrados desde la API de Amadeus.
- **Gestión de reclamos**: registra incidencias contra aerolíneas con tipo, fecha y descripción.
- **Autenticación segura**: registro, login y recuperación de contraseña por email con JWT.
- **Caché inteligente**: Redis reduce llamadas redundantes a APIs externas.
- **Documentación interactiva**: especificación OpenAPI servida con Swagger UI.

---

## Arquitectura

```
┌─────────────────┐      HTTPS/JSON      ┌─────────────────┐
│                 │ ◄──────────────────► │                 │
│   Frontend      │                      │   Backend       │
│   React + Vite  │                      │   Express 5     │
│   :5173         │                      │   :3000         │
│                 │                      │                 │
└─────────────────┘                      └────────┬────────┘
                                                  │
                          ┌───────────────────────┼───────────────────────┐
                          │                       │                       │
                          ▼                       ▼                       ▼
                  ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
                  │  PostgreSQL  │        │    Redis     │        │  APIs        │
                  │  (Sequelize) │        │   (Cache)    │        │  externas    │
                  └──────────────┘        └──────────────┘        └──────────────┘
```

---

## Stack tecnológico

### Backend

| Categoría | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express `5.1` |
| ORM | Sequelize `6.37` |
| Base de datos | PostgreSQL `pg 8.16` (soporte SQLite para desarrollo) |
| Caché | Redis `5.7` |
| Autenticación | JSON Web Tokens (`jsonwebtoken 9`) + `bcrypt 6` |
| Email | Nodemailer `7` |
| Documentación | `swagger-jsdoc`, `swagger-ui-express`, `swagger-autogen` |
| Testing | Jest `29` + Supertest `7` |
| APIs externas | Amadeus, Aviation Stack, Aviation Edge, Foursquare Places, Duffel |

### Frontend

| Categoría | Tecnología |
|---|---|
| Framework | React `19` + TypeScript `5.8` |
| Build tool | Vite `7` |
| Estilos | Tailwind CSS `4` |
| Componentes UI | HeroUI `2.8` |
| Routing | React Router DOM `7` |
| Estado global | React Context API |
| Iconos | Lucide React |
| Animaciones | Framer Motion `12` |
| Calidad de código | ESLint `9`, Prettier `3.6` |

---

## Estructura del proyecto

```
jet-break/
├── backend/
│   ├── config/              # Configuración de base de datos
│   ├── controllers/         # Lógica de negocio
│   ├── models/              # Modelos Sequelize
│   ├── routes/              # Definición de endpoints
│   ├── middlewares/         # Middleware de autenticación, etc.
│   ├── mocks/               # Datos de prueba
│   ├── tests/               # Suites Jest
│   ├── app.js               # Configuración Express
│   ├── server.js            # Punto de entrada
│   ├── redis.js             # Cliente Redis
│   └── swagger-config.js    # Configuración OpenAPI
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes React (Login, Tracking, Claims, ...)
    │   ├── context/         # AuthContext
    │   ├── services/        # Clientes de API
    │   ├── models/          # Tipos TypeScript
    │   ├── App.tsx          # Rutas principales
    │   ├── main.tsx         # Bootstrap React
    │   └── ProtectedRoute.tsx
    ├── vite.config.ts
    └── tsconfig.json
```

---

## Requisitos previos

- **Node.js** >= 18
- **npm** >= 9
- **PostgreSQL** >= 14 (local o gestionado)
- **Redis** >= 6
- Claves de API válidas para los servicios externos (ver [Variables de entorno](#variables-de-entorno))

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd jet-break

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

---

## Variables de entorno

Crear un archivo `.env` dentro de `backend/` con las siguientes variables:

### Servidor y seguridad

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor backend (por defecto `3000`, Railway lo inyecta) |
| `JWT_SECRET` | Secreto para firmar los JSON Web Tokens |
| `CACHE_TIME` | TTL del caché Redis en segundos (ej. `86400`) |
| `FRONTEND_URL` | Origen permitido por CORS. Acepta varios separados por coma (ej. `http://localhost:5173,https://jet-break.vercel.app`) |

### Base de datos PostgreSQL

Se admiten dos modos de configuración (se prioriza `DATABASE_URL` si está presente):

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión completa (la inyecta Railway al añadir el plugin PostgreSQL) |
| `NAME_DB` | Nombre de la base de datos (modo local) |
| `USER_DB` | Usuario de la base de datos (modo local) |
| `PASSWORD_DB` | Contraseña del usuario (modo local) |
| `HOST_DB` | Host del servidor PostgreSQL (modo local) |
| `PORT_DB` | Puerto de PostgreSQL (típicamente `5432`) |

### Redis (opcional)

| Variable | Descripción |
|---|---|
| `REDIS_URL` | Cadena de conexión Redis. Si no se define, la app arranca sin caché. |

### APIs externas

| Variable | Descripción |
|---|---|
| `AMADEUS_API_KEY` | Clave de la API de Amadeus |
| `AMADEUS_API_SECRET` | Secreto de la API de Amadeus |
| `AVIATION_STACK_API_KEY` | Clave de Aviation Stack |
| `AVIATION_EDGE_API_KEY` | Clave de Aviation Edge |
| `FOURSQUARE_API_KEY` | Clave de Foursquare Places |

### SMTP (recuperación de contraseña)

| Variable | Descripción |
|---|---|
| `SMTP_HOST` | Servidor SMTP (ej. `smtp.gmail.com`) |
| `SMTP_PORT` | Puerto SMTP (ej. `587`) |
| `SMTP_USER` | Cuenta de correo emisora |
| `SMTP_PASS` | Contraseña o app password |

---

## Ejecución

### Modo desarrollo

En dos terminales separadas:

```bash
# Terminal 1 — Backend
cd backend
npm start          # http://localhost:3000

# Terminal 2 — Frontend
cd frontend
npm run dev        # http://localhost:5173
```

El frontend ya está configurado para apuntar al backend en `http://localhost:3000`, y el backend permite CORS desde `http://localhost:5173`.

### Build de producción

```bash
cd frontend
npm run build      # Genera los assets en /dist
npm run preview    # Sirve el build localmente
```

---

## API REST

Todos los endpoints están prefijados con `/api`.

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/auth/register` | Registra un nuevo usuario |
| `POST` | `/auth/login` | Inicia sesión y emite JWT |
| `POST` | `/auth/logout` | Cierra la sesión |
| `POST` | `/auth/recover-password` | Envía email de recuperación |
| `POST` | `/auth/reset-password` | Restablece la contraseña con token |

### Vuelos

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/flights/arrivals/:iataCode` | Llegadas a un aeropuerto |
| `GET` | `/flights/departures/:iataCode` | Salidas desde un aeropuerto |
| `POST` | `/flights/tracking` | Crea un seguimiento de vuelo |
| `GET` | `/flights/tracking/:user_id` | Lista vuelos seguidos por el usuario |
| `DELETE` | `/flights/tracking/:user_id/:flight_id` | Elimina un seguimiento |

### Reclamos

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/claims` | Crea un nuevo reclamo |
| `GET` | `/claims` | Lista todos los reclamos |
| `GET` | `/claims/byUser/:userId` | Reclamos de un usuario |
| `DELETE` | `/claims/:id` | Elimina un reclamo |

### Aerolíneas y aeropuertos

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/airlines` | Lista de aerolíneas |
| `GET` | `/airlines/:airlineCode` | Detalle de aerolínea |
| `GET` | `/airports` | Lista de aeropuertos |
| `GET` | `/airports/:airportCode` | Detalle de aeropuerto |
| `GET` | `/airports/gps/:latitude/:longitude` | Aeropuertos cercanos por GPS |

### Ofertas y comercios

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/offers/:origin` | Ofertas desde un aeropuerto |
| `GET` | `/offers/detail/:conf` | Detalle de una oferta |
| `GET` | `/stores/:latitude/:longitude` | Comercios cercanos (Foursquare) |

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/users` | Lista de usuarios |
| `PUT` | `/users/:id` | Actualiza un usuario |
| `DELETE` | `/users/:id` | Elimina un usuario |

---

## Modelo de datos

```
┌──────────┐        ┌─────────────┐         ┌─────────┐
│   User   │ 1───n  │   Claim     │  n───1  │ Airline │
└─────┬────┘        └─────────────┘         └────┬────┘
      │ n                                        │ 1
      │                                          │
      │              ┌────────────┐              │
      └─── n───n ────│   Flight   │── n───1 ─────┘
                    └─────┬──────┘
                          │ n
                          │ n
                    ┌─────▼──────┐
                    │  Airport   │
                    └────────────┘
```

| Modelo | Campos clave |
|---|---|
| **User** | `id`, `name`, `email` (único), `password` (bcrypt), `resetToken`, `resetTokenExpires` |
| **Claim** | `id`, `user_id`, `airline_id`, `type`, `flight_iata`, `date`, `description` |
| **Flight** | `id`, `flight_iata`, `airline_id`, `date_departure`, `date_arrival`, `state` |
| **Airline** | `id`, `iata_code` (2 letras), `name` |
| **Airport** | `id`, `iata_code` (3 letras), `latitude`, `longitude`, `name`, `country` |
| **UserFlight** | Tabla pivote `user_id` ↔ `flight_id` |
| **FlightAirport** | Tabla pivote con `type` (`origen` \| `destino`) |

> El formato de `flight_iata` se valida con la expresión regular `^[A-Z]{2}[0-9]{1,4}$`.

---

## Autenticación

JetBreak implementa autenticación basada en **JWT** con cookies HTTP-only:

1. El usuario se registra o inicia sesión enviando email y contraseña.
2. El backend valida la contraseña con `bcrypt` y emite un token firmado con `JWT_SECRET`.
3. El token se entrega al cliente como cookie `token` (HTTP-only).
4. El frontend conserva el `user_id` en `localStorage` para personalizar la UI.
5. Las rutas protegidas (`/tracking`, `/claims`) usan el componente `ProtectedRoute`, que verifica la sesión vía `AuthContext` y redirige a `/login` si no es válida.

La recuperación de contraseña se realiza por correo: el backend genera un token temporal, lo envía por SMTP con Nodemailer y lo valida al restablecer.

---

## Documentación Swagger

La especificación OpenAPI se genera automáticamente y se sirve con Swagger UI:

```
http://localhost:3000/docs
```

La definición persiste en `backend/swagger-output.json` y se configura desde `backend/swagger-config.js`.

---

## Scripts disponibles

### Backend

```bash
npm start         # Inicia el servidor (node server.js)
npm run seed:user # Crea/actualiza el usuario de prueba en la BD
npm test          # Ejecuta la suite de tests con Jest
```

### Frontend

```bash
npm run dev       # Servidor de desarrollo Vite (puerto 5173)
npm run build     # Compila TypeScript y genera el bundle de producción
npm run preview   # Previsualiza el build de producción
npm run lint      # Ejecuta ESLint sobre el proyecto
```

---

## Testing

El backend cuenta con tests unitarios y de integración usando **Jest** y **Supertest**:

```bash
cd backend
npm test
```

Los archivos de prueba viven en `backend/tests/`.

---

## Despliegue en Railway

El backend está preparado para desplegarse en [Railway](https://railway.app/) con la base de datos PostgreSQL gestionada por la propia plataforma.

### 1. Crear el proyecto

1. Inicia sesión en Railway y crea un **New Project → Deploy from GitHub repo**.
2. Selecciona este repositorio.
3. Tras crear el servicio del backend, abre **Settings → Source** y establece **Root Directory** en `backend`. Railway detectará el `railway.json` y usará Nixpacks para construir el proyecto Node.js.

### 2. Añadir la base de datos PostgreSQL

1. Dentro del mismo proyecto: **+ New → Database → Add PostgreSQL**.
2. Una vez aprovisionada, ve al servicio del backend, pestaña **Variables**, y conéctala con **Add Reference → Postgres → `DATABASE_URL`**. Railway expondrá la URL completa de conexión.

> El archivo `backend/config/db.js` detecta automáticamente `DATABASE_URL`. En desarrollo local puedes seguir usando las variables individuales (`NAME_DB`, `USER_DB`, etc.).

### 3. Variables de entorno en Railway

En la pestaña **Variables** del servicio backend define como mínimo:

| Variable | Valor |
|---|---|
| `JWT_SECRET` | un secreto seguro (ej. `openssl rand -hex 32`) |
| `CACHE_TIME` | `86400` |
| `FRONTEND_URL` | `https://jet-break.vercel.app` (frontend desplegado en Vercel) |
| `DATABASE_URL` | referencia a Postgres (paso anterior) |
| `AMADEUS_API_KEY`, `AMADEUS_API_SECRET` | credenciales Amadeus |
| `AVIATION_STACK_API_KEY` | clave Aviation Stack |
| `AVIATION_EDGE_API_KEY` | clave Aviation Edge |
| `FOURSQUARE_API_KEY` | clave Foursquare |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | configuración de correo |
| `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `TEST_USER_NAME` | (opcional) sobrescriben las credenciales del usuario de prueba |

> `PORT` lo inyecta Railway automáticamente.
>
> `REDIS_URL` es opcional. Puedes añadir un plugin Redis con **+ New → Database → Add Redis** y referenciar `REDIS_URL` igual que con Postgres. Si lo omites, la app arranca sin caché.

### 4. Despliegue y verificación

1. Tras configurar las variables, Railway redeployará automáticamente.
2. Genera un dominio público desde **Settings → Networking → Generate Domain**.
3. Comprueba que la API responde en `https://<tu-dominio>.up.railway.app/docs` (Swagger).
4. En el proyecto de Vercel ([jet-break.vercel.app](https://jet-break.vercel.app)), actualiza la variable de entorno que apunta al backend para que use el dominio público de Railway, y redeployea el frontend.

### 5. Crear el usuario de prueba en producción

Desde el dashboard del servicio backend en Railway, abre **⋮ → One-off command** (o usa la [Railway CLI](https://docs.railway.app/develop/cli)) y ejecuta:

```bash
npm run seed:user
```

Esto crea (o actualiza si ya existe) el usuario de prueba documentado abajo. Con la **Railway CLI** sería:

```bash
railway run npm run seed:user
```

---

## Usuario de prueba

Para evaluar la aplicación sin tener que registrar una cuenta nueva, el script `npm run seed:user` provisiona el siguiente usuario:

| Campo | Valor |
|---|---|
| **Email** | `demo@jetbreak.com` |
| **Contraseña** | `JetBreak2026!` |
| **Nombre** | `Usuario Demo` |

> Estas credenciales pueden sobrescribirse mediante las variables `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` y `TEST_USER_NAME`.

Para crearlo en local:

```bash
cd backend
npm run seed:user
```

---

## Licencia

Proyecto académico desarrollado en el marco del Máster en UEM.
