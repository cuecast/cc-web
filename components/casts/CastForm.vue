<template>
  <div class="card">
    <div class="card-body">
      <h2>Cast Form</h2>
      <hr>

      <b-form-group id="cast-name" label="Cast Name:" label-for="cast-name">
        <b-form-input
          id="cast-name"
          placeholder="Enter name"
          required
          v-model="form.name"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-btn @click="castStore.addCast(form)">Submit</b-btn>
      </b-form-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import { CastStore, vxm } from "~/store"

@Component
export default class extends Vue {
  castStore: CastStore = vxm.casts
  form: {} = {name: ''}
}
</script>

<style scoped>
</style>
