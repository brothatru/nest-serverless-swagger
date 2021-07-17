import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'sc-serverless-webhooks',
  // frameworkVersion: '*',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
  },
  functions: {
    main: {
      handler: 'dist/main.handler',
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          },
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
