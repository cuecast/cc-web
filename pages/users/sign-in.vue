<template>
  <div>

    <h1 class="title">CueCast</h1>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-right">
        <input class="input" type="text" v-model="form.email">
        <span class="icon is-small is-right"> <i class="fa fa-user"></i> </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-right">
        <input class="input" type="password" v-model="form.password">
        <span class="icon is-small is-right"> <i class="fa fa-key"></i> </span>
      </div>
    </div>

    <div class="has-text-centered">
      <a @click="authStore.signIn(form)"
         class="button is-vcentered is-primary is-outlined">Login</a>
    </div>

    <div class="has-text-centered">
      <nuxt-link to="/users/sign-up"> Don't have an account? Click here to sign up.</nuxt-link>
    </div>

  </div>
</template>

<script lang="ts">
import { AuthStore, CastStore, vxm } from "~/store"
import { Component, Vue } from "nuxt-property-decorator"

interface Form {
  email: string;
  password: string;
}

@Component({layout: 'sign-in'})
export default class extends Vue {
  castStore: CastStore = vxm.casts
  authStore: AuthStore = vxm.auth
  form: Form = {
    email: 'blur606@gmail.com',
    password: 'element9'
  }
}
</script>

<style scoped>
</style>
