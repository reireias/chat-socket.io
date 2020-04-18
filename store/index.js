import axios from 'axios'

export const state = () => ({
  loading: true,
  user: null,
  rooms: [],
})

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.loading = false
  },
  setRooms(state, rooms) {
    state.rooms = rooms
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
  addMessage(_, payload) {
    // TODO: call api
  },
  async getRooms({ commit }) {
    const res = await axios.get('/api/rooms')
    // TODO: error handle
    const payload = res.data
    commit('setRooms', payload)
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
  messages(state) {
    return state.messages
  },
}
