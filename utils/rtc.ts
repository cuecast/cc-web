import {Socket, Channel} from "phoenix";

class RTC {
  private RTCPeerConnection = null;
  private getUserMedia = null;
  private attachMediaStream = null;
  private reattachMediaStream = null;
  private webrtcDetectedBrowser = null;
  private localStream = null;
  private remoteStream = null;
  private channelReady: boolean = false;

  constructor(sURL, localStream, remoteStream) {
    let signalingURL = sURL;
    this.localStream = localStream;
    this.remoteStream = remoteStream;
    this.initWebRTCAdapter();
    this.openChannel();
  }

  private openChannel() {
    this.channelReady = false
  }

  private initWebRTCAdapter() {

  }

}
