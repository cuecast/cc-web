<template>
  <div>
    Grabbing stuff from Rails API
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"

@Component
export default class extends Vue {
  mounted() {
    this.$axios.$get('calls').then((res) => {
      debugger
    })
  }
}
</script>

<style scoped>
</style>
