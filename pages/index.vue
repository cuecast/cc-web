<template>
  <section>
    <video-chat></video-chat>
<!--    <audio-recorder></audio-recorder>-->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import AudioRecorder from "~/components/audio-recorder/AudioRecorder.vue";
import VideoChat from "~/components/video-chat/VideoChat.vue"

@Component({
  components: {
    VideoChat,
    AudioRecorder,
  },
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
