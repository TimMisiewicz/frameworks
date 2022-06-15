import { createStore } from 'vuex'
import authModule from './modules/auth/index.js';


export default createStore({
  state() {
    return{
      apiUrl: 'http://localhost:8080/sws/api/'
    }
  },
  getters: {
    apiUrl(state) {
      return state.apiUrl;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule
  }
})
