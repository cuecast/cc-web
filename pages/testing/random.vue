<template>
  <div>
    <h1 class="title">YouTube</h1>
    <h2 class="subtitle">
      Scheduled Streams
    </h2>

    <ol>
      <li v-for="stream in youtubeStore.streams">
        {{stream.id}}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { YoutubeStore, vxm } from '~/store'

@Component
export default class extends Vue {
  youtubeStore: YoutubeStore = vxm.youtube

  mounted() {
    this.youtubeStore.fetchStreams()
  }
}
</script>

<style scoped>
</style>
