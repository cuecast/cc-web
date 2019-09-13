import Vue from "vue";
import { action, CuecastStore, getter, Module, mutation } from "~/store/cuecast-store";
import CuecastSocket from '../channels/cuecast-socket'
import { api } from '~/utils'


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
    let found = this.casts.find(c => c.id === cast.id);
    let idx = this.casts.indexOf(found);
    Vue.delete(this.casts, idx)
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
    this.connect()
    await api.$get('casts').then(res => {
      this.SET_CASTS(res)
    })
  }

}
