import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ip: '192.168.0.207',
    is_admin: false
  },
  actions: {

  },
  mutations: {
    isAdmin (state) {
      state.is_admin = !state.is_admin;
    }
  },
  getters: {
    
  }
})
