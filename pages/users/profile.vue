<template>
  <div>
    <audio-recorder></audio-recorder>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import AudioRecorder from "~/components/audio-recorder/AudioRecorder.vue";

@Component({
  components: {AudioRecorder},
  middleware: ['auth']
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
