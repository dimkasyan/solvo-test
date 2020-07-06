import { userService } from '../services'
import { router } from '../helpers/router'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

export const auth = {
  namespaced: true,
  state: { authorization_attempt: [], ...initialState },
  actions: {
    login ({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username })
      userService.login(username, password)
        .then(
          user => {
            commit('loginSuccess', user)
            commit('loginStatusItems', {
              'time_attempt': format(new Date(), 'd MMMM yyyy HH:mm:ss', { locale: ru }),
              'result_attempt': user
            })
            dispatch('alert/success', 'Вы успешно авторизовались', { root: true })
            setTimeout(() => router.push('/sessionlog'), 2000);
          },
          error => {
            commit('loginFailure', error)
            commit('loginStatusItems', {
              'time_attempt': format(new Date(), 'd MMMM yyyy HH:mm:ss', { locale: ru }),
              'result_attempt': error
            })
            dispatch('alert/error', error, { root: true })
          }
        )
    }
  },
  mutations: {
    loginRequest (state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    loginSuccess (state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure (state) {
      state.status = {}
      state.user = null
    },
    loginStatusItems (state, data) {
      state.authorization_attempt.push(data)
    },
    clearLoginItems (state) {
      state.authorization_attempt = []
    }
  }
}
