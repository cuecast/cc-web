// user.vuex.ts
import Vuex from 'vuex'
import { action, Module, VuexModule } from "vuex-class-component";
import { TodoStore } from "~/store/todo";
import { Todo } from "~/types";

@Module({namespacedPath: "/", target: "nuxt"})
export class Store extends VuexModule {

  @action
  async nuxtServerInit() {
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
  }

}

export const store = new Vuex.Store({
  modules: {
    todo: TodoStore.ExtractVuexModule(TodoStore),
  }
})

export const vxm = {
  todo: TodoStore.CreateProxy(store, TodoStore),
}

