<template>
  <canvas :key="randomNum" class="visualizer" height="300" ref="canvas" width="300" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"

@Component
export default class extends Vue {
  @Prop() audioData!: Uint8Array;
  @Prop() randomNum!: number;

  updated() {
    this.drawCanvas()
  }

  drawCanvas() {
    const processedAudioData = this.audioData
    let canvas: any = this.$refs.canvas
    const context = canvas.getContext('2d')
    const height = canvas!.height;
    const width = canvas!.width;
    let x = 0;
    const sliceWidth = (width * 1.0) / processedAudioData.length;

    context!.lineWidth = 1.5;
    context!.strokeStyle = '#65b5b4';
    context!.clearRect(0, 0, width, height);

    context!.beginPath();
    context!.moveTo(0, height / 2);
    for (let i = 0; i < processedAudioData.length; i++) {
      if (i % 1 == 0) {
        const item = processedAudioData[i];
        const y = (item / 255.0) * (height);
        context!.lineTo(x, y);
        x += sliceWidth;
      }
    }
    context!.lineTo(x, height / 2);
    context!.stroke();
  }
}
</script>

<style scoped>
.visualizer {
  border: 1px solid gray;
  height: 25rem;
  width: 100%;
}

.visualizer > canvas {
  background-color: #2c2e31;
  height: 100%;
  width: 100%;
}
</style>
