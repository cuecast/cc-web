<template>
  <b-navbar style="margin-bottom: 2rem;  box-shadow:0px 1px 4px #eee;">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" to="/">
        <strong class="is-size-5">CueCast</strong>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="nuxt-link" to="/stream">
        Stream
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/casts">
        Casts
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item>
          <n-link to="/testing/random">
            Random
          </n-link>
        </b-navbar-item>
        <b-navbar-item>
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template slot="end">
      <b-dropdown
        aria-role="menu"
        position="is-bottom-left"
        v-if="$auth.loggedIn">
        <a
          class="navbar-item"
          role="button"
          slot="trigger">
          <span>{{$auth.user.email}}</span>
          <b-icon icon="menu-down"></b-icon>
        </a>
        <b-dropdown-item aria-role="menuitem" custom>
          Logged in as <b>{{$auth.user.email}}</b>
        </b-dropdown-item>
        <hr class="dropdown-divider">
        <b-dropdown-item has-link>
          <n-link to="/users/profile">
            <b-icon icon="account"></b-icon>
            Profile
          </n-link>
        </b-dropdown-item>
        <b-dropdown-item @click="$auth.logout()" aria-role="menuitem" value="logout">
          <b-icon icon="logout"></b-icon>
          Log Out
        </b-dropdown-item>
      </b-dropdown>
      <b-navbar-item v-else>
        <div class="buttons">
          <n-link class="button is-primary" to="/users/sign-up">
            <strong>Sign Up</strong>
          </n-link>
          <n-link class="button is-light" to="/users/sign-in">
            Sign In
          </n-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { AuthStore, vxm } from '~/store'

@Component({
  components: {},
})
export default class CHeader extends Vue {
  authStore: AuthStore = vxm.auth
}
</script>

<style scoped>
</style>
