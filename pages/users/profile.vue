<template>
  <div>
    <h1 class="title">Welcome, {{$auth.user.email}}.</h1>
    <button class="button is-success" @click="testAuth">Test Auth</button>
    <n-link class="button is-primary" to="/casts/new">Start a Cast</n-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CastStore, vxm } from '~/store'

@Component({
  middleware: 'auth'
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
