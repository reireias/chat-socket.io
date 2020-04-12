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
}
