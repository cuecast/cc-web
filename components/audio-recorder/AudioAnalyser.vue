<!--suppress TypeScriptUnresolvedFunction -->
<template>
  <audio-visualizer :audio-data="audioData" :random-num="randomNum" v-if="audioData" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"
import AudioVisualizer from "./AudioVisualizer.vue";

declare var MediaRecorder: any;

@Component({
  components: {AudioVisualizer}
})
export default class extends Vue {
  @Prop() audio!: MediaStream
  audioData: Uint8Array = new Uint8Array();
  randomNum: number = 0;

  private dataArray: Uint8Array = new Uint8Array();
  private audioContext!: AudioContext;
  private analyser: any;
  private source?: MediaStreamAudioSourceNode;
  private rafId?: number;
  private blobs: Array<Blob> = new Array<Blob>()
  private audioRecorder

  mounted() {
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.audio);
    this.source.connect(this.analyser);
    this.tick()

    this.audioRecorder = new MediaRecorder(this.audio, {
      audioBitsPerSecond: 96000
    });

    this.audioRecorder.start(500);

    this.audioRecorder.stream.getTracks()

    this.audioRecorder.ondataavailable = (e) => {
      this.blobs.push(e.data);
    };

  }

  tick() {
    this.rafId = requestAnimationFrame(this.tick);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.randomNum = Math.random()
    this.audioData = this.dataArray
  }

  destroyed() {
    cancelAnimationFrame(this.rafId!);
    this.analyser.disconnect();
    this.source!.disconnect();
  }

}
</script>
