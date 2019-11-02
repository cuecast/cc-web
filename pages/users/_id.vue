<template>
  <div v-if="$auth.loggedIn">
    <h1>{{$auth.user.email}}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"
import { User } from '~/types'

@Component({
  validate({params}) {
    return /^\d+$/.test(params.id)
  }
})
export default class extends Vue {
  constructor() {
    super()
  }
}
</script>

<style scoped>
</style>
