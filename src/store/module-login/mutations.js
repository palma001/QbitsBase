import { MUTATIONS } from './name'
export const mutations = {
  [MUTATIONS.CLEAR_ACCOUNT_STATE]: (state, payload) => {
    localStorage.setItem('session_active', false)
  },

  [MUTATIONS.SET_TOKEN]: (state, token) => {
    state.TOKEN = token
    localStorage.setItem('TOKEN', token)
  },

  [MUTATIONS.SET_REFRESH_TOKEN]: (state, refreshToken) => {
    state.TOKEN = refreshToken
    localStorage.setItem('REFRESH_TOKEN', refreshToken)
  },

  [MUTATIONS.SET_USER]: (state, user) => {
    state.user_session = user
    localStorage.setItem('user_session', JSON.stringify(user))
    localStorage.setItem('session_active', true)
  },

  [MUTATIONS.SET_ID]: (state, id) => {
    state.id = id
    localStorage.setItem('id_session', id)
  },

  [MUTATIONS.SET_EXPIRE_IN]: (state, expiresIn) => {
    switch (typeof expiresIn) {
      case 'number':
        state.expires_in = new Date(
          new Date().getTime() + expiresIn
        )
        break
      default:
        state.expires_in = expiresIn
    }
    localStorage.setItem('expires_in', state.expires_in)
  }
}
