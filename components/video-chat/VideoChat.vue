<template>
  <div class="video-container">
    <div class="video-inner">
      <video autoplay="autoplay"
             muted
             poster="waiting_for_guest.png"
             :ref="videoName"
             height="100%"
      >
      </video>
      <v-btn class="mx-2 video-fab" raised >
        <v-icon dark>mdi-voice</v-icon>
        Join Cast
      </v-btn>
    </div>
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

<style scoped lang="scss">

.video-container {
  margin: 0;
  padding: 0;
  border: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;

  .video-inner {
    position: relative;
    height: 540px;
  }
}


.video-fab {
  bottom: 30px;
  right: 45px;
  position: absolute;
  z-index: 999999
}
</style>
