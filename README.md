# notes-webserver

Notes WebServer is a web-based application for personal note taking.

# Status

This application is under heavy development, is not production ready yet.

# Features

- multi-tenant
- allows to create multiple notebooks
- allows to add notes to notebooks
- supports different types of notes
- additional note types can be easily added via a registry of note types
- can be run as an Express application
- can be deployed as a serverless application into AWS cloud

# Technicalities

- written 100% in Typescript
- 100% test coverage
- can run as an Express application, or in AWS Lambda behind API Gateway

# Integration tests

This package has integration tests that can be run during development. They are not part of CI automated tests,
but are useful to develop integrations with real services (e.g. AWS DynamoDB). To run these tests, run:

```
$ AWS_PROFILE=profile-name AWS_SDK_LOAD_CONFIG=true npm run test:dev
```

(it is assumed, that you have profile with `profile-name` configured in your AWS configuration).

You can also specify which of the development tests to run:

```
$ AWS_PROFILE=profile-name AWS_SDK_LOAD_CONFIG=true npm run test:dev -- dynamo
$ AWS_PROFILE=profile-name AWS_SDK_LOAD_CONFIG=true npm run test:dev -- secrets
```

# Run for local development

To allow local web application call the server, run it with the following envoronment variables:
```
$ CORS_ALLOWED_ORIGINS="http://localhost:8080" npm start
```