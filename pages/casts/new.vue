<template>
  <div>
    <h1 class="title">New Cast</h1>
    <div class="card">
      <div class="card-content">
        <b-field label="CueCast URL">
          <b-input v-model="stream_url"></b-input>
        </b-field>
        <b-field label="Name">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="Name">
          <b-input v-model="name"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"

@Component
export default class extends Vue {
}
</script>

<style scoped>
</style>
