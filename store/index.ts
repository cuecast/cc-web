// user.vuex.ts
import Vuex from 'vuex'
import { AuthStore, TodoStore } from "~/store";
import { Todo } from "~/types";

export const state = () => ({})

export const actions = {
  nuxtServerInit({commit}, {req}) {
    let todos: Todo[] = [
      {id: 1, title: 'blah lah', completed: false},
      {id: 2, title: 'lah bh', completed: false},
      {id: 4, title: 'bl lah', completed: false},
      {id: 5, title: 'bla blah', completed: false},
    ];

    // todos = context.isStatic ?
    //   localRandomData :
    //   await context.app.$axios.$get("./random-data.json");

    vxm.todo.setTodos(todos)
  },
}

export const store = new Vuex.Store({
  state: state(),
  modules: {
    todo: TodoStore.ExtractVuexModule(TodoStore),
    auth: AuthStore.ExtractVuexModule(AuthStore),
  },
  actions: actions
})

export { TodoStore } from "./todo"
export { AuthStore } from "./auth";

export const vxm = {
  todo: TodoStore.CreateProxy(store, TodoStore),
  auth: AuthStore.CreateProxy(store, AuthStore),
}

