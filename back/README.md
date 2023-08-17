# TurboTraffic - Prueba Técnica

## Tabla de contenidos
- [Requerimientos](#requerimientos)
- [Instalación](#instalación)
  - [Docker](#docker)
  - [Sin Docker](#sin-docker)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Uso](#uso)
- [Documentación de la base de datos](#documentación-de-la-base-de-datos)
- [Rutas de la API](#rutas-de-la-api)
- [Autor](#autor)

## Requerimientos
- Docker (Recomendado).
- Node.js (^14.0) (Opcional si tienes docker).
- PostgreSQL (Opcional si tienes docker).

## Instalación
### Docker
- Ejecutar los siguientes comandos:
```sh
$ docker-compose up -d db
$ docker-compose build back
$ docker-compose up -d back
```
### Sin Docker
- Es necesario tener instalado PostgreSQL y Node.js en tu computadora.
- Crear una base de datos en PostgreSQL.
- Crear el archivo `./back/.env` en base al archivo [`./back/.env.example`][#2].
- En el archivo `./back/.env` se encuentran las variables de entorno para la conexión a la base de datos.
  - Cambiar los datos para la variable de entorno DATABASE_URL
    ```sh
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database_name>
    ```
  - Ejemplo de como debería quedar:
    ```sh
    DATABASE_URL=postgres://postgres:postgres@localhost:5432/turbotraffic
    ```
- El archivo `./back/.env` se encuentra en el `.gitignore` para evitar subir datos sensibles a github.
- Ejecutar los siguientes comandos:
```sh
# Instalar dependencias del back
$ npm install
# Generar y migrar base de datos
$ npm run db:gen
$ npm run db:mig
# Iniciar el back
$ npm run dev
```

## Uso
- El back se encuentra en [`http://localhost:3001`][#1].

## Documentación de la base de datos
- La documentación de la base de datos se encuentra en [dbdiagram.io][#3].

![Diagrama de la base de datos](../docs/dbdiagram.png "Diagrama de la base de datos")

## Rutas de la API
| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| GET | /tasks/ | Obtener todos las tareas |
| GET | /tasks/:id | Obtener una tarea por id |
| POST | /tasks/ | Crear una tarea |
| PATCH | /tasks/:id | Actualizar una tarea |
| DELETE | /tasks/:id | Eliminar una tarea |

### Tecnologías utilizadas
- Node.js (^20.0.0)
- Fastify (^4.15.0)
- PostgreSQL (^15.0)
- Docker (^19.03.0)
- Docker Compose (^3.8)

## Autor
[Josue Daniel Bustamante](https://github.com/josuedanielbust)

[#1]: http://localhost:3001
[#2]: ./back/.env.example
[#3]: https://dbdiagram.io/d/64ddbb6e02bd1c4a5eead1e2
[#4]: ../docs/dbdiagram.png


## Migrate database
``` shell
yarn run db:gen
yarn run db:mig
```
