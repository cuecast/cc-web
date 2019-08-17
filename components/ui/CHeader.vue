<template>
  <b-navbar toggleable="lg" type="light">
    <b-navbar-brand href="#">Cuecast</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input class="mr-sm-2" placeholder="Search" size="sm"></b-form-input>
          <b-button class="my-2 my-sm-0" size="sm" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right v-if="$auth.loggedIn">
          <template slot="button-content"><em>{{$auth.user.email}}</em></template>
          <b-dropdown-item to="/users/profile">Profile</b-dropdown-item>
          <div v-if="$auth.loggedIn">
            <b-dropdown-item @click="authStore.signOut">Sign Out</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
        <div v-else>
          <b-button class="d-none d-lg-block ml-2" size="sm" to="/users/sign-in" variant="primary">Sign In</b-button>
          <b-button class="d-block d-lg-none mt-2" size="sm" to="/users/sign-in" variant="primary">Sign In</b-button>
        </div>
      </b-navbar-nav>
    </b-collapse>
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
