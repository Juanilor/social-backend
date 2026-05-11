import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Backend Api",
            version: "1.0.0",
            description: "Api de red social construida con NodeJS",
        },
        server: [{
            url: "http://localhost:3000",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
    },
    apis: ["./src/routes/*.ts"],
});