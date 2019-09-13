import { Socket, Channel } from "phoenix"
import { CastStore, vxm } from "~/store";

export default class StreamSocket {
  channel!: Channel;
  castStore: CastStore = vxm.casts
  static socket: Socket;
  JOIN_ROOM = "JOIN_ROOM";
  EXCHANGE = "EXCHANGE";
  REMOVE_USER = "REMOVE_USER";
  ice = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };


  constructor() {
    let socket = new Socket("ws://localhost:4000/socket")
    socket.connect()
    this.channel = socket.channel('stream:main', {})

    this.channel.join()
      .receive("ok", res => {
        console.log("Streams channel joined.", res)
      })
      .receive("error", resp => {
        console.log("Unable to join Streams channel", resp)
      })

    this.channel.on('new_cast', (cast) => {
      this.castStore.ADD_CAST(cast)
    })

    this.channel.on('delete_cast', (cast) => {
      this.castStore.REMOVE_CAST(cast)
    })
  }

  addCast(params) {
    this.channel.push('new_cast', params)
  }

  removeCast(params) {
    this.channel.push('delete_cast', params.id)
  }
}
