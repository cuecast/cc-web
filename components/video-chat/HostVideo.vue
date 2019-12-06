<template>
  <v-card
    elevation="0"
    >
    <v-img>
      <video-chat video-name="localVideo" @video-stream="startStream" />
    </v-img>
      <v-card-title>Name of stream</v-card-title>
    <v-card-subtitle size="large">username</v-card-subtitle>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Dominic Nunes</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
          >
          <v-icon class="mr-1">mdi-search</v-icon>
          <span class="subheading mr-2">195</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-share-variant</v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { CallStore, vxm } from '~/store'
import VideoChat from './VideoChat.vue'
import { Stream } from '~/types'

@Component({
  components: {
    VideoChat
  }
})
export default class extends Vue {
  callStore: CallStore = vxm.calls
  $refs!: {
    localVideo: HTMLVideoElement
  }

  startStream(video) {
    this.callStore.connect({localVideo: video})
  }

}

</script>

<style scoped>
</style>
