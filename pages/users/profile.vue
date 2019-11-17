<template>
  <div>
    <h1 class="title">Welcome, {{$auth.user.email}}.</h1>
    <n-link class="button is-success" to="/streams">Test Host</n-link>
    <n-link class="button is-success" to="/streams">Test Guest</n-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: 'auth'
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
