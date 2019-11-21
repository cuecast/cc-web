<template>
  <div>

    <v-col cols="12">
      <h1 class="display-2">Cuecast</h1>
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
          password
          v-model="form.password"
        ></v-text-field>
      </v-form>
      <v-btn outlined @click="$auth.login('local', form)">
        Sign In
      </v-btn>
      <v-btn outlined @click="$auth.login('google')">
        <v-icon>mdi-google</v-icon>
      </v-btn>
      <v-btn outlined @click="$auth.login('google')">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn outlined @click="$auth.login('google')">
        <v-icon>mdi-twitch</v-icon>
      </v-btn>

      <br>
      <br>
      <v-divider />
      <br>
      <nuxt-link to="/users/sign-up">Can't remember my password.</nuxt-link>
    </v-col>
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
    email: 'test@mail.com',
    password: 'foobar'
  }
}
</script>

<style scoped>
</style>
