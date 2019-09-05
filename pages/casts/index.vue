<template>
  <div>
    <h1>Casts</h1>
    <hr>
    <cast-form />
    <br>
    <cast-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import CastList from "~/components/casts/CastList.vue"
import CastForm from "~/components/casts/CastForm.vue"

@Component({
  components: {CastList, CastForm}
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
