<template>
  <section>
    <div class="column is-6">
      <div class="card">
        <div class="card-image">
          <video-chat ref-name="remoteVideo" />
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img alt="Placeholder image" src="https://bulma.io/images/placeholders/96x96.png">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Guest: {{callStore.currentGuest}}</p>
              <p class="subtitle is-6">@{{callStore.currentGuest}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CallStore, vxm } from '~/store'
import VideoChat from './VideoChat.vue'

@Component({components: {VideoChat}})
export default class extends Vue {
  callStore: CallStore = vxm.calls
  $refs!: {
    remoteVideo: HTMLVideoElement
  }

  async mounted() {
    await this.callStore.connect({remoteVideo: this.$refs.remoteVideo})
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
