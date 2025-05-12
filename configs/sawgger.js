import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API documentation for Blog application',
    },
    servers: [
      {
        url: 'http://localhost:3003', // Cambia el puerto si es necesario
      },
    ],
  },
  apis: ['./src/**/*.routes.js'], // Ruta a los archivos de rutas
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerUi };