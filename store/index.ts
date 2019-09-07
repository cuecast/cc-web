// user.vuex.ts
import Vue from 'vue'
import Vuex from 'vuex'

import { AuthStore, CastStore } from "~/store";
import { Socket } from "phoenix";

Vue.use(Vuex)

export const state = () => ({})

export const actions = {
  nuxtServerInit({commit}, {context}) {
    // let socket = new Socket("ws://localhost:4000/socket")
    // socket.connect()

  },
}

export const store = new Vuex.Store({
  state: state(),
  modules: {
    auth: AuthStore.ExtractVuexModule(AuthStore),
    casts: CastStore.ExtractVuexModule(CastStore),
  },
  actions: actions
})

export { AuthStore } from "./auth";
export { CastStore } from "./casts";

export const vxm = {
  auth: AuthStore.CreateProxy(store, AuthStore),
  casts: CastStore.CreateProxy(store, CastStore),
}

