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
}

export const actions = {
  addRoom(_, payload) {
    // TODO: call api
  },
  deleteRoom(_, payload) {
    // TODO: call api
  },
  addMessage(_, payload) {
    // TODO: call api
    console.log(payload)
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
