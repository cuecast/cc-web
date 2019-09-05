// user.vuex.ts
import Vue from 'vue'
import Vuex from 'vuex'

import { AuthStore, CastStore } from "~/store";

Vue.use(Vuex)

export const state = () => ({})

export const actions = {
  nuxtServerInit({commit}, {req}) {
    // todos = context.isStatic ?
    //   localRandomData :
    //   await context.app.$axios.$get("./random-data.json");

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

