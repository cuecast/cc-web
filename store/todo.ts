import { action, getter, Module, mutation, VuexModule } from "vuex-class-component";
import { Todo } from "~/types";

@Module({namespacedPath: "todo/", target: "nuxt"})
export class TodoStore extends VuexModule {

  @getter todos: Todo[] = [
    {id: 1, title: 'blah lah', completed: false},
  ];
  private nextId: number = 4;

  @mutation setTodos(todos: Todo[]) {
    this.todos = todos
  }

  @mutation addTodo(title: string) {
    let todo: Todo = {id: this.nextId, title: title, completed: false}
    this.nextId++
    this.todos.push(todo)
  }


}
