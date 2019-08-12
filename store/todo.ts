import { action, getter, Module, mutation, VuexModule } from "vuex-class-component";
import { Todo } from "~/types";
import { vxm } from "~/store/index";

@Module({namespacedPath: "todo/", target: "nuxt"})
export class TodoStore extends VuexModule {

  @getter todos: Todo[] = [
    {id: 1, title: 'blah lah', completed: false},
  ];
  private nextId: number = 4;

  @mutation setTodos(todos: Todo[]) {
    alert('called nux')
    this.todos = todos
  }

  @mutation addTodo(title: string) {
    let todo: Todo = {id: this.nextId, title: title, completed: false}
    this.nextId++
    this.todos.push(todo)
  }

  @action
  async nuxtClientInit() {
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

