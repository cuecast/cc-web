<template>
  <li class="chat-message elevation-2" :class="{incoming: $auth.user.nickname === message.username}">
    <p>{{message.username}}: {{message.body}}</p>
  </li>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ChatMessage } from '~/types'

@Component
export default class extends Vue {
  @Prop() message: ChatMessage

}
</script>

<style scoped lang="scss">
.chat-message {
  min-width: 40%;
  margin: 10px;
  padding: 10px;
  background-color: #a1cbd1;
  color: black;
  border-radius: 4px;
  flex-basis: fit-content;
}

.incoming {
  background-color: #d1ad9b;
  margin-left: auto;
}

</style>
