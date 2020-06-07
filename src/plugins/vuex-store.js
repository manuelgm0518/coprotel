import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverPath:'http://187.233.202.155',
    //serverPath:'http://localhost:3000',
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
