import Vue from 'vue'
import Vuex from 'vuex'

import { LayoutStore, CallStore, YoutubeStore, StreamStore } from '~/store'
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
    ...extractVuexModule(LayoutStore),
    ...extractVuexModule(CallStore),
    ...extractVuexModule(YoutubeStore),
    ...extractVuexModule(StreamStore),
  },
  actions: actions,
  mutations: mutations
})

export { LayoutStore } from './layout'
export { CallStore } from './calls'
export { StreamStore } from './streams'
export { YoutubeStore } from './platforms/youtube'

export const vxm = {
  layout: createProxy(store, LayoutStore),
  calls: createProxy(store, CallStore),
  streams: createProxy(store, StreamStore),
  youtube: createProxy(store, YoutubeStore),
}

