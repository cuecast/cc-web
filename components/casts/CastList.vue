<template>
  <div class="card">
    <div class="card-body">
      <h2>Cast List</h2>
      <hr>
      <b-list-group>
        <b-list-group-item :text="cast.id + ' ' + cast.name" key="cast.id" v-for="cast in castStore.casts" />
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"
import { Cast } from "~/types"
import { CastStore, vxm } from '~/store'

@Component
export default class extends Vue {
  @Prop() casts!: Cast[]
  castStore: CastStore = vxm.casts

  mounted() {
    this.castStore.getCasts()
  }
}
</script>

<style scoped>
</style>
