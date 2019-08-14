<template>
  <div>
    <b-card
      class="mb-2"
      img-alt="Image"
      img-src="https://picsum.photos/id/13/600/300"
      img-top
      style="max-width: 20rem;"
      tag="article"
      title="Sign In">
      <b-form-group
        label="Email">
        <b-form-input
          placeholder="Enter email"
          required
          type="email">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Password">
        <b-form-input
          placeholder="Enter email"
          required
          type="password">
        </b-form-input>
      </b-form-group>
      <b-button @click="authStore.signIn()" class="float-right" variant="primary"> Submit</b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import { AuthStore, vxm } from "~/store"
import { Component, Vue } from "nuxt-property-decorator"

@Component
export default class extends Vue {
  authStore: AuthStore = vxm.auth
}
</script>

<style scoped>
</style>
