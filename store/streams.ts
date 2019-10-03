import { action, Module, VuexModule } from "~/store/cuecast-store";
import StreamSocket from '~/channels/stream-socket'
import { EXCHANGE, JOIN_CALL, LEAVE_CALL } from "~/utils/rtc";
import { vxm } from "~/store";

let socket: StreamSocket;

@Module({namespacedPath: 'streams'})
export class StreamStore extends VuexModule {
  localStream: any = {}
  peers: any = {}
  remoteVideo: any = {};
  userId!: string

  /////////////////////
  // actions
  /////////////////////

  @action
  async connect(streams: any) {
    this.localStream = streams.localStream
    this.remoteVideo = streams.remoteVideo
    this.userId = vxm.auth.user.email
    socket = new StreamSocket()
  }

  @action
  async joinStream() {
    socket.broadcast({type: JOIN_CALL, from: vxm.auth.user.email})
  }

  @action
  async handleMessage(data) {
    console.log('in joinStream')
    console.dir(data)
    if (data.from === vxm.auth.user.email) return;
    switch (data.type) {
      case JOIN_CALL:
        console.log('in JOIN_CALL case')
        return socket.join(data);
      case EXCHANGE:
        console.log('in EXCHANGE case')
        if (data.to !== vxm.auth.user.email) return;
        return socket.exchange(data);
      case LEAVE_CALL:
        console.log('in LEAVE_CALL case')
      // return this.removeUser(data);
      default:
        return;
    }
  }

// /////////////////////
// // private methods
// /////////////////////


}
