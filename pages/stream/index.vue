<template>
  <section>
    <h1 class="title">Stream</h1>
    <video-chat @start-stream="startStream"></video-chat>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import VideoChat from "~/components/video-chat/VideoChat.vue"

import { AuthStore, StreamStore, vxm } from "~/store"


@Component({
  middleware: 'auth',
  components: {
    VideoChat,
  },
})
export default class extends Vue {
  streamStore: StreamStore = vxm.streams
  authStore: AuthStore = vxm.auth

  startStream(streams) {
    this.streamStore.connect(streams)
  }
}
</script>

<style scoped>
</style>
