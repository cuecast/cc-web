<template>
  <div>
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

    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control has-icons-right">
        <input class="input" type="password" v-model="form.passwordConfirmation">
        <span class="icon is-small is-right"> <i class="fa fa-key"></i> </span>
      </div>
    </div>


    <div class="has-text-centered">
      <a @click="$auth.signUp(form)"
         class="button is-vcentered is-primary is-outlined">Register</a>
    </div>
  </div>
</template>

<script lang="ts">
import { CastStore, vxm } from "~/store"
import { Component, Vue } from "nuxt-property-decorator"

interface Form {
  email: string;
  password: string;
  passwordConfirmation: string;
}

@Component
export default class extends Vue {
  castStore: CastStore = vxm.casts
  form: Form = {
    email: 'blur606@gmail.com',
    password: 'element9',
    passwordConfirmation: 'element9'
  }
}
</script>

<style scoped>
</style>
