import { Channel, Socket } from "phoenix"
import { StreamStore, vxm } from "~/store";
import { EXCHANGE, ice, JOIN_CALL, LEAVE_CALL } from "~/utils/rtc";

declare var $nuxt: any;

export default class StreamSocket {
  static socket: Socket;
  ss: StreamStore = vxm.streams;
  channel!: Channel;

  constructor () {
    let socketUrl = process.env.SOCKET_URL || 'wss://localhost:4001/socket';
    // let socketUrl = 'wss://cuecast-api.herokuapp.com/socket'
    let socket = new Socket(socketUrl);
    socket.connect();
    this.channel = socket.channel('stream:main', {});

    this.channel.join()
      .receive("ok", res => {
        console.log("Successfully joined Streams channel", res);
        this.broadcast({type: JOIN_CALL, from: $nuxt.$auth.user.email})
      })

      .receive("error", res => {
        console.log("Unable to join Streams channel", res)
      });

    this.channel.on("message", payload => {
      let message = payload;
      this.ss.handleMessage(message)
    })
  }

  broadcast (data) {
    this.channel.push("message", data)
  }

  join (data) {
    this.createPC(data.from, true)
  };

  createPC (userId, offerBool) {
    const pc = new RTCPeerConnection(ice);
    this.ss.peers[userId] = pc;
    this.ss.localStream.getTracks()
      .forEach(track => pc.addTrack(track, this.ss.localStream));
    if (offerBool) {
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer).then(() => {
          setTimeout(() => {
            this.broadcast({
              type: EXCHANGE,
              from: $nuxt.$auth.user.email,
              to: userId,
              sdp: JSON.stringify(pc.localDescription),
            });
          }, 0);
        });
      });
    }

    pc.onicecandidate = (e) => {
      console.log('broadcasting in onicecandidate: ', e.candidate);
      this.broadcast({
        type: EXCHANGE,
        from: this.ss.userId,
        to: userId,
        sdp: JSON.stringify(e.candidate)
      })
    };
    pc.ontrack = (e) => {
      this.ss.remoteVideo.id = `remote-video-container`;
      this.ss.remoteVideo.autoplay = true;
      this.ss.remoteVideo.srcObject = e.streams[0];
    };
    pc.oniceconnectionstatechange = (e) => {
      if (pc.iceConnectionState === 'disconnected') {
        this.broadcast({type: LEAVE_CALL, from: userId});
      }
    };
    return pc;
  }

  exchange (data) {
    let pc;
    if (this.ss.peers[data.from]) {
      pc = this.ss.peers[data.from];
    } else {
      pc = this.createPC(data.from, false);
    }
    if (data.candidate) {
      let candidate = JSON.parse(data.candidate);
      pc.addIceCandidate(new RTCIceCandidate(candidate))
    }
    if (data.sdp) {
      const sdp = JSON.parse(data.sdp);
      if (sdp && !sdp.candidate) {
        pc.setRemoteDescription(sdp).then(() => {
          if (sdp.type === 'offer') {
            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer)
                .then(() => {
                  this.broadcast({
                    type: EXCHANGE,
                    from: $nuxt.$auth.user.email,
                    to: data.from,
                    sdp: JSON.stringify(pc.localDescription)
                  });
                });
            });
          }
        });
      }
    }
  }

}
