// user.vuex.ts
import Vuex from 'vuex'
import { TodoStore } from "~/store";
import { Todo } from "~/types";

export const state = () => ({})
export const store = new Vuex.Store({
  modules: {
    todo: TodoStore.ExtractVuexModule(TodoStore),
  },

  actions: {
    nuxtClientInit({commit}, {req}) {
      let todos: Todo[] = [
        {id: 1, title: 'blah lah', completed: false},
        {id: 2, title: 'lah bh', completed: false},
        {id: 3, title: 'bl bah', completed: false},
        {id: 4, title: 'bl lah', completed: false},
        {id: 5, title: 'bla blah', completed: false},
      ];

      // todos = context.isStatic ?
      //   localRandomData :
      //   await context.app.$axios.$get("./random-data.json");

      vxm.todo.setTodos(todos)
    },
  }
})


export { TodoStore } from './todo'
export const vxm = {
  todo: TodoStore.CreateProxy(store, TodoStore),
}

