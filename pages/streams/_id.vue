<template>
  <div>
    <v-row>
      <v-col sm="8">
        <host-video />
      </v-col>
      <v-col sm="4">
        <app-chat />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HostVideo from '~/components/video-chat/HostVideo.vue'
import AppChat from '~/components/video-chat/AppChat.vue'
import { StreamStore, vxm } from '~/store'


@Component({
  components: {
    AppChat,
    HostVideo
  }
})
export default class extends Vue {
  streamStore: StreamStore = vxm.streams

  mounted() {
    this.streamStore.fetchStream()
  }
}
</script>

<style scoped>
</style>
