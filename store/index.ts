// user.vuex.ts
import Vue from 'vue'
import Vuex from 'vuex'

import { CallStore, CastStore, StreamStore } from "~/store";
import { createProxy, extractVuexModule } from "./cuecast-store";

Vue.use(Vuex);


export const state = () => ({
  // auth: {
  //   user: {
  //     id: '',
  //     email: ''
  //   }
  // }
});

export const actions = {
  nuxtServerInit ({commit}, {context}) {
  },
};

export const mutations = {
  // setUser(state, user) {
  //   state.auth.user = user
  // }
};

export const store = new Vuex.Store({
  state: state(),
  modules: {
    ...extractVuexModule(CastStore),
    ...extractVuexModule(StreamStore),
    ...extractVuexModule(CallStore),
  },
  actions: actions,
  mutations: mutations
});

export { CastStore } from "./casts";
export { StreamStore } from "./streams";
export { CallStore } from "./calls";

export const vxm = {
  casts: createProxy(store, CastStore),
  streams: createProxy(store, StreamStore),
  calls: createProxy(store, CallStore),
};

