import Vue from 'vue'
import { action, mutation, VuexModule, Module } from '~/store/cuecast-store'
import { NuxtAxiosInstance } from '~/node_modules/@nuxtjs/axios'

declare var $nuxt: any

@Module({namespacedPath: 'layout'})
export class LayoutStore extends VuexModule {
  drawer: boolean = true

  @mutation TOGGLE_DRAWER() {
    this.drawer = !this.drawer
  }

  @action
  async toggleDrawer() {
    this.TOGGLE_DRAWER()
  }
}
