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
          type="email"
          v-model="email">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Password">
        <b-form-input
          placeholder="Enter email"
          required
          type="password"
          v-model="password">
        </b-form-input>
      </b-form-group>
      <b-button @click="authStore.signIn({email: email, password: password})" class="float-right" variant="primary">
        Submit
      </b-button>
    </b-card>
    <div v-if="authStore.currentUser">
      Current User: {{authStore.currentUser.email}}
    </div>
  </div>
</template>

<script lang="ts">
import { AuthStore, vxm } from "~/store"
import { Component, Vue } from "nuxt-property-decorator"

@Component
export default class extends Vue {
  authStore: AuthStore = vxm.auth
  email: string = '';
  password: string = '';
}
</script>

<style scoped>
</style>
