import {
  action,
  createModule,
  createProxy,
  extractVuexModule,
  getRawActionContext,
  getter,
  Module,
  mutation
} from "vuex-class-component";

const VuexModule = createModule({
  namespaced: true,
  strict: false,
  target: "nuxt",
});

export {createModule, Module, getter, action, mutation, VuexModule, extractVuexModule, getRawActionContext, createProxy }
