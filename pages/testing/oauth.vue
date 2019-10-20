<template>
  <div>
    <h1 class="title">OmniAuth Testing</h1>
    <button class="button is-success" @click="authStore.googleSignIn()">Sign In</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { AuthStore, vxm } from '~/store';

@Component
export default class extends Vue {
  authStore: AuthStore = vxm.auth
}
</script>

<style scoped>
</style>
