const socketio = require('socket.io')
const Redis = require('ioredis')
const consola = require('consola')

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

const store = {}

const addMessage = async (roomId, message) => {
  const key = `rooms.${roomId}.messages`
  await redis.rpush(key, JSON.stringify(message))
}

const getMessages = async (roomId) => {
  const key = `rooms.${roomId}.messages`
  const length = await redis.llen(key)
  const result = await redis.lrange(key, 0, length)
  return result ? result.map((x) => JSON.parse(x)) : []
}

const initializeSocket = (http) => {
  const io = socketio(http)

  io.on('connection', (socket) => {
    socket.on('join-room', async (data) => {
      try {
        store[data.id] = data
        socket.join(data.roomId)

        const messages = await getMessages(data.roomId)
        io.to(socket.id).emit('init-messages', messages)
      } catch (e) {
        consola.error(e)
      }
    })

    socket.on('send-message', async (message) => {
      try {
        const roomId = store[message.author].roomId
        socket.broadcast.to(roomId).emit('send-message', message)
        io.to(socket.id).emit('send-message', message)
        await addMessage(roomId, message)
      } catch (e) {
        consola.error(e)
      }
    })
  })
}

module.exports.initializeSocket = initializeSocket
