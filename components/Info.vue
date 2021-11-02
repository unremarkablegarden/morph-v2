<template lang="pug">
#info(:class='{ show: show }', v-if='info')
  button(@click='show = !show').uppercase.relative.z-40 Credits
  .menu(:class='{ "hide-menu": !show }', ref='info').right-menu.fixed.w-11x12.lg-w-5x12.top-0.right-0.z-20.overflow-y-auto
    .text-sm.lg-text-base.text-left.px-4.lg-px-10.lg-pt-35.pt-12.pb-8.text-justify
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
    
    // window.addEventListener('scroll', function () {
    //   this.$nuxt.$emit('setVh')  
    // })
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
  .menu
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
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
