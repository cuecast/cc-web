import { action, Module, VuexModule } from "~/store/cuecast-store";
import CallSocket from '~/channels/call-socket'
import { EXCHANGE, JOIN_CALL, LEAVE_CALL } from "~/utils/rtc";

let socket: CallSocket;
declare var $nuxt: any;

@Module({namespacedPath: 'calls'})
export class CallStore extends VuexModule {
  peers: any = {};
  localStream: any = {};
  localVideo: any = {};
  remoteVideo: any = {};
  userId!: string;
  currentGuest: string = '';

  /////////////////////
  // actions
  /////////////////////

  @action
  async connect (streams: any) {
    this.localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    streams.localVideo.srcObject = this.localStream;

    this.localVideo = streams.localVideo;
    this.remoteVideo = streams.remoteVideo;
    this.userId = $nuxt.$auth.user.email;
    socket = new CallSocket();
  }


  @action
  async leaveStream () {
    alert('leaving stream...')
    socket.broadcast({type: LEAVE_CALL, from: $nuxt.$auth.user.email});
    await this.localStream.getTracks().forEach((track) => track.stop)
  }

  @action
  async handleMessage (data) {
    if (data.from === $nuxt.$auth.user.email) return;
    switch (data.type) {
      case JOIN_CALL:
        return socket.join(data);
      case EXCHANGE:
        if (data.to !== $nuxt.$auth.user.email) return;
        if (data.from !== undefined) {
          this.currentGuest = data.from;
          return socket.exchange(data);
        }
      case LEAVE_CALL:
        let pc = this.peers[data.from];
        if (pc !== undefined && pc !== $nuxt.$auth.user.email) {
          pc.close()
        }
      default:
        return;
    }
  }

}
