<template>
  <section>
    <video-chat @start-stream="startStream"></video-chat>
    <button @click="streamStore.joinStream()" class="btn btn-success">Join
      Call
    </button>
    <button @click="streamStore.leaveCall()" class="btn btn-warning">Leave Call</button>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import AudioRecorder from "~/components/audio-recorder/AudioRecorder.vue";
import VideoChat from "~/components/video-chat/VideoChat.vue"

import { AuthStore, StreamStore, vxm } from "~/store"

@Component({
  components: {
    VideoChat,
    AudioRecorder,
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
