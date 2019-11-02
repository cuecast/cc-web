<template>
  <section>
    <h1 class="title">Stream</h1>
    {{token}}
    <video-chat @start-stream="startStream"></video-chat>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VideoChat from '~/components/video-chat/VideoChat.vue'

import { StreamStore, vxm } from '~/store'


@Component({
  middleware: ['auth'],
  components: {
    VideoChat,
  },
})
export default class extends Vue {
  streamStore: StreamStore = vxm.streams

  startStream(streams) {
    this.streamStore.connect(streams)
  }
}
</script>

<style scoped>
</style>
