<template>
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>CueCast
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu
      v-if="$auth.loggedIn"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-avatar v-on="on">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </template>

      <v-list>
        <v-list-item to="/users/profle">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/users/prifle">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$auth.logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon v-else to="/users/sign-in">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
