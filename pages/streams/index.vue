<template>
  <stream-list />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import StreamList from '~/components/streams/StreamList.vue'

@Component({
  components: {StreamList}
})
export default class extends Vue {
}
</script>

<style scoped>
</style>
