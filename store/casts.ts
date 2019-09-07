import Vue from "vue";
import { action, getter, CuecastStore, Module, mutation } from "~/store/cuecast-store";
import CuecastSocket from '../channels/cuecast-socket'
import { api, router } from '~/utils'
import { Cast } from "~/types";
import { Channel, Socket } from "phoenix";


let socket: CuecastSocket;

@Module({namespacedPath: "casts/", target: "nuxt"})
export class CastStore extends CuecastStore {
  @getter casts: any = []

  @mutation SET_CASTS(casts) {
    this.casts = casts
  }

  @mutation ADD_CAST(cast) {
    this.casts.unshift(cast)
  }

  @mutation REMOVE_CAST(cast) {
    let found = this.casts.find(c => {
      if (c.id === cast.id) {
      debugger
      }
      console.log('cast ID: ' + c.id + ', ID: ' + cast.id)
      return c.id === cast.id;
    })
    if (found) {
      let idx = this.casts.findIndex(found)
      this.casts = this.casts.splice(idx, 1)
    } else {
    debugger
      alert("No cast found.")
    }
  }

  @action
  async connect() {
    socket = new CuecastSocket()
  }

  @action
  async addCast(params) {
    socket.addCast(params)
  }

  @action
  async removeCast(params) {
    socket.removeCast(params)
  }

  @action
  async fetchCasts() {
    await api.$get('casts').then(res => {
      this.SET_CASTS(res)
    })
  }

}
