// user.vuex.ts
import Vue from 'vue'
import Vuex from 'vuex'
import { AuthStore } from "~/store";

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
  },
  actions: actions
})

export { AuthStore } from "./auth";

export const vxm = {
  auth: AuthStore.CreateProxy(store, AuthStore),
}

