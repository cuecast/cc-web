<template>
  <section>
    <cc-todo
      :key="todo.id"
      :todo="todo"
      v-for="todo in todoStore.todos"
    ></cc-todo>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import CcTodo from "./CcTodo.vue"
import { vxm } from '~/store'

@Component({
  components: {
    CcTodo
  }
})
export default class extends Vue {
  todoStore = vxm.todo
}
</script>

<style scoped>

</style>
