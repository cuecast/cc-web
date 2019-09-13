<template>
  <div>
    <b-card
      class="mb-2"
      img-alt="Image"
      img-src="https://picsum.photos/id/13/600/300"
      img-top
      style="max-width: 20rem;"
      tag="article"
      title="Sign Up">
      <b-form-group
        label="Email">
        <b-form-input
          placeholder="Enter email"
          required
          type="email"
          v-model="form.email">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Password">
        <b-form-input
          placeholder="Enter password"
          required
          type="password"
          v-model="form.passwordConfirmation">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Confirm Password">
        <b-form-input
          placeholder="Confirm password"
          required
          type="password"
          v-model="form.password">
        </b-form-input>
      </b-form-group>
      <b-button
        @click="authStore.signUp(form)"
        class="float-right" variant="primary">
        Submit
      </b-button>

      <b-link to="/users/sign-up"></b-link>
    </b-card>
  </div>
</template>

<script lang="ts">
import { AuthStore, vxm } from "~/store"
import { Component, Vue } from "nuxt-property-decorator"

interface Form {
  email: string;
  password: string;
  passwordConfirmation: string;
}

@Component
export default class extends Vue {
  authStore: AuthStore = vxm.auth
  form: Form = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }
}
</script>

<style scoped>
</style>
