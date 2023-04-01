import authApi from '@/api/auth'
import {setItem, getItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
}

const mutations = {
  [mutationsTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationsTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.registerStart)
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationsTypes.registerSuccess, response.data.user)

          setItem('jwtToken', response.data.user.token)
          console.log(getItem)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit(mutationsTypes.registerFailure, result.response.data.errors)
          console.log('result errors', result)
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.loginStart)
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationsTypes.loginSuccess, response.data.user)

          setItem('jwtToken', response.data.user.token)
          console.log(getItem)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit(mutationsTypes.loginFailure, result.response.data.errors)
          console.log('result errors', result)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
