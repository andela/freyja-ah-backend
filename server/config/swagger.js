import swaggerJsDoc from 'swagger-jsdoc';
import { config } from 'dotenv';

// Initialize dotenv
config();
const swaggerDefinition = {
  info: {
    version: '1.0',
    title: 'Customer Service Learning Community',
    description:
      'Create a community of like minded customer service skills enthusiast to foster inspiration and innovation by leveraging the modern web.'
  },
  host: process.env.HOST_NAME || 'localhost:3000',
  basePath: '/api'
};

const options = {
  swaggerDefinition,
  apis: ['**/*.yaml']
};
const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
