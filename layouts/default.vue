<template lang='pug'>
#layout
  main-header
  #content
    Nuxt
</template>

<script>
export default {
  mounted () {
    this.setVh()
    this.$nuxt.$on('setVh', function(){
      this.setVh()
    })
    window.addEventListener('touchmove', this.setVh)
  },
  beforeDestroy () {
    window.removeEventListener('touchmove', this.setVh)
  },
  methods: {
    setVh () {
      console.log('setVH')
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  }
}
</script>