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
