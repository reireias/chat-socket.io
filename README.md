# chat-socket.io

## Features
- Auth with Google and GitHub account
- Create/Delete chat room
- Room URL share
- Text chat in room
- Save chat message to storage

## Chat Architecture
![chat-architecture-socketio](https://user-images.githubusercontent.com/24800246/80309902-cc80bf80-8812-11ea-82ae-351894d80177.png)

## Authentication
[Auth0](https://auth0.com/)

## Build Setup

```bash
# install dependencies
$ yarn install

# start redis for sesion store
$ docker-compose up -d

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Heroku Setup

```console
$ heroku config:set NPM_CONFIG_PRODUCTION=false
$ heroku config:set HOST=0.0.0.0
$ heroku config:set NODE_ENV=production
$ heroku config:set AUTH0_DOMAIN="<auth0_domain>"
$ heroku config:set AUTH0_CLIENT_ID="<auth0_client_id>"
$ heroku config:set AUTH0_CLIENT_SECRET="<auth0_client_secret>"
$ heroku config:set AUTH0_CALLBACK_URL="<auth0_callback_url>"
$ heroku config:set EXPRESS_SESSION_SECRET="<session_secret>"

$ heroku addons:create heroku-redis:hobby-dev
```
