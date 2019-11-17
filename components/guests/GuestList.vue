<template>
  <div class="card waiting-list">
    <header class="card-header">
      <p class="card-header-title">
        Waiting List
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
      </a>
    </header>
    <div class="inner">
      <div class="card-content">
        <guest-item :guest="guest" :key="guest.id" v-for="guest in sampleGuests" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GuestItem from './GuestItem.vue'
import { Guest } from '~/types'

@Component({
  components: {
    GuestItem
  }
})
export default class extends Vue {
  sampleGuests: Guest[] = [
    {id: 1, name: 'Holly Johnson'},
    {id: 2, name: 'Dominic Nunes'},
    {id: 3, name: 'Glass Necklace'},
    {id: 4, name: 'Tom Wilson'},
    {id: 5, name: 'James Necklace'},
    {id: 6, name: 'Adam Necklace'},
    {id: 7, name: 'Charles Necklace'},
    {id: 8, name: 'Glass Necklace'}
  ]
}
</script>

<style scoped>
.waiting-list {
}

.waiting-list .inner {
  height: 81vh;
  overflow-y: auto;
}
</style>
