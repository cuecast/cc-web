export * from './state';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number
  email: string
}

export interface Cast {
  id: number
  name: string
}
