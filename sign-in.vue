<template>
  <div class="columns is-vcentered">

    <div class="login column is-4 ">
      <section class="section">
        <nuxt />
      </section>
    </div>

    <div class="interactive-bg column is-8" id="particles-js">
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"

@Component
export default class extends Vue {
}
</script>

<style scoped>
.interactive-bg {
  height: 100vh;
  background-color: #00d1b2;
  -webkit-box-shadow: inset 24px 4px 64px -24px rgba(71, 71, 71, 1);
  -moz-box-shadow: inset 24px 4px 64px -24px rgba(71, 71, 71, 1);
  box-shadow: inset 24px 4px 64px -24px rgba(71, 71, 71, 1);
  padding: 0px;
}

@media (max-width: 769px) {
  .interactive-bg {
    display: none
  }
}

.button {
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 150px;
}

.login-logo {
  margin: 0 auto;
  margin-bottom: 50px;
  max-height: 100px;

}

.columns {
  margin: 0px;
}
</style>
