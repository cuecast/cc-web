<template>
  <b-navbar style="box-shadow:0px 1px 4px #eee;">
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
        <b-navbar-item tag="nuxt-link" to="/testing/random">
            Random
        </b-navbar-item>
        <b-navbar-item>
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template slot="end">
      <b-dropdown
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
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({
  components: {},
})
export default class CHeader extends Vue {
  mounted() {
  }
}
</script>

<style scoped>
</style>
