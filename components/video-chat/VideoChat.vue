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
            <video autoplay="autoplay" height="100%" muted
                   ref="remoteVideo" width="100%"></video>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <input @click="startStream()" id="start" type="button" value="Stream" />
            <input @click="call()" id="call" type="button" value="Call" />
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
  private localStream!: MediaStream;
  private currentConnection!: RTCPeerConnection;
  private pc2!: RTCPeerConnection;
  private offerOptions: Object = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  private channel!: Channel;
  private users: any;

  async startStream() {
    console.log('Requesting local stream');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
      console.log('Received local stream');
      this.$refs.localVideo.srcObject = stream;
      this.localStream = stream;
    } catch (e) {
      alert(`getUserMedia() error: ${e.name}`);
    }
  }

  async call() {
    console.log('Starting call...');
    if (this.localStream) {
      const videoTracks = this.localStream.getVideoTracks();
      const audioTracks = this.localStream.getAudioTracks();
      if (videoTracks.length > 0) {
        console.log(`Using video device: ${videoTracks[0].label}`);
      }
      if (audioTracks.length > 0) {
        console.log(`Using audio device: ${audioTracks[0].label}`);
      }
      this.currentConnection = new RTCPeerConnection({});
      console.log('Created local peer connection object pc1');
      this.currentConnection.addEventListener('icecandidate', e => this.onIceCandidate(this.currentConnection, e));
      this.pc2 = new RTCPeerConnection({});
      console.log('Created remote peer connection object pc2');
      this.pc2.addEventListener('icecandidate', e => this.onIceCandidate(this.pc2, e));
      this.currentConnection.addEventListener('iceconnectionstatechange', e => this.onIceStateChange(this.currentConnection, e));
      this.pc2.addEventListener('iceconnectionstatechange', e => this.onIceStateChange(this.pc2, e));
      this.pc2.addEventListener('track', this.gotRemoteStream);

      this.localStream.getTracks().forEach(track => this.currentConnection.addTrack(track, this.localStream));
      console.log('Added local stream to pc1');

      try {
        console.log('pc1 createOffer start');
        const offer = await this.currentConnection.createOffer(this.offerOptions);
        await this.onCreateOfferSuccess(offer);
      } catch (e) {
        this.onCreateSessionDescriptionError(e);
      }
    }
  }

  private onCreateSessionDescriptionError(error) {
    console.log(`Failed to create session description: ${error.toString()}`);
  }

  private async onCreateOfferSuccess(desc) {
    console.log(`Offer from pc1\n${desc.sdp}`);
    console.log('pc1 setLocalDescription start');
    try {
      await this.currentConnection.setLocalDescription(desc);
      this.onSetLocalSuccess(this.currentConnection);
    } catch (err) {
      this.onSetSessionDescriptionError(err);
    }

    console.log('pc2 setRemoteDescription start');
    try {
      await this.pc2.setRemoteDescription(desc);
      this.onSetRemoteSuccess(this.pc2);
    } catch (err) {
      this.onSetSessionDescriptionError(err);
    }

    console.log('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    try {
      const answer = await this.pc2.createAnswer();
      await this.onCreateAnswerSuccess(answer);
    } catch (e) {
      this.onCreateSessionDescriptionError(e);
    }
  }

  private onSetLocalSuccess(pc) {
    console.log(`${this.getName(pc)} setLocalDescription complete`);
  }

  private onSetRemoteSuccess(pc) {
    console.log(`${this.getName(pc)} setRemoteDescription complete`);
  }

  private onSetSessionDescriptionError(error) {
    console.log(`Failed to set session description: ${error.toString()}`);
  }

  private async onCreateAnswerSuccess(desc) {
    console.log(`Answer from pc2:\n${desc.sdp}`);
    console.log('pc2 setLocalDescription start');
    try {
      await this.pc2.setLocalDescription(desc);
      this.onSetLocalSuccess(this.pc2);
    } catch (e) {
      this.onSetSessionDescriptionError(e);
    }
    console.log('pc1 setRemoteDescription start');
    try {
      await this.currentConnection.setRemoteDescription(desc);
      this.onSetRemoteSuccess(this.currentConnection);
    } catch (e) {
      this.onSetSessionDescriptionError(e);
    }
  }

  private gotRemoteStream(e) {
    if (this.$refs.remoteVideo.srcObject !== e.streams[0]) {
      this.$refs.remoteVideo.srcObject = e.streams[0];
      console.log('pc2 received remote stream');
    }
  }


  private getName(pc: RTCPeerConnection) {
    return (pc === this.currentConnection) ? 'pc1' : 'pc2';
  }

  private getOtherPc(pc: RTCPeerConnection) {
    return (pc === this.currentConnection) ? this.pc2 : this.currentConnection;
  }

  private async onIceCandidate(pc, event) {
    try {
      await (this.getOtherPc(pc).addIceCandidate(event.candidate));
      this.onAddIceCandidateSuccess(pc);
    } catch (e) {
      this.onAddIceCandidateError(pc, e);
    }
    console.log(`${this.getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
  }

  private onAddIceCandidateSuccess(pc) {
    console.log(`${this.getName(pc)} addIceCandidate success`);
  }

  private onAddIceCandidateError(pc, error) {
    console.log(`${this.getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
  }

  private onIceStateChange(pc, event) {
    if (pc) {
      console.log(`${this.getName(pc)} ICE state: ${pc.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
  }

  private hangup() {
    console.log('Ending call');
    this.currentConnection.close();
    this.pc2.close();
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
