import { action, getRawActionContext, getter, Module, mutation, VuexModule } from "vuex-class-component";
import { Todo } from "~/types";

@Module({namespacedPath: "todo/", target: "nuxt"})
export class TodoStore extends VuexModule {
  @getter todos: Todo[] = [];
  private nextId: number = 4;

  @mutation setTodos(todos: Todo[]) {
    this.todos = todos
  }

  @mutation addTodo(title: string) {
    let todo: Todo = {id: this.nextId, title: title, completed: false}
    this.nextId++
    this.todos.push(todo)
  }

  @mutation editTodo({todo}) {
    const index = this.todos.findIndex(e => e.id === todo.id);
    this.todos.splice(index, 1, todo)
  }

  @action({mode: 'raw'})
  async signIn() {
    const context = getRawActionContext(this);
    debugger
  }

}

