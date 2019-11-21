<template>
  <v-app>
    <app-header />
    <app-sidebar />
    <nuxt />
    <app-footer />
  </v-app>
</template>
<script lang="ts">
import AppHeader from '@/components/ui/AppHeader'
import AppSidebar from '@/components/ui/AppSidebar'
import AppFooter from '@/components/ui/AppFooter'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  }
})
export default class extends Vue {
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
