# sc-serverless-webhooks

This project will host all our serverless webhooks.

This repo is built using NestJS and Serverless Framework.

## Installation

```bash
npm i
```

### Builds

```bash
#  normal build
npm run build

# build w/ webpack (more optimized bootstrap for serverless cold starts)
npm run build --webpack
```

### Start local serverless server

```bash
npm run serverless
```

## Resources

Some helpful resources and articles used to help jump start this project:

- [Serverless NestJS](https://docs.nestjs.com/faq/serverless)
- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)
- [Serverless NestJS Swagger](https://javascript.plainenglish.io/serverless-nestjs-document-your-api-with-swagger-and-aws-api-gateway-64a53962e8a2)
- [NestJS Docs](https://docs.nestjs.com/) (highly recommend getting familiar w/ these docs)
