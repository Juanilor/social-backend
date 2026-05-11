# Social Backend API

Backend REST API de una mini red social desarrollada con Node.js, Express, Typescript y MongoDB.

Incluye autenticacion JWT, posts, likes, comentarios y arquitectura escalable basada en services/controllers.

## Features

- Registro y login de usuarios.
- Autenticacion con JWT.
- Creacion de posts.
- Sistema de likes.
- Comentarios en posts.
- Middleware de autenticacion.
- Validaciones.
- Manejo global de errores.
- Swagger API Docs.

## Tech Stack

- Node.js
- Express
- Typescript
- MongoDB Atlas
- Mongoose
- JWT
- Swagger

## Installation

Clonar repositorio: 

```bash
git clone https://github.com/Juanilor/social-backend.git

npm install

```

Crear archivo .env

PORT=3000
MONGO_URI = mongodb_uri
JWT_SECRET = your_secret

```bash

npm run dev
```

## API Docs

Swagger disponible en: 

```bash
http://localhost:3000/api/docs
```

## Project Structure

src/
|--config/
|--controllers/
|--middlewares/
|--models/
|--routes/
|--services/
|--utils/

## Future Improvements

- Refrescado de token
- Testing unitario
- Soporte en Docker
- Autorizaciones basadas en roles
- Chat en tiempo real con WebSockets