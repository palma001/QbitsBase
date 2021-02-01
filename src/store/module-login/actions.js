import { ACTIONS, MUTATIONS } from './name'
import gql from 'graphql-tag'
/**
 * Login
 * @param {Object} context
 * @param {Object} credentials user
 */

export const actions = {
  [ACTIONS.LOGIN]: ({ commit, dispatch }, { self }) => {
    self.btnDisable = true
    self.$mockData.getOneData('auth', {
      usuario: self.usuario,
      password: self.password
    })
      .then(({ response }) => {
        if (!response.data.content) {
          self.$q.notify({
            position: 'top',
            color: 'negative',
            icon: 'report_problem',
            message: 'Las credenciales son incorrectas'
          })
          self.btnDisable = false
          return 0
        }
        dispatch(ACTIONS.LOGIN_SUCCESS, { data: response.data.content, self: self })
        self.btnDisable = false
      })
    // self.$apollo.mutate({
    //   mutation: gql`mutation ($username: String!, $password: String!) {
    //     login(input: {
    //       username: $username,
    //       password: $password,
    //     })
    //     {
    //       access_token
    //       refresh_token
    //       expires_in
    //       token_type
    //       user {
    //         id
    //         name
    //         email
    //         full_name
    //       }
    //       sucursales {
    //         id
    //         nombre_sucursal
    //       }
    //     }
    //   }`,
    //   variables: {
    //     username: self.username,
    //     password: self.password
    //   },
    //   update: (store, { data: { login } }) => {
    //     console.log(login)
    //     commit(MUTATIONS.SET_TOKEN, login.access_token)
    //     commit(MUTATIONS.SET_REFRESH_TOKEN, login.refresh_token)
    //     commit(MUTATIONS.SET_USER, login.user)
    //     commit(MUTATIONS.SET_EXPIRE_IN, Number(login.expires_in))
    //     commit(MUTATIONS.SET_EXPIRE_IN, Number(login.expires_in))
    //     commit(MUTATIONS.SET_ID, Number(login.user.id))
    //     dispatch(ACTIONS.AUTO_LOGOUT, Number(login.expires_in))
    //     self.$q.sessionStorage.set('sucursales', login.sucursales)
    //     self.$router.push({ name: 'billing' })
    //   }
    // })
    //   .then(res => {
    //     self.btnDisable = false
    //   })
    //   .catch((error) => {
    //     // Error
    //     self.$q.notify({
    //       position: 'top',
    //       color: 'negative',
    //       icon: 'report_problem',
    //       message: error.message
    //     })
    //     self.btnDisable = false
    //   })
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
    switch (data.rol.name) {
      case 'empacador':
        self.$router.push({ name: 'Embalar' })
        break
      case 'cliente':
        self.$router.push({ name: 'EmpaquesCliente' })
        break
      case 'admin':
        self.$router.push({ name: 'EmpaquesCliente' })
        break
      default:
        break
    }
  },
  /**
   * Valiad session active
   */
  [ACTIONS.VALID_SESSION]: ({ commit, dispatch }) => {
    // const token = localStorage.getItem('TOKEN')
    // const expireIn = new Date(localStorage.getItem('expires_in'))
    // const now = new Date()
    const user = JSON.parse(localStorage.getItem('user_session'))
    // const refreshToken = localStorage.getItem('REFRESH_TOKEN')
    // const id = localStorage.getItem('id_session')
    // const invalidToken = !token || token === 'null'
    // const invalidRefreshToken = !refreshToken || refreshToken === 'null'
    // const invalidDate = !expireIn || expireIn === 'null' || now.getTime() >= expireIn.getTime()
    const invalidUser = !user || user === 'null'
    if (invalidUser) {
      commit(MUTATIONS.CLEAR_ACCOUNT_STATE)
      return false
    }
    // commit(MUTATIONS.SET_TOKEN, token)
    // commit(MUTATIONS.SET_REFRESH_TOKEN, refreshToken)
    commit(MUTATIONS.SET_USER, user)
    // commit(MUTATIONS.SET_EXPIRE_IN, expireIn)
    // commit(MUTATIONS.SET_ID, Number(id))
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
