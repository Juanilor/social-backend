Docker 

Que es?
    Es una aplicacion la cual permite crear contenedores de empaquetado que funcionan como un sandbox donde poder correr la aplicacion, esta simula un entorno constante, independientemente de donde se inicie la aplicacion.

Contenedor?
    Un contenedor se encarga de correr una imagen, la cual esta compuesta por el sistema operativo, el software (Node en este caso) y la app.

Imagen? 
    La imagen es un archivo Dockerfile donde se setean las propiedades de la misma. 

        FROM node:20        //Aca le decimos que use la Imagen de Node 20+ como base

        WORKDIR /app        //Le declaramos un directorio base donde debe funcionar

        COPY package*.json ./ //Le decimos que realice una copia de lo que son las dependecias

        RUN npm install     //Que las instale

        COPY . .            //Aca realiza una copia completa del proyecto

        RUN npm run build   //Lo hacemos compilar    

        EXPOSE 3000         //Seteamos el puerto

        CMD ["npm", "start"]   //Levantamos el proyecto