<template>
  <section>
    <video-chat @start-stream="startStream"></video-chat>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VideoChat from '~/components/video-chat/VideoChat.vue'

import { CallStore, vxm } from '~/store'


@Component({
  middleware: ['auth'],
  components: {
    VideoChat,
  },
})
export default class extends Vue {
  callStore: CallStore = vxm.calls

  startStream(streams) {
    this.callStore.connect(streams)
  }
}
</script>

<style scoped>
</style>
