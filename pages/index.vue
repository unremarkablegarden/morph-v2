<template lang="pug">
#index(v-if='doc')
  logo(:hide='hide', :fixed='true')
  newsletter
  xmp {{ doc }}
  //- .projects
    .project(v-for='(p, i) in projects', v-if='p.link.url && p.vimeo_embed && p.vimeo_embed.thumbnail_url')
      nuxt-link(:to='p.link.url')
        .loader.w-full.absolute.z-1
        
        .thumb(v-if='p.vimeo_embed.thumbnail_url', :style='"background-image: url(" + p.vimeo_embed.thumbnail_url.replace("_640", "_1280") + ");"').absolute.z-0.w-full
        
        .title(
          v-if='p.title.length', 
          :class='{ "text-white": !p.color, "text-black": p.color }'
        ).absolute.z-3.uppercase.bold.text-2xl.leading-none.flex.items-center.justify-center.w-full {{ p.title[0].text }}
        
        .z-2.relative
          vimeo-thumb(v-if='p.vimeo_embed.embed_url', :embed='p.vimeo_embed', :index='i')
</template>

<script>
import get from 'lodash/get'

export default {
  name: "index",
  // layout: "index",
  head () {
    if (!this.doc) { return }
    const title_text = get(this.doc, 'title[0].text')
    const description_text = get(this.doc, 'meta_description[0].text')
    const img_url = get(this.doc, 'meta_image.url')
    
    let meta = [
      { charset: 'utf-8' }
    ]
    
    const description = {
      hid: 'description',
      name: 'description', 
      content: description_text 
    }
    if (description_text && description_text !== 'undefined') meta.push(description)
      
    const image = {
      hid: 'og:image',
      property: 'og:image',
      content: img_url
    }
    if (img_url && img_url !== 'undefined') meta.push(image)
    
    return {
      title: 'Morph',
      meta: meta
    }
  },
  
  data () {
    return {
      windowTop: 0,
      scrollThres: 500
    }
  },
  computed: {
    projects () {
      return this.doc.project
    },
    hide () {
      return this.windowTop < this.scrollThres
    }
  },
  methods: {
    onScroll () {
      this.windowTop = window.top.scrollY 
    }
  },
  
  mounted () {
    this.$nuxt.$emit('playerDone', 0) // get it rolling
    // setTimeout(() => {
    //   this.$nuxt.$emit('playerDone', 1) // get it rolling
    // }, 100)
    
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

<style lang="sass" scoped>
@import '@/assets/sass/responsive.sass'

.project
  height: calc(100vw / 16*9) // video size
  +sm
    height: calc(100vw / 1) // mobile video size
  background-color: black
  .thumb
    // height: 100vw
    height: calc(100vw / 16*9)
    +sm
      height: 100vw
    background-size: cover
    background-position: center center
    backface-visibility: hidden
  .loader
    height: calc(100vw / 16*9)
    +sm
      height: 100vw
    background: white
    // background-image: url(/loader.gif)
    background-image: url(https://images.prismic.io/morph/4b6110f9-8acc-4028-9802-8ca2460cf5e4_loader.gif?auto=compress)
    background-size: 20px auto
    background-position: 50% 43%
    +sm
      background-size: 14px auto
      background-position: 50% 37%
    background-repeat: no-repeat
    filter: invert(100)
    // opacity: 0.5
    mix-blend-mode: screen
  .title
    height: calc(100vw / 16*9) // video size
    +sm
      height: 100vw
    font-size: 2.2vw
    +sm
      font-size: 1.2rem
    background-size: cover
    background-position: center center
</style>
