import Vue from 'vue'
import { action, mutation, VuexModule, Module } from '~/store/cuecast-store'
import { YoutubeStream } from '~/types'
import { NuxtAxiosInstance } from '~/node_modules/@nuxtjs/axios'
import {appendFile} from 'fs'

declare var $nuxt: any

@Module({namespacedPath: 'platforms/youtube'})
export class YoutubeStore extends VuexModule {
  streams: YoutubeStream[] = <YoutubeStream[]>[]

  @mutation SET_STREAMS(streams) {
    this.streams = streams
  }

  @action
  async fetchStreams() {
    console.log('fetching Youtube streams...')
    await $nuxt.$axios.$get('platforms/youtube/streams').then(res => {
      this.SET_STREAMS(res.items)
    })
  }
}
