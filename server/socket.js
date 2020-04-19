const socketio = require('socket.io')

const store = {}
// TODO: save redis
const messages = []

const initializeSocket = (http) => {
  const io = socketio(http)

  io.on('connection', (socket) => {
    socket.on('join-room', (data) => {
      store[data.id] = data
      socket.join(data.roomId)
      io.to(socket.id).emit('init-messages', messages)
    })

    socket.on('send-message', (message) => {
      const roomId = store[message.author]
      socket.broadcast.to(roomId).emit('send-message', message)
      io.to(socket.id).emit('send-message', message)
      messages.push(message)
    })
  })
}

module.exports.initializeSocket = initializeSocket
