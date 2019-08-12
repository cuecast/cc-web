import { Todo } from "~/types";

export interface RootState {
  todos: Todo[];
  nextId: number
}
