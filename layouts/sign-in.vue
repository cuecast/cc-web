<template>
  <v-app>
    <v-container fluid style="padding-top: 0">
      <v-row justify="center" align="center">
        <v-col sm="4">
          <nuxt />
        </v-col>

        <!--        <v-col sm="8" class="interactive-bg" :style="{ backgroundImage: `url(${backgroundUrl})` }">-->
        <v-col sm="8" class="interactive-bg">
        </v-col>

      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import backgroundUrl from '~/static/streamer_bg.png'


@Component
export default class extends Vue {
  created () {
    this.$vuetify.theme.dark = false
  }
  data() {
    return {backgroundUrl}
  }
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

</style>
