<template>
  <v-item-group>
    <v-row>
      <stream-item :stream="stream" v-for="stream in streams" />
    </v-row>
  </v-item-group>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import StreamItem from './StreamItem'
import { Stream } from '~/types'

@Component({
  components: {
    StreamItem
  }
})
export default class extends Vue {
  streams: Stream[] = this.$fake.streamList(20)
  mounted() {
  }
}
</script>

<style scoped>
</style>
