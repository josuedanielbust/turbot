# TurboTraffic - Prueba Técnica

## Tabla de contenidos
- [Requerimientos de la prueba](#requerimientos-de-la-prueba)
- [Solución](#solución)
  - [Requerimientos](#requerimientos)
  - [Instalación](#instalación)
    - [Docker](#docker)
    - [Sin Docker](#sin-docker)
  - [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Autor](#autor)
- [Readme - Frontend microservice][#1]
- [Readme - Backend microservice][#2]

## Requerimientos de la prueba
- Crear 2 microservicios que se comuniquen entre sí.
- El primer microservicio debe:
  - Mostrar información que reciba del segundo microservicio.
  - Ser capaz de mandar un mensaje al segundo microservicio.
- El segundo microservicio debe:
  - Ser capaz de recibir el mensaje del primer microservicio
  - Guardar el mensaje en una base de datos.

## Solución
### Requerimientos
- Docker (Recomendado).
- Node.js (^14.0) (Opcional si tienes docker).
- PostgreSQL (Opcional si tienes docker).

### Instalación
#### Docker
- Ejecutar los siguientes comandos:
```sh
$ docker-compose build
$ docker-compose up
```
#### Sin Docker
- Notas:
  - Es necesario tener instalado PostgreSQL y Node.js en tu computadora.
  - Las instrucciones extensas de cada microservicio se encuentran en sus respectivos README.md en los siguientes enlaces:
    - [Readme - Frontend microservice][#1]
    - [Readme - Backend microservice][#2]
  - En el archivo `./back/.env` se encuentran las variables de entorno para la conexión a la base de datos.
  - En el archivo `./front/.env` se encuentra la variable de entorno para la conexión al back.
  
Para probarlo rápidamente ejecutar los siguientes comandos:
```sh
$ cd ./back && npm install && npm run db:gen && npm run db:mig && npm run dev
$ cd ./front && npm install && npm run dev
```

### Uso
- El front se encuentra en [`http://localhost:3000`][#3].
- El back se encuentra en [`http://localhost:3001`][#4].

### Tecnologías utilizadas
- Node.js (^20.0.0)
- Fastify (^4.15.0)
- NextJS (^13.0.0)
- PostgreSQL (^15.0)
- Docker (^19.03.0)
- Docker Compose (^3.8)

## Autor
[Josue Daniel Bustamante](https://github.com/josuedanielbust)

[#1]: ./front/README.md
[#2]: ./back/README.md
[#3]: http://localhost:3000
[#4]: http://localhost:3001