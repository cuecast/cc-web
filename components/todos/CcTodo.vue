<template>
  <section>
    <h1>{{todo.title}}</h1>
    <button @click="todoStore.addTodo('blahblah')"></button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { Todo } from "~/types"
import { TodoStore, vxm } from "~/store"

@Component({
  components: {}
})
export default class extends Vue {
  todoStore: TodoStore = vxm.todo
  @Prop(Object)
  todo!: Todo
}
</script>

<style scoped>

</style>
