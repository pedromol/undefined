<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
  [Pending custom logo]
</p>


## Description

  A <a href="https://nestjs.com/" target="blank">Nest</a> boilerplate with <a href="https://typeorm.io/" target="blank">TypeORM</a> and <a href="https://redis.io/" target="blank">Redis</a> <a href="https://docs.nestjs.com/techniques/caching" target="blank">Cache</a>
   using <a href="https://www.docker.com/" target="blank">Docker</a> and <a href="https://docs.docker.com/compose/" target="blank">docker-compose</a>.

## Running the app with docker-compose
```bash
$ docker-compose up --build
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## To Do
- &#9745; Basic TypeORM and Redis support
- &#9745; Fix docker-composer Redis connection
- &#9744; Fix unit tests using CacheManager
- &#9744; Fix e2e test
- &#9744; Setup minimum coverage
- &#9744; Implement basic CRUD
- &#9744; Add OpenAPI/Swagger
- &#9744; Create architecture diagram
- &#9744; Create flow diagrams

## License

Undefined is by inheritance [MIT licensed](LICENSE).

## Support Nest
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).