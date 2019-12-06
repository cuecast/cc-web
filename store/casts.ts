import Vue from 'vue'
import { action, mutation, VuexModule, Module } from '~/store/cuecast-store'
import { Cast } from '~/types'

declare var $nuxt: any

@Module({namespacedPath: 'casts'})
export class CastStore extends VuexModule {
  cast?: Cast = undefined
  casts: Cast[] = <Cast[]>[]

  @mutation SET_CAST(cast: Cast) {
    this.cast = cast
  }

  @mutation SET_CASTS(casts) {
    this.casts = casts
  }

  @mutation ADD_CAST(cast) {
    this.casts.unshift(cast)
  }

  @action
  async fetchCasts() {
    console.log('fetching casts...')
    await $nuxt.$axios.$get('casts').then(res => {
      this.SET_CASTS(res)
    })
  }

  @action
  async fetchCast() {
    console.log('fetching cast...')
    await $nuxt.$axios.$get('casts').then(res => {
      debugger
      this.SET_CAST(res)
    })
  }

}
