import { action, Module, mutation, VuexModule } from '~/store/cuecast-store'
import { Stream } from '~/types'

declare var $nuxt: any

@Module({namespacedPath: 'streams'})
export class StreamStore extends VuexModule {
  stream?: Stream = undefined

  @mutation SET_STREAM(stream: Stream) {
    this.stream = stream
  }

  @action
  async fetchStream() {
    await $nuxt.$axios.$get('casts/mock_show').then(res => {
      console.log('==========================================')
      console.log('Random stream:')
      console.dir(res)
      console.log('==========================================')
      this.SET_STREAM(res)
    })
  }

}
