<template>
  <div class="">
    <chat-message :message="message" v-for="message in chatMessages" />
    <chat-input />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

@Component({
  components: {
    ChatMessage,
    ChatInput
  }
})
export default class extends Vue {
  chatMessages: string[] = [
    {username: 'ryan23', body: 'aerlkaflk awflkawflkeawf'},
    {username: 'seb12', body: 'felkawelfk waeflkw'},
    {username: 'ciwee', body: 'awf wekflawekf'},
    {username: 'dom21212', body: 'awefklw flawekf e'}
  ]

  mounted() {

  }
}
</script>

<style scoped>
.chat-overlay {
  position: absolute;
  padding: 10px;
  bottom: 6px;
  right: 0px;
  height: 70%;
  width: 36%;
  font-size: 16px;
  font-family: Helvetica;
  color: #FFF;
  background-color: rgba(50, 50, 50, 0.4);
}
</style>
