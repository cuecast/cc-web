<template>
  <h1>{{authStore.currentUser.email}}</h1>
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
