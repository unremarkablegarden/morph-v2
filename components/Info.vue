<template lang="pug">
#info(:class='{ show: show }', v-if='info')
  button(@click='show = !show').uppercase.relative.z-40 Info
  .menu(:class='{ "hide-menu": !show }').right-menu.fixed.w-5x12.h-full.top-0.right-0.z-20.overflow-y-auto
    .text-base.text-left.px-10.pt-35.pb-8.text-justify
      prismic-rich-text(:field='info')
      
</template>

<script>
export default {
  name: 'info',
  // props: ['info'],
  data () {
    return {
      show: false,
      info: false,
    }
  },
  watch: {
    '$route' (to, from) {
      this.getInfo()
    }
  },
  mounted () {
    if (!this.info) this.getInfo()
    
    this.$nuxt.$on('menu-open', (val) => {
      if (val === false) this.closeIt()
    })
  },
  methods: {
    closeIt () {
      this.show = false
    },
    async getInfo () {
      if (this.$route.params.uid) {
        const page = await this.$prismic.api.getByUID('work', this.$route.params.uid)
        if (page && page.data && page.data.info && page.data.info.length) {
          this.info = page.data.info
        } else {
          this.info = false
        }
      } else {
        this.info = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
button:focus, button.focus 
  outline: none !important
  box-shadow: none !important
</style>

<style lang='sass'>
#info
  button
    transition: all 300ms ease
  &.show
    button
      transition: all 300ms ease
      transform: rotate(180deg)
      transform-origin: center center
  b, strong
    text-transform: uppercase
  p
    margin-bottom: 1em
</style>
