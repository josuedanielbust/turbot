# TurboTraffic - Prueba Técnica

## Tabla de contenidos
- [Requerimientos](#requerimientos)
- [Instalación](#instalación)
  - [Docker](#docker)
  - [Sin Docker](#sin-docker)
- [Uso](#uso)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Autor](#autor)

## Requerimientos
- Docker (Recomendado).
- Node.js (^14.0) (Opcional si tienes docker).
- Instancia de la base de datos y el back corriendo.

## Instalación
### Docker
- Ejecutar los siguientes comandos:
```sh
$ docker-compose build front
$ docker-compose up -d front
```
### Sin Docker
- Es necesario tener Node.js en tu computadora.
- Es necesario tener el back corriendo.
- Ejecutar los siguientes comandos:
```sh
# Instalar dependencias del back
$ npm install
# Iniciar el back
$ npm run dev
```

## Uso
- El back se encuentra en [`http://localhost:3000`][#1].

### Tecnologías utilizadas
- Node.js (^20.0.0)
- PostgreSQL (^15.0)
- Docker (^19.03.0)
- Docker Compose (^3.8)

## Autor
[Josue Daniel Bustamante](https://github.com/josuedanielbust)

[#1]: http://localhost:3000
