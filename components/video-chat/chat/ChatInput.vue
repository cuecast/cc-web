<template>
  <div class="chat-input">
    <textarea name="" class="chat-input"></textarea>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
}
</script>

<style scoped>
.chat-input {
  position: absolute;
  bottom: -7px;
  width: 100%;
  left: 0;
}
</style>
