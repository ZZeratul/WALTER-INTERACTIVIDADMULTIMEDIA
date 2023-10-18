# Manual de instalación

## 1. Requerimientos

| Nombre       | Versión | Descripción                                            | Instalación                                      |
| ------------ | ------- | ------------------------------------------------------ | ------------------------------------------------ |
| `PostgreSQL` | ^16     | Gestor de base de datos.                               | https://www.postgresql.org/download/linux/debian |
| `NodeJS`     | ^18     | Entorno de programación de JavaScript.                 | `nvm install 18` https://github.com/nvm-sh/nvm   |
| `NPM`        | ^9      | Gestor de paquetes de NodeJS.                          | `npm install -g npm@9.7.1`                       |
| `PM2`        | ^5.3    | Gestor avanzado de procesos de producción para NodeJS. | `npm install -g pm2@5.3`                         |

## 2. Instalación

### Clonación del proyecto e instalación de dependencias

```bash
# Clonación del proyecto
git clone https://gitlab.softwarelibre.gob.bo/capacitacion/nestjs-base-backend.git

# Ingresamos dentro de la carpeta del proyecto
cd nestjs-backend-base

# Cambiamos a la rama principal
git checkout main

# Instalamos dependencias
npm install
```

### Archivos de configuración.

Copiar archivos `.sample` y modificar los valores que sean necesarios (para más detalles revisa la sección **Variables
de entorno**).

```bash
# Variables de entorno globales
cp .env.sample .env

# Otros parámetros requeridos
cp src/common/params/index.ts.sample src/common/params/index.ts

# [OPCIONAL] Para el modo producción
cp ecosystem.config.js.sample ecosystem.config.js
```

### Creación y configuración de la Base de Datos

```bash
# Crear los siguientes esquemas de base de datos:
create schema proyecto;
create schema usuarios;
create schema parametricas;
```

Para más detalles ver el archivo [database/scripts/CREATE_DATABASE.md](./database/scripts/CREATE_DATABASE.md)

```bash
# Configura la base de datos.
npm run setup
```

### Despliegue de la aplicación

```bash
# Ejecución en modo desarrollo
npm run start

# Ejecución en modo desarrollo (live-reload)
npm run start:dev

# Ejecución en modo desarrollo (muestra logs de las consultas SQL)
npm run start:dev:sql

# Ejecución en modo PRODUCCIÓN
npm run build
npm run start:prod

# Ejecución en modo PRODUCCIÓN (con proceso activo en segundo plano)
npm run build
pm2 start ecosystem.config.js
```

### Ejecución de pruebas unitarias y de integración

```bash
# Todas las pruebas
npm run test

# Pruebas e2e
npm run test:e2e

# Pruebas de cobertura
npm run test:cov
```

### Comandos útiles para el modo desarrollo

```bash
# Verifica la sintaxis
npm run lint

# Crea una nueva migración
npm run seeds:create database/seeds/addColumnCategoria

# Ejecuta las migraciones
npm run seeds:run
```

**Nota.—** También puede habilitar de manera fija el log de las consultas SQL cambiando el valor de la variable de
entorno `LOG_SQL=true` o temporalmente levantando la aplicación con el comando `npm run dev`

### Variables de entorno

**Datos de despliegue**

| Variable   | Valor por defecto | Descripción                                                    |
| ---------- | ----------------- | -------------------------------------------------------------- |
| `NODE_ENV` | `development`     | Ambiente de despliegue (`development`, `test` o `production`). |
| `PORT`     | `3000`            | Puerto en el que se levantará la aplicación.                   |

\*\*\* La URL de despliegue sería: `http://localhost:3000/api/estado`

**Configuración de la base de datos**

| Variable                 | Valor por defecto | Descripción                                                                                       |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------- |
| `DB_HOST`                | `localhost`       | Host de la base de datos.                                                                         |
| `DB_USERNAME`            | `postgres`        | nombre de usuario de la base de datos.                                                            |
| `DB_PASSWORD`            | `postgres`        | contraseña de la base de datos.                                                                   |
| `DB_DATABASE`            | `database_db`     | nombre de la base de datos.                                                                       |
| `DB_PORT`                | `5432`            | puerto de despliegue de la base de datos.                                                         |
| `DB_SCHEMA`              | `proyecto`        | Utilizado para almacenar las tablas del proyecto, y todo lo relacionado con la lógica de negocio. |
| `DB_SCHEMA_USUARIOS`     | `usuarios`        | Utilizado para almacenar la tabla usuarios, roles y todo lo relacionado con la autenticación.     |
| `DB_SCHEMA_PARAMETRICAS` | `parametricas`    | Utilizado para almanecar tablas de tipo paramétricas.                                             |

**Configuración general de la aplicación**

| Variable                     | Valor por defecto | Descripción                                                                  |
| ---------------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `PATH_SUBDOMAIN`             | `api`             | Prefijo para todas las rutas de los servicios (Se debe mantener este valor). |
| `REQUEST_TIMEOUT_IN_SECONDS` | `30`              | Tiempo máximo de espera para devolver el resultado de una petición.          |

**Configuración para módulo de autenticación**

| Variable                   | Valor por defecto | Descripción                                                                             |
| -------------------------- | ----------------- | --------------------------------------------------------------------------------------- |
| `JWT_SECRET`               |                   | Llave para generar los tokens de autorización. Genera una llave fuerte para producción. |
| `JWT_EXPIRES_IN`           |                   | Tiempo de expiración del token de autorización en milisegundos.                         |
| `REFRESH_TOKEN_NAME`       | `jid`             |                                                                                         |
| `REFRESH_TOKEN_EXPIRES_IN` |                   | tiempo en milisegundos                                                                  |
| `REFRESH_TOKEN_ROTATE_IN`  |                   | tiempo en milisegundos                                                                  |
| `REFRESH_TOKEN_SECURE`     | `false`           |                                                                                         |
| `REFRESH_TOKEN_DOMAIN`     |                   | dominio de despliegue                                                                   |
| `REFRESH_TOKEN_PATH`       | `/`               |                                                                                         |
| `REFRESH_TOKEN_REVISIONS`  | `*/5 * * * *`     |                                                                                         |

**Configuración para el servicio de Mensajería Electrónica (Alertín), si se utiliza en el sistema**

| Variable    | Valor por defecto | Descripción                                                       |
| ----------- | ----------------- | ----------------------------------------------------------------- |
| `MSJ_URL`   |                   | URL de consumo al servicio de Mensajería Electrónico (Alertín).   |
| `MSJ_TOKEN` |                   | TOKEN de consumo al servicio de Mensajería Electrónico (Alertín). |

**Configuración para el servicio SEGIP de IOP, si corresponde**

| Variable          | Valor por defecto | Descripción                                              |
| ----------------- | ----------------- | -------------------------------------------------------- |
| `IOP_SEGIP_URL`   |                   | URL de consumo al servicio interoperabilidad de SEGIP.   |
| `IOP_SEGIP_TOKEN` |                   | Token de consumo al servicio interoperabilidad de SEGIP. |

**Configuración para el servicio SIN de IOP, si corresponde**

| Variable        | Valor por defecto | Descripción                                           |
| --------------- | ----------------- | ----------------------------------------------------- |
| `IOP_SIN_URL`   |                   | URL de consumo al Servicio de Impuestos Nacionales.   |
| `IOP_SIN_TOKEN` |                   | Token de consumo al Servicio de Impuestos Nacionales. |

**Configuración para la integracion de autenticación con Ciudadanía Digital**

| Variable                        | Valor por defecto | Descripción |
| ------------------------------- | ----------------- | ----------- |
| `OIDC_ISSUER`                   |                   |             |
| `OIDC_CLIENT_ID`                |                   |             |
| `OIDC_CLIENT_SECRET`            |                   |             |
| `OIDC_SCOPE`                    |                   |             |
| `OIDC_REDIRECT_URI`             |                   |             |
| `OIDC_POST_LOGOUT_REDIRECT_URI` |                   |             |
| `SESSION_SECRET`                |                   |             |

**Configurar la URL del frontend**

| Variable       | Valor por defecto | Descripción                                                           |
| -------------- | ----------------- | --------------------------------------------------------------------- |
| `URL_FRONTEND` |                   | dominio en el que se encuentra levantado el frontend, si corresponde. |

**Configuración para almacenamiento de archivos**

| Variable           | Valor por defecto | Descripción                                                 |
| ------------------ | ----------------- | ----------------------------------------------------------- |
| `STORAGE_NFS_PATH` |                   | ruta en el que se almacenarán los archivos, si corresponde. |

**Configuración de Logs**

| Variable                  | Valor por defecto | Descripción                                                                              |
| ------------------------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `LOG_LEVEL`               | `info`            | Nivel de logs (en PRODUCCIÓN utilizar el valor `info`)                                   |
| `LOG_AUDIT`               | `application ...` | Habilita los logs de auditoria.                                                          |
| `LOG_CONSOLE`             | `true`            | Indica si se mostrarán los logs en la terminal (en PRODUCCIÓN utilizar el valor `false`) |
| `LOG_SQL`                 | `true`            | Habilita los logs SQL (en PRODUCCIÓN utilizar el valor `false`)                          |
| `LOG_PATH`                | `/tmp/logs/`      | Ruta absoluta de la carpeta logs. Si esta vacio no se crearán los archvos.               |
| `LOG_SIZE`                | `50M`             | Para rotado de logs por tamaño (`K` = kilobytes, `M` = megabytes, `G` = gigabytes).      |
| `LOG_INTERVAL`            | `YM`              | Para rotado de logs por tiempo (`Y` = cada año, `YM` = cada mes, `YMD` = cada día, ...)  |
| `LOG_LOKI_URL`            |                   | Indica la URL del servicio de loki para el registro de logs.                             |
| `LOG_LOKI_USERNAME`       |                   | Indica el nombre de usuario para autenticarse con el servicio de loki.                   |
| `LOG_LOKI_PASSWORD`       |                   | Indica la contraseña de usuario para autenticarse con el servicio de loki.               |
| `LOG_LOKI_BATCHING`       | `true`            | Habilitado el envío de logs por lote cuando se utiliza loki.                             |
| `LOG_LOKI_BATCH_INTERVAL` | `5`               | Tiempo en segundos para el envío de logs con loki si `LOG_BATCHING=true`.                |

**Nota.-**

- `LOG_LEVEL` acepta los valores `error`, `warn` e `info`. (en PROD se recomienda el valor de `info`)

- `LOG_AUDIT` acepta valores separados por espacios en blanco.

  Por Ejemplo:

  - Si `LOG_AUDIT=application request response`, en los archivos `audit_application.log`, `audit_request.log`
    y `audit_response.log` se registrarán logs de tipo `application`, `request` y `response` respectivamente.

Para el registro de logs tenemos las siguientes opciones:

**1ra Forma - Con ficheros**

Para habilitar esta opción, `LOG_PATH` debe tener un valor asignado

`LOG_PATH` dentro de esta carpeta (Se recomienda el valor `/tmp/logs/`) automáticamente se creará otro directorio con el
nombre del proyecto (propiedad `name`
del archivo `package.json`) y dentro de esta última se crearán los archivos de logs `error.log`, `warn.log`
e `info.log`.

`LOG_SIZE` acepta los siguientes valores:

- `G`: Tamaño en GigaBytes. Ej.: `1G`
- `M`: Tamaño en MegaBytes. Ej.: `1M`
- `K`: Tamaño en KiloBytes. Ej.: `1K`

`LOG_INTERVAL` acepta los siguientes valores:

- `Y`: Se genera un nuevo fichero de logs cada año.
- `YM`: Se genera un nuevo fichero de logs cada mes.
- `YMD`: Se genera un nuevo fichero de logs cada día.
- `YMDH`: Se genera un nuevo fichero de logs cada hora.
- `YMDHm`: Se genera un nuevo fichero de logs cada minuto.

**2da Forma - Con el servicio de loki**

Se recomienda esta opción solamente si no se va a utilizar el servicio de Promtail.

Para habilitar esta opción, `LOG_LOKI_URL` debe tener un valor asignado

Puede encontrar más información respecto al despliegue de estos servicios en el siguiente repo:

- [https://gitlab.softwarelibre.gob.bo/capacitacion/gestion-logs](https://gitlab.softwarelibre.gob.bo/capacitacion/gestion-logs)
