// user.vuex.ts
import Vue from 'vue'
import Vuex from 'vuex'

import { CallStore, YoutubeStore } from '~/store'
import { createProxy, extractVuexModule } from './cuecast-store'

Vue.use(Vuex)

export const state = () => ({
  // auth: {
  //   user: {
  //     id: '',
  //     email: ''
  //   }
  // }
})

export const actions = {
  nuxtServerInit({commit}, {context}) {
  },
}

export const mutations = {
  // setUser(state, user) {
  //   state.auth.user = user
  // }
}

export const store = new Vuex.Store({
  state: state(),
  modules: {
    ...extractVuexModule(CallStore),
    ...extractVuexModule(YoutubeStore),
  },
  actions: actions,
  mutations: mutations
})

export { CallStore } from './calls'
export { YoutubeStore } from './platforms/youtube'

export const vxm = {
  calls: createProxy(store, CallStore),
  youtube: createProxy(store, YoutubeStore),
}

