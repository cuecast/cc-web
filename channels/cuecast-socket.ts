import { Socket, Channel } from "phoenix"
import { CastStore, vxm } from "~/store";

export default class CuecastSocket {
  channel!: Channel;
  castStore: CastStore = vxm.casts
  static socket: Socket;

  constructor() {
    let socket = new Socket(`wss://${process.env.baseUrl}/socket`)
    socket.connect()
    this.channel = socket.channel('cast:main', {})

    this.channel.join()
      .receive("ok", res => {
        console.log("Casts channel joined.", res)
      })
      .receive("error", resp => {
        console.log("Unable to join Casts channel", resp)
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
