const { createServer } = require('http')
const express = require('express')
const redis = require('redis')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const expressSession = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const bodyParser = require('body-parser')
const RedisStore = require('connect-redis')(expressSession)

const config = require('../nuxt.config.js')
const authRouter = require('./auth')
const roomRouter = require('./room')
const { initializeSocket } = require('./socket')

const app = express()
const http = createServer(app)
const redisClient = redis.createClient(
  process.env.REDIS_URL || 'redis://localhost:6379'
)

const session = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.EXPRESS_SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
}

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'
if (process.env.NODE_ENV === 'production') {
  session.cookie.secure = true
  session.proxy = true
  app.set('trust proxy', 1)
}

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile)
  }
)

app.use(bodyParser.json())
const sessionMiddleware = expressSession(session)
initializeSocket(http, sessionMiddleware)
app.use(sessionMiddleware)
passport.use(strategy)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.use('/', authRouter)
app.use('/api', roomRouter)

app.get('/session', (req, res) => {
  res.json({ user: req.user })
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  http.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
