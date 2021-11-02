<template lang="pug">
#main-header(:class='{ relative: !isIndex, fixed: isIndex }').z-10.w-full

  main-menu
  
  header.z-30.text-center.flex.justify-between.items-center.fixed.top-0.lg-top-6.w-full.bg-white.lg-bg-transparent
  
    .ham-menu.w-1x3.mx-2.lg-mx-10
      hamburger(:invert='isIndex')
  
    .logo.w-1x3.mx-2.lg-mx-10.mt-2.lg-mt-0(:class='{ "opacity-0": isIndex }')
      nuxt-link(to='/')
        logo(:invert='true')
  
    .info.w-1x3.text-right.text-2xl.lg-text-3xl.mx-2.lg-mx-10
      .mr-1.lg-mr-0
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
      if (this.route.includes('index')) return true
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