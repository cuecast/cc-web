<template>
  <div class="card">
    <div class="card-image" style="">
      <video-chat video-name="localVideo" @video-stream="startStream" />
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">Name of stream</p>
          <p class="subtitle is-5">12:23</p>
        </div>
        <div class="media-right">
          <button class="button" @click="streamStore.leaveStream()">End Stream</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CallStore, vxm } from '~/store'
import VideoChat from './VideoChat.vue'

@Component({
  components: {
    VideoChat
  }
})
export default class extends Vue {
  callStore: CallStore = vxm.calls
  $refs!: {
    localVideo: HTMLVideoElement
  }

  startStream(video) {
    this.callStore.connect({localVideo: video})
  }

}

</script>

<style scoped>
</style>
