import axios from 'axios'

export default async ({ store, route }) => {
  // 認証済みの場合は何もしない
  if (store.state.user) {
    return
  }

  if (route.path !== '/callback') {
    // サーバーのsessionからuser情報を取得する
    const res = await axios.get('/session')
    if (res.data.user) {
      store.commit('setUser', res.data.user)
    } else if (route.path !== '/login') {
      // 無限リダイレクトにならないように、パスが"/login"の場合は何もしない
      window.location.href = '/login'
    }
  }
}
