<template>
  <section>
    <h1>Video Chat Example</h1>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <video autoplay="autoplay" height="100%" muted
                   ref="localVideo" width="100%"></video>
          </div>
          <div class="col-md-6">
            <video autoplay="autoplay" height="100%"
                   ref="remoteVideo" width="100%"></video>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Channel } from 'phoenix'

@Component({})
export default class extends Vue {
  $refs!: {
    localVideo: HTMLVideoElement
    remoteVideo: HTMLVideoElement
  };
  private localStream!: any;
  private currentConnection!: RTCPeerConnection;
  private pc2!: RTCPeerConnection;
  private offerOptions: Object = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  private channel!: Channel;
  private users: any;

  async mounted() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
      this.$refs.localVideo.srcObject = stream;
      this.localStream = stream;
      let streams = {remoteVideo: this.$refs.remoteVideo, localStream: this.localStream}
      this.$emit('start-stream', streams)
    } catch (e) {
      alert(`in VideoChat.vue - getUserMedia(): ${e.name}`);
    }
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
