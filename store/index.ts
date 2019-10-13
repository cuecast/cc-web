// user.vuex.ts
import Vue from 'vue'
import Vuex from 'vuex'

import { CastStore, StreamStore, AuthStore } from "~/store";
import { createProxy, extractVuexModule } from "./cuecast-store";
import auth from "~/utils/auth";

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
    ...extractVuexModule(AuthStore),
    ...extractVuexModule(CastStore),
    ...extractVuexModule(StreamStore),
  },
  actions: actions,
  mutations: mutations
})

export { AuthStore } from "./auth";
export { CastStore } from "./casts";
export { StreamStore } from "./streams";

export const vxm = {
  auth: createProxy(store, AuthStore),
  casts: createProxy(store, CastStore),
  streams: createProxy(store, StreamStore),
}

