<template lang="pug">
#gallery(v-if='gallery && gallery.length && gallery[0].image && gallery[0].image.url')
  .thumbs.w-full.overflow-x-auto
    .thumb(v-for='(g, i) in gallery').inline-block.h-auto.cursor-pointer
      .mr-2.mb-2.thumb-margin
        .img(:style='"background-image: url("+g.image.thumb.url+")"', :data-n='i', @click='zoom(g.image.url, i)')
        //- img(:src='g.image.thumb.url', @click='zoom(g.image.url, i)', :data-n='i')
  
  transition(name='fade')
    .zoomer(v-if='zoomed').fixed.top-0.left-0.flex.justify-around.align-middle
      .close.fixed.top-4.right-4.text-3xl.cursor-pointer(@click='zoomed = false') ✕
      //- img(:src='zoomed')
      .zoom-img(:style='"background-image: url("+zoomed+")"')
      
    
    //- {
    //-   "image": {
    //-     "dimensions": {
    //-       "width": 1801,
    //-       "height": 2700
    //-     },
    //-     "alt": null,
    //-     "copyright": null,
    //-     "url": "https://images.prismic.io/morph/15552151-caaa-4777-9af0-e763d82ed940_SS21-milano-catwalk-look23.jpg?auto=compress,format&rect=0,0,2049,3072&w=1801&h=2700",
    //-     "thumb": {
    //-       "dimensions": {
    //-         "width": 800,
    //-         "height": 1200
    //-       },
    //-       "alt": null,
    //-       "copyright": null,
    //-       "url": "https://images.prismic.io/morph/15552151-caaa-4777-9af0-e763d82ed940_SS21-milano-catwalk-look23.jpg?auto=compress,format&rect=0,0,2048,3072&w=800&h=1200"
    //-     }
    //-   }
    //- },
</template>

<script>
export default {
  name: 'gallery',
  props: ['gallery'],
  data () {
    return {
      zoomed: false,
      n: false
    }
  },
  methods: {
    zoom(url, i) {
      this.zoomed = url
      this.n = i
    },
    openGallery () {
      this.show = true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/responsive.sass'

.zoomer
  width: 100vw
  height: 100vh
  z-index: 200
  backdrop-filter: blur(6px)
  background: #FFFFFFCC
  // background-image: url(/loader.gif)
  background-image: url(https://images.prismic.io/morph/4b6110f9-8acc-4028-9802-8ca2460cf5e4_loader.gif?auto=compress)
  background-size: 20px auto
  background-position: 50% 43%
  background-repeat: no-repeat
  // filter: invert(100)
  .close
    z-index: 300
  .zoom-img
    +lg
      box-shadow: 0 0 25px 0px #00000022
    // max-width: 90vw
    // max-height: 90vh
    // width: 100%
    // height: auto
    transform: scale(0.9)
    width: 100vw
    height: 100vh
    background-size: contain
    background-repeat: no-repeat
    background-position: center
.thumbs
  line-height: 0
.thumb
  width: calc(100% * 1/3)
  +lg
    width: calc(100% * 1/6)
.img
  background-color: #fafafa
  background-size: cover
  background-position: top
  transition: all 300ms
  &:hover
    background-position: bottom
  &:after
    content: ""
    display: block
    padding-bottom: 100%
    
// .thumb:nth-child(4n) .thumb-margin
//   margin-right: 0 !important
</style>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms ease-out;
}
.fade-enter, .fade-leave-to{
  transition: opacity 300ms ease-in;
  opacity: 0;
}
</style>