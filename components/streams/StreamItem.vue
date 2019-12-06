<template>
  <v-col
    sm="4"
    md="3"
  >
    <v-hover v-slot:default="{ hover }">
      <v-card
        tile
        class="mx-auto cc-card"
        :elevation="hover ? 2 : 0"
        :to="`/streams/${stream.id}`"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">{{stream.title}}</v-list-item-title>
            <v-list-item-subtitle>{{stream.hostName}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          :src="stream.thumbnail"
          height="194"
        ></v-img>

        <v-card-text>{{stream.description}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Stream } from '~/types'

@Component
export default class extends Vue {
  @Prop() stream: Stream
}
</script>

