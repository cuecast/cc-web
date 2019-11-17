<template>
  <div class="video-container">
    <video autoplay="autoplay"
           height="100%"
           muted
           poster="waiting_for_guest.png"
           :ref="videoName"
           width="100%">
    </video>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ChatOverlay from './chat/ChatOverlay.vue'

@Component({
  components: {
    ChatOverlay
  }
})
export default class extends Vue {
  @Prop() videoName

  mounted() {
    this.$emit('video-stream', this.$refs[this.videoName])
  }
}

</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100%;
}

video {
  width: 100%;
  height: 100%;
}
</style>
