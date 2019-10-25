<template>
  <div>
    <h1 class="title">OmniAuth Testing</h1>
    <button class="button is-success" @click="google">Sign In</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { AuthStore, vxm } from '~/store';

@Component
export default class extends Vue {
  google () {
    this.$auth.loginWith('google').catch(e => {
      alert("EROR: " )
    })
  }
}
</script>

<style scoped>
</style>
