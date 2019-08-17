<template>
  <div>
    <h1>{{$auth.user.email}}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"

@Component({
  middleware: ['auth']
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
