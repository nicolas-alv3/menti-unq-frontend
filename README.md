# Menti-UNQ Frontend

## Para correr la app

- `npm install` para instalar las deps
- `npm start` corre la app en modo desarrollo en [http://localhost:3000](http://localhost:3000).

## Informacion técnica

### Autenticacion

La app utiliza desde el lado del cliente [Auth0](https://auth0.com/docs/get-started/auth0-overview) para la
autenticacion. De esta manera podemos acceder mediante
nuestra cuenta de google o crearnos una propia. \
Auth0 utiliza un token JWT para autenticar al usuario. Este token de acceso es enviado en cada request al backend. Esto
implica que para
poder probar la app va a ser necesario utilizar nuestra cuenta de Google o registrarnos.

### Diseño y estilos

Se usa la libreria de [Material UI](https://mui.com/material-ui/) para poder tener componentes de React con estilos
predefinidos que pueden ser facilmente ajustados segun nuestra necesidad



