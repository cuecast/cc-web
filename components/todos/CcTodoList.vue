<template>
  <section>
    <cc-todo
      :key="todo.id"
      :todo="todo"
      v-for="todo in todo$.todos"
    ></cc-todo>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import CcTodo from "~/components/todos/CcTodo"
import { TodoStore, vxm } from '~/store'

@Component({
  components: {
    CcTodo
  }
})
export default class extends Vue {
  todo$: TodoStore = vxm.todo
}
</script>

<style scoped>

</style>
