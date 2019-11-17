<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{guest.name}}</strong> <small>@johnsmith</small> <small>31m</small>
          <br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, ill quidem voluptatem.
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <button class="level-item button">Interview</button>
          <button class="level-item button">Queue</button>
        </div>
        <div class="level-right">
          <button class="level-item button is-small">
            <b-icon icon="chevron-up"></b-icon>
          </button>
          <button class="level-item button is-small">
            <b-icon icon="chevron-down"></b-icon>
          </button>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <b-dropdown position="is-right">
        <button
          slot="trigger"
          class="button is-small"
          style="border: none"
        >
          <b-icon icon="menu"></b-icon>
        </button>
        <b-dropdown-item>Private Message</b-dropdown-item>
        <b-dropdown-item>View Profile</b-dropdown-item>
        <b-dropdown-item class="has-text-danger">Block or Report</b-dropdown-item>
      </b-dropdown>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() guest
}
</script>

<style scoped>
</style>
