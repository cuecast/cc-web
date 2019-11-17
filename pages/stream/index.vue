<template>
  <section>
    <div class="columns">
      <div class="column is-7">
        <div class="columns">
          <div class="column is-12">
            <host-video />
          </div>
        </div>
      </div>
      <div class="column is-5">
        <guest-list />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HostVideo from '~/components/video-chat/HostVideo.vue'
import GuestVideo from '~/components/video-chat/GuestVideo.vue'
import GuestQueue from '~/components/video-chat/GuestQueue.vue'
import GuestList from '~/components/guests/GuestList.vue'

@Component({
  middleware: ['auth'],
  components: {
    HostVideo,
    GuestVideo,
    GuestList,
    GuestQueue
  },
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
