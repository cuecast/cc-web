<template>
  <section>
    <cc-todo
      :key="todo.id"
      :todo="todo"
      @show-edit-modal="showEditModal"
      v-for="todo in todoStore.todos"
    ></cc-todo>
    <b-modal @close="editModalShow = false"
             @ok="todoStore.editTodo({todo: currentTodo})" v-model="editModalShow">
      <b-form-input placeholder="Enter your todo..." v-model="currentTodo.title"></b-form-input>
    </b-modal>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import CcTodo from "./CcTodo.vue"
import { vxm } from '~/store'
import { Todo } from "~/types"

@Component({
  components: {
    CcTodo
  },
})
export default class extends Vue {
  todoStore = vxm.todo
  currentTodo: Todo = {id: 0, title: '', completed: false}
  editModalShow: boolean = false

  showEditModal(todo: Todo) {
    this.editModalShow = true
    this.currentTodo = {...todo}
  }
}
</script>

<style scoped>

</style>
