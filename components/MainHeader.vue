<template lang="pug">
#main-header(:class='{ relative: !isIndex, fixed: isIndex }').z-10.w-full

  main-menu
  
  header.z-30.text-center.flex.justify-between.items-center.fixed.top-6.w-full
    .ham-menu.w-1x3.mx-10
      hamburger(:invert='isIndex')
    .logo.w-1x3(:class='{ "opacity-0": isIndex }').mx-10
      nuxt-link(to='/')
        logo(:invert='true')
    .info.w-1x3.text-right.text-3xl.mx-10
      info
  
</template>

<script>
export default {
  name: 'MainHeader',
  data () {
    return {
      route: null
    }
  },
  computed: {
    isIndex () {
      if (this.route === 'index') return true
    }
  },
  watch: {
    '$route' (to, from) {
      this.route = to.name
    }
  },
  created () {
    this.route = this.$route.name
  }
}
</script>