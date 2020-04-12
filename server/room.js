const express = require('express')
const Redis = require('ioredis')
const uuid = require('uuid').v4

const router = express.Router()
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

router.post('/rooms', async (req, res) => {
  // TODO: check user
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const id = uuid()
  const key = `rooms.${req.user.id}.${id}`
  const value = JSON.stringify({ id, name: req.body.name, owner: req.user.id })
  await redis.set(key, value)
  res.status(200).json({ id, name: req.body.name })
})

router.get('/rooms', async (req, res) => {
  // TODO: check user
  const pattern = `rooms.${req.user.id}.*`
  const keys = await redis.keys(pattern)
  const result = await redis.mget(keys)
  const rooms = result.map((room) => JSON.parse(room))
  rooms.sort((a, b) => a.name.localeCompare(b.name))
  res.status(200).json(rooms)
})

router.delete('/rooms/:id', async (req, res) => {
  // TODO: check user
  const key = `rooms.${req.user.id}.${req.params.id}`
  await redis.del(key)
  res.status(200).json({})
})

module.exports = router
