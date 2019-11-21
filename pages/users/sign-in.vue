<template>
  <div>

    <v-col cols="12">
      <h1>CueCast</h1>
    </v-col>

    <v-col>
      <v-form>
        <v-text-field
          label="Email"
          outlined
          v-model="form.email"
        ></v-text-field>
        <v-text-field
          label="Password"
          outlined
          v-model="form.password"
        ></v-text-field>
      </v-form>
    </v-col>

    <div class="has-text-centered">
      <a @click="$auth.login('local', form)" class="button is-vcentered is-primary is-outlined">Sign In</a>
      <a @click="$auth.login('google', form)" class="button is-vcentered is-primary is-outlined">Sign In with Google</a>
    </div>

    <div class="has-text-centered">
      <nuxt-link to="/users/sign-up"> Don't have an account? Click here to sign up.</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

interface Form {
  email: string;
  password: string;
}

@Component({layout: 'sign-in'})
export default class extends Vue {
  form: Form = {
    email: 'blur606@gmail.com',
    password: 'element9'
  }
}
</script>

<style scoped>
</style>
