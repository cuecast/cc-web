<template>
  <div class="chat-input elevation-1">
    <textarea name="" placeholder="Enter your message here:"></textarea>
    <v-btn class="send-btn" fab small>
      <v-icon dark>mdi-send</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
}
</script>

<style scoped lang="scss">
.chat-input {
  display: flex;
  background-color: #4a4a4a;
  border-radius: 10px;
  color: black;
  margin: 10px;
  width: 96%;
  bottom: 0;
  position: absolute;

  textarea {
    padding: 10px;
    width: 100%;
    resize: none;
    outline: none;
    color: white;
  }

  .send-btn {
    margin: 20px;
    align-items: end;
  }
}
</style>
