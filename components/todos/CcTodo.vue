<template>
  <section>
    <h1>{{todo.id}} | {{todo.title}}</h1>
    <button @click="showEditModal()"></button>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator"
import { Todo } from "~/types"
import { TodoStore, vxm } from "~/store"

@Component({
  components: {},
})
export default class extends Vue {
  @Prop() todo!: Todo
  todoStore: TodoStore = vxm.todo
  todoInputValue: string = this.todo.title

  @Emit()
  showEditModal() {
    return this.todo
  }
}
</script>

<style scoped>

</style>
