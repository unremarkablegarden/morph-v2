<template lang="pug">
#logo.z-10(:class='{ "set-fixed": fixed, "left-50vw": fixed, fixed: fixed, relative: !fixed, hide: hide, invert: invert }', v-if='logo')
  img(:src='logo', :class='{ "mt-4": fixed }').w-60px.lg-w-100px.h-auto
</template>

<script>
export default {
  name: 'Logo',
  props: ['hide', 'invert', 'fixed'],
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
.set-fixed
  transform: translateX(-50%)
#logo.relative
  &:hover
    transform: scale(1.1)
    // transition: transform 200ms ease
#logo
  opacity: 100
  display: inline-block
  // transition: transform 200ms ease
  
#logo, .hide
  will-change: opacity
  transition: opacity 1000ms ease, transform 200ms ease
.hide
  opacity: 0 !important
.invert
  filter: invert(100)
</style>
