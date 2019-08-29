<template>
  <b-card title="Audio Recorder">

    <b-button @click="toggleMicrophone()" variant="danger">
      <fa :icon="audio ? 'pause' : 'circle'" />
    </b-button>

    <audio-analyser :audio="audio" v-if="audio"/>
  </b-card>
</template>


<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import AudioAnalyser from "~/components/audio-recorder/AudioAnalyser.vue";

@Component({
  components: {AudioAnalyser}
})
export default class extends Vue {
  audio: MediaStream | null = null;
  video: boolean = false;

  mounted() {
    this.audio = null
    this.video = false
  }

  toggleMicrophone() {
    if (this.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  private async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });

    this.audio = audio
  }

  private stopMicrophone() {
    if (this.audio) {
      this.audio.getTracks().forEach(track => track.stop());
      this.audio = null
    }
  }
}
</script>

<style scoped>
</style>
