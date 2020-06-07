import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverPath:'http://localhost:3000',
    user:null,
    filters: {},
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
