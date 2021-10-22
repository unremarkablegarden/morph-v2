<template lang="pug">
#logo.fixed.z-10.left-50vw(:class='{ hide: hide }', v-if='logo')
  img(:src='logo').w-100px.h-auto.mt-4
</template>

<script>
export default {
  name: 'Logo',
  props: ['hide'],
  async fetch () {
    const logo = await this.$prismic.api.getSingle('logo')
    this.logo = logo.data.logo.url
  },
  data () {
    return {
      logo: false
    }
  }
}
</script>

<style lang="sass" scoped>
#logo
  transform: translateX(-50%)
  opacity: 100
#logo, .hide
  will-change: opacity
  transition: opacity 1000ms
.hide
  opacity: 0 !important
</style>
