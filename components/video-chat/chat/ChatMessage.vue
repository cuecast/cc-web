<template>
  <div class="chat-message">
    <p>{{message.username}}: {{message.body}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ChatMessage } from '~/types'

@Component
export default class extends Vue {
  @Prop() message: ChatMessage

}
</script>

<style scoped>
.chat-message {

}
</style>
