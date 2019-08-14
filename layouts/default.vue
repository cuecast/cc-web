<template>
  <div>
    <cc-header />
    <div class="container-fluid">
      <nuxt />
    </div>
  </div>
</template>
<script>
import CcHeader from '@/components/ui/CcHeader'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: { CcHeader }
})
export default class Default extends Vue {
}
</script>
