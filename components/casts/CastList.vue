<template>

  <div class="card">
    <div class="card-content">
      <article class="media" v-for="cast in castStore.casts">
        <div class="media-content">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p>
                  {{cast.id}} {{cast.name}}
                </p>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button @click="castStore.removeCast(cast)" class="button is-danger">Delete that shit</button>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
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
