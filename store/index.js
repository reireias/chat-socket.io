export const state = () => ({
  loading: true,
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const getters = {
  user(state) {
    return state.user
  },
  loading(state) {
    return state.loading
  },
}
