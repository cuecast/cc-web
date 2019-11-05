<template>
  <div>
    <h1 class="title">Welcome, {{$auth.user.email}}.</h1>
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
  castStore: CastStore = vxm.casts

  mounted() {
    console.log('Mounted casts:')
    this.castStore.fetchCasts()
    let casts = this.castStore.casts
    console.log('Listing casts:')
    console.dir(casts)
  }

}
</script>

<style scoped>
</style>
