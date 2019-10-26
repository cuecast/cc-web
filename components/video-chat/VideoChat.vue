<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <div class="card">
          <div class="card-image">
            <video autoplay="autoplay" height="100%" muted poster="waiting_for_guest.png"
                   ref="localVideo" width="100%"></video>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img alt="Placeholder image" src="https://bulma.io/images/placeholders/96x96.png">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{$auth.user.email}}</p>
                <p class="subtitle is-6">@{{$auth.user.email}}</p>
              </div>
              <div class="media-right">
                <button class="button" @click="streamStore.leaveStream()">Leave</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="card">
          <div class="card-image">
            <video
              autoplay="autoplay"
              height="100%" muted poster="waiting_for_guest.png"
              ref="remoteVideo" width="100%"></video>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img alt="Placeholder image" src="https://bulma.io/images/placeholders/96x96.png">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">Guest: {{streamStore.currentGuest}}</p>
                <p class="subtitle is-6">@{{streamStore.currentGuest}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { CallStore, vxm } from "~/store"

@Component
export default class extends Vue {
  streamStore: CallStore = vxm.calls
  $refs!: {
    localVideo: HTMLVideoElement
    remoteVideo: HTMLVideoElement
  };

  async mounted () {
    this.$emit('start-stream', {remoteVideo: this.$refs.remoteVideo, localVideo: this.$refs.localVideo})
  }

}

</script>

<style scoped>
.canvas {
  border: 1px solid #1f1f1f;
  height: 100%;
  width: 100%;
}
</style>
