import { ACTIONS, MUTATIONS } from './name'
import gql from 'graphql-tag'
/**
 * Login
 * @param {Object} context
 * @param {Object} credentials user
 */

export const actions = {
  [ACTIONS.LOGIN]: ({ commit, dispatch }, { self, route, param }) => {
    self.btnDisable = true
    self.$services.postData(route, param)
      .then(({ res }) => {
        dispatch(ACTIONS.LOGIN_SUCCESS, { data: res.data, self: self })
        self.btnDisable = false
      })
      .catch(() => {
        self.$q.notify({
          position: 'top',
          color: 'negative',
          icon: 'report_problem',
          message: 'Las credenciales son incorrectas'
        })
        self.btnDisable = false
      })
  },
  /**
   * Logout of the app
   * @param {Object} context
   */
  [ACTIONS.LOGOUT]: ({ commit }, { self }) => {
    commit(MUTATIONS.CLEAR_ACCOUNT_STATE)
    self.$router.push({ name: 'login' })
  },
  /**
   * Success login
   * @param {Object} context vuex
   * @param {Object} data users data
   */
  [ACTIONS.LOGIN_SUCCESS]: ({ commit }, { data, self }) => {
    commit(MUTATIONS.SET_USER, data)
    switch (data.rol) {
      case 'EE':
        self.$router.push({ name: 'Embalar' })
        break
      case 'UC':
        self.$router.push({ name: 'EmpaquesCliente' })
        break
      case 'UA':
        self.$router.push({ name: 'Geolocation' })
        break
      default:
        self.$router.push({ name: 'EmpaquesTransporte' })
        break
    }
  },
  /**
   * Valiad session active
   */
  [ACTIONS.VALID_SESSION]: ({ commit, dispatch }) => {
    const user = JSON.parse(localStorage.getItem('user_session'))
    const userActive = localStorage.getItem('session_active')
    const invalidUser = !userActive || userActive === 'false'
    if (invalidUser) {
      commit(MUTATIONS.CLEAR_ACCOUNT_STATE)
      return false
    }
    commit(MUTATIONS.SET_USER, user)
    return true
  },
  /**
   * Refresh user token
   * @param {Object} context
   */
  [ACTIONS.REFRESH_TOKEN]: ({ commit, dispatch }, { self }) => {
    self.$apollo.mutate({
      mutation: gql`mutation ($refresh_token: String!) {
        refreshToken(input: {
          refresh_token: $refresh_token
        })
        {
          access_token
          refresh_token
          expires_in
          token_type
        }
      }`,
      variables: {
        refresh_token: localStorage.getItem('REFRESH_TOKEN')
      },
      update: (store, { data: { refreshToken } }) => {
        commit(MUTATIONS.SET_TOKEN, refreshToken.access_token)
        commit(MUTATIONS.SET_REFRESH_TOKEN, refreshToken.refresh_token)
        commit(MUTATIONS.SET_EXPIRE_IN, Number(refreshToken.expires_in))
        dispatch(ACTIONS.AUTO_LOGOUT, Number(refreshToken.expires_in))
      }
    })
  },
  /**
   * Starts user time session
   * @param {number} expireIn
   */
  [ACTIONS.AUTO_LOGOUT]: ({ commit }, expiresIn) => {
    setTimeout(() => {
      commit(MUTATIONS.SET_TOKEN, null)
      commit(MUTATIONS.SET_EXPIRE_IN, null)
    }, expiresIn)
  }
}
