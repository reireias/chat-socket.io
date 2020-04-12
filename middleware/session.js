import axios from 'axios'

export default async ({ store, route, redirect }) => {
  // eslint-disable-next-line no-console
  console.log('middleware')
  // 認証済みの場合は何もしない
  if (store.state.user) {
    // eslint-disable-next-line no-console
    console.log('already login')
    return
  }

  if (route.path !== '/callback') {
    // サーバーのsessionからuser情報を取得する
    const res = await axios.get('/session')
    if (res.data.user) {
      // eslint-disable-next-line no-console
      console.log('get user')
      // eslint-disable-next-line no-console
      console.log(res.data.user)
      store.commit('setUser', res.data.user)
    } else if (route.path !== '/') {
      // eslint-disable-next-line no-console
      console.log('user data not found by session')
      // 無限リダイレクトにならないように、パスが"/"の場合は何もしない
      return redirect('/')
    } else {
      // eslint-disable-next-line no-console
      console.log('user data not found by session')
    }
  }
}
