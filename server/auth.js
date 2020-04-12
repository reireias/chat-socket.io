const util = require('util')
require('url')
const querystring = require('querystring')
const passport = require('passport')
const express = require('express')

const router = express.Router()

// GET /login
router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid profile',
  }),
  (req, res) => {
    res.redirect('/')
  }
)

// GET /callback
router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    // eslint-disable-next-line no-console
    console.log('err', err)
    // eslint-disable-next-line no-console
    console.log('user', user)
    // eslint-disable-next-line no-console
    console.log('info', info)
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      // eslint-disable-next-line no-console
      console.log('req.logIn user', user)
      // eslint-disable-next-line no-console
      console.log('req.logIn err', err)
      if (err) {
        return next(err)
      }
      const returnTo = req.session.returnTo
      // eslint-disable-next-line no-console
      console.log('req.logIn returnTo', returnTo)
      delete req.session.returnTo
      res.redirect(returnTo || '/')
    })
  })(req, res, next)
})

// GET /logout
router.get('/logout', (req, res) => {
  req.logOut()

  let returnTo = req.protocol + '://' + req.hostname
  const port = req.connection.localPort

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo =
      process.env.NODE_ENV === 'production'
        ? `${returnTo}/`
        : `${returnTo}:${port}/`
  }

  const logoutURL = new URL(
    util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
  )
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo,
  })
  logoutURL.search = searchString

  res.redirect(logoutURL)
})

module.exports = router
