import Vue from "vue";
import { action, mutation, VuexModule } from "~/store/cuecast-store";
import CuecastSocket from '../channels/cuecast-socket'
import { api } from '~/utils'
import { Cast } from "~/types";


let socket: CuecastSocket;
declare var $nuxt: any;

export class CastStore extends VuexModule {
  casts: Cast[] = <Cast[]>[{name: 'hello'}, {name: 'world'}]

  @mutation SET_CASTS(casts) {
    this.casts = casts
  }

  @mutation ADD_CAST(cast) {
    this.casts.unshift(cast)
  }

  @mutation REMOVE_CAST(cast) {
    let found = this.casts.find(c => c.id === cast.id);
    let idx = this.casts.indexOf(<Cast>found);
    Vue.delete(this.casts, idx)
  }

  @action
  async connect() {
    console.log('Connecting to CuecastSocket.')
    socket = new CuecastSocket()
  }

  @action
  async addCast(params) {
    console.log('adding cast...')
    socket.addCast(params)
  }

  @action
  async removeCast(params) {
    socket.removeCast(params)
  }

  @action
  async fetchCasts() {
    console.log('fetching casts...')
    this.connect()
    await api.$get('casts').then(res => {
      this.SET_CASTS(res)
    })
  }

}
