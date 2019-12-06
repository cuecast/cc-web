<template>
  <v-card
    elevation="0"
  >
    <div class="chat-container">
      <ul class="chat-messages">
        <chat-message :message="message" v-for="message in chatMessages" />
        <br>
        <br>
        <br>
        <br>
      </ul>
      <chat-input />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ChatInput from '~/components/video-chat/chat/ChatInput.vue'
import ChatMessage from '~/components/video-chat/chat/ChatMessage.vue'

@Component({
  components: {ChatMessage, ChatInput}
})
export default class extends Vue {
  chatMessages: string[] = [
    {username: 'ryan23', body: 'aerlkaflk awflkawflkeawf'},
    {username: 'test', body: 'felkawelfk waeflkw'},
    {username: 'b2932j', body: 'felkawelfk waeflkw wefke '},
    {username: 'b2932j', body: 'felkawelfk waeflkw wefke '},
    {username: 's239kc', body: 'felkawelfk  wefk ewkwaeflkw'},
    {username: 'eb12', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'eb12', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'test', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'eb12', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'seb12', body: 'waeflkw'},
    {username: 'test', body: 'awf wekflawekf'},
    {username: 'test', body: 'awefklw flawekf e'},
    {username: 's239kc', body: 'felkawelfk  wefk ewkwaeflkw'},
    {username: 'eb12', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'eb12', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'test', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'eb12', body: 'f ewklf wlekf lkawelfk waeflkw'},
    {username: 'seb12', body: 'waeflkw'},
    {username: 'ciwee', body: 'awf wekflawekf'},
    {username: 'dom21212', body: 'awefklw flawekf e'}
  ]

}
</script>

<style scoped>
.chat-container {
  position: relative;
}

.chat-messages {
  height: 84vh;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start
}
</style>
