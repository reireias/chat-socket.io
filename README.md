# chat-socket.io

> example chat application with socket.io

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
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
heroku config:set AUTH0_DOMAIN="<auth0_domain>"
heroku config:set AUTH0_CLIENT_ID="<auth0_client_id>"
heroku config:set AUTH0_CLIENT_SECRET="<auth0_client_secret>"
heroku config:set AUTH0_CALLBACK_URL="<auth0_callback_url>"
heroku config:set EXPRESS_SESSION_SECRET="<session_secret>"
```
