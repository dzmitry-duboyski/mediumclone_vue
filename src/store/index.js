import {createStore} from 'vuex'
import auth from './modules/auth'

export default createStore({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
})
