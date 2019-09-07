<template>
  <div class="card">
    <div class="card-body">
      <h2>Cast List</h2>
      <hr>
      <b-list-group>
        <b-list-group-item :key="cast.id" v-for="cast in casts">
          <div class="float-left">
            {{cast.name}}
          </div>
          <div class="float-right">
            <button @click="removeCast(cast)">X</button>
          </div>
        </b-list-group-item>
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

  removeCast(cast) {
    this.castStore.removeCast(cast)
  }

}
</script>

<style scoped>
</style>
