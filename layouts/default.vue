<template>
  <div>
    <c-header />
    <div class="container-fluid">
      <nuxt />
    </div>
  </div>
</template>
<script>
import CHeader from '@/components/ui/CHeader'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: { CHeader }
})
export default class Default extends Vue {
}
</script>
