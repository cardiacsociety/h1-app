import Config from '~/config'
import jwtDecode from 'jwt-decode'

const tokenStorageKey = "token"
const authUrl = Config.API_URL_AUTH

export const state = () => ({
  token: {
    jwt: "",
    ttl: 0,
    decoded: {},
    valid: false,
    message: "",
  }
})

export const mutations = {

  setToken(state, jwt) {
    localStorage.setItem(tokenStorageKey, jwt)
    state.token.jwt = jwt
  },

  deleteToken(state) {
    localStorage.removeItem(tokenStorageKey)
    state.token.jwt = ""
    state.token.ttl = 0
    state.token.decoded = {}
    state.token.valid = false
    state.token.message = "Session was destroyed by user logout"
  },

  validateToken(state) {

    // check token in local storage vs token in store
    const t = localStorage.getItem(tokenStorageKey)

    if (!t || t.length < 50) {
      return false
    }

    // match
    if (t != state.token.jwt) {
      state.token.valid = false
      state.token.message = "Token in vuex store does not match token in local storage"
      return false
    }

    // decode the token
    let d = {}
    try {
      d = jwtDecode(t)
      state.token.decoded = d
    }
    catch
      (e) {
      state.token.valid = false
      state.token.message = "Token could not be decoded"
      return false
    }

    // calculate time to live
    state.token.ttl = ttlMinutes(d.exp)
    if (state.token.ttl > 0) {
      state.token.valid = true
      state.token.message = "Token is valid and expires in the future"
      return true
    }

    state.token.valid = false
    state.token.message = "Token has expired"
    return false
  },

}

export const actions = {

  // authenticate against api, start session on success
  async auth({commit, dispatch, state}, body) {
    return await this.$axios.$post(authUrl, body)
  },

  start({commit, state}, token) {

    // store token
    commit("setToken", token)

    // initial validation sets various values
    commit("validateToken")

    console.log("Session monitor starting...")
    const ms = 1000
    let i = setInterval(() => {
      commit("validateToken", ms)
      if (!state.token.valid) {
        console.log("token not valid")
        clearInterval(i)
      }
    }, ms)
  },

  destroy({commit, state}) {
    commit("deleteToken")
  }

}

export const getters = {

  // todo - should this return token.jwt?
  token(state) {
    return state.token
  },

  valid(state) {
    return state.token.valid
  }
}

// calculate the time to live in minutes
function ttlMinutes(epochSeconds) {
  return (epochSeconds * 1000 - Date.now()) / 60000  // milliseconds back to minutes
}
