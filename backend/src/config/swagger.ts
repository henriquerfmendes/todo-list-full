import { Options } from 'swagger-jsdoc';
import * as path from 'path';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-do API Documentation',
      version: '1.0.0',
      description: 'API documentation for the To-do application',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: [path.join(__dirname, '../docs/swagger.json')],
};

export default swaggerOptions; 