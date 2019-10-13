<template>

  <div class="card">
    <div class="card-content">
      <p class="title">
        Add a Cast
      </p>
      <p class="subtitle">
        testing websockets w/ phoenix
      </p>

      <b-field label="Name">
        <b-input v-model="form.name"></b-input>
      </b-field>
    </div>
    <footer class="card-footer">
      <a @click="castStore.addCast(form)" class="card-footer-item">Submit</a>
    </footer>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { CastStore, vxm } from "~/store"

@Component
export default class extends Vue {
  castStore: CastStore = vxm.casts
  form: {} = {name: ''}
}
</script>

<style scoped>
</style>
