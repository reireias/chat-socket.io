import axios from 'axios'

export const state = () => ({
  loading: true,
  user: null,
  rooms: [],
  room: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.loading = false
  },
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setRoom(state, room) {
    state.room = room
  },
}

export const actions = {
  async addRoom({ dispatch }, payload) {
    await axios.post('/api/rooms', { name: payload.name })
    dispatch('getRooms')
  },
  async deleteRoom({ dispatch }, payload) {
    await axios.delete(`/api/rooms/${payload.id}`)
    dispatch('getRooms')
  },
  async getRooms({ commit }) {
    const res = await axios.get('/api/rooms')
    const payload = res.data
    commit('setRooms', payload)
  },
  async getRoom({ commit }, payload) {
    const res = await axios.get(`/api/rooms/${payload.id}`)
    commit('setRoom', {
      name: res.data.name,
    })
  },
}

export const getters = {
  user(state) {
    return state.user
  },
  loading(state) {
    return state.loading
  },
  rooms(state) {
    return state.rooms
  },
  room(state) {
    return state.room
  },
}
