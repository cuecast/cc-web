<template>
  <div>
    <h1>Casts</h1>
    <hr>
    <cast-form />
    <br>
    <cast-list :casts="this.castStore.casts" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import CastList from "~/components/casts/CastList.vue"
import CastForm from "~/components/casts/CastForm.vue"

import { CastStore, vxm } from "~/store"

@Component({
  components: {CastList, CastForm}
})
export default class extends Vue {
  castStore: CastStore = vxm.casts

  mounted() {
    this.castStore.connect()
    this.castStore.fetchCasts()
  }
}
</script>

<style scoped>
</style>
