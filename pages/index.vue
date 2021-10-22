<template lang="pug">
#index(v-if='doc')
  logo(:hide='hide')
  .project(v-for='(p, i) in doc.project', v-if='p.link.url')
    nuxt-link(:to='p.link.url')
      player(v-if='p.vimeo_url', :data='p', type='loop')
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      windowTop: 0,
      scrollThres: 500
    }
  },
  computed: {
    hide () {
      return this.windowTop < this.scrollThres
    }
  },
  methods: {
    onScroll () {
      this.windowTop = window.top.scrollY 
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getSingle('landing')
    if (document && document.data) {
      const doc = document.data
      return { doc }
    } else {
      error({ statusCode: 404 })
    }
    return false
  }
}
</script>
