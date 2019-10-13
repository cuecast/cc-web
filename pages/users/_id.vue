<template>
  <div v-if="$auth.loggedIn">
    <h1>{{authStore.user.email}}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"
import { User } from '~/types'
import { AuthStore, vxm } from '~/store'

@Component({
  validate({params}) {
    return /^\d+$/.test(params.id)
  }
})
export default class extends Vue {
  authStore: AuthStore = vxm.auth

  constructor() {
    super()
  }
}
</script>

<style scoped>
</style>
