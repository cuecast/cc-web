<template>
  <div>
    <input class="form-control" v-model="form.title">
    <button @click="addLink" class="btn">Add</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import { Channel, Socket } from "phoenix"

interface Form {
  title: string,
  url: string
}

@Component
export default class extends Vue {
  form: Form = {
    title: '',
    url: ''
  }
  private channel!: Channel;

  mounted() {
    // Connect to the websocket server
    let socket = new Socket("ws://localhost:4000/socket")
    socket.connect();
    // Join in the links channel
    this.channel = socket.channel("links", {});
    this.channel.join()
      .receive("ok", resp => {
        console.log("NewLink Joined successfully", resp)
      })
      .receive("error", resp => {
        console.log("NewLink Unable to join", resp)
      })

  }

  addLink() {
    let link = {
      title: this.form.title,

    }
  }
}
</script>

<style scoped>
</style>
