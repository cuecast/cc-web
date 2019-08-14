<template>
  <section>
    <div class="cards">
      <cc-todo-list></cc-todo-list>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import CcTodoList from "~/components/todos/CcTodoList.vue"

@Component({
  components: {
    CcTodoList
  },
})
export default class extends Vue {
}
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
