<template lang="pug">
#gallery(v-if='gallery && gallery.length && gallery[0].image && gallery[0].image.url')
  .thumbs.w-full.lg-overflow-x-auto(v-if='!n').lg-pb-8
    .thumb(v-for='(g, i) in gallery').inline-block.h-auto.cursor-pointer
      .mr-2.mb-2.thumb-margin
        .img(:style='"background-image: url("+g.image.thumb.url+")"', :data-n='i', @click='zoom(g.image.url, i)')
  
  //- transition(name='fade')
    .zoomer(v-if='zoomed').fixed.top-0.left-0.flex.justify-around.align-middle
      .close.fixed.top-4.right-4.text-3xl.cursor-pointer(@click='zoomed = false') ✕
      //- img(:src='zoomed')
      .zoom-img(:style='"background-image: url("+zoomed+")"')

  transition(name='fade')
    .slider-wrapper(v-if='n')
      keen-slider(ref='slider', vertical, loop, :duration='300', :initial='n', :dragSpeed='1', :mode='"snap"').slider
        keen-slide.item(v-for='(p, i) in gallery', :key='i', :class='["slide"+i]', v-if='p')
          .inner
            .single
              .image(:style='"background-image: url("+p.image.url+"); background-size: contain"')
      .nav
        .control.prev(
          @click='nav("prev")'
        )
        .control.next(
          @click='nav("next")'
        )
        .close.fixed.top-2.right-2.lg-top-4.lg-right-4.text-3xl.w-8.cursor-pointer(@click='n = false') ✕
        
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
      // zoomed: false,
      n: false
    }
  },
  methods: {
    zoom(url, i) {
      this.$nuxt.$emit('setVh')
      // this.zoomed = url
      this.n = i
    },
    nav (dir) { 
      // console.log('nav ' + dir)
      if (dir == 'next') this.$refs.slider.next()
      if (dir == 'prev') this.$refs.slider.prev()
      let t = this
      setTimeout(() => {
        console.log('resize')
        
        t.resize()
      }, 301)
    },
    resize () {
      this.$refs.slider.resize()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/responsive.sass'

// +sm
//   .h-full
//     height: 100vh !important
//     height: calc(var(--vh, 1vh) * 100) !important
  
// .zoomer
//   width: 100vw
//   height: 100vh
//   height: calc(var(--vh, 1vh) * 100)
//   z-index: 200
//   backdrop-filter: blur(6px)
//   background: #FFFFFFCC
//   background-image: url(https://images.prismic.io/morph/4b6110f9-8acc-4028-9802-8ca2460cf5e4_loader.gif?auto=compress)
//   background-size: 20px auto
//   background-position: 50% 43%
//   background-repeat: no-repeat
//   .close
//     z-index: 300
//   .zoom-img
//     +sm
//       transform: scale(0.9)
//     width: 100vw
//     height: 100vh
//     height: calc(var(--vh, 1vh) * 100)
//     background-size: contain
//     background-repeat: no-repeat
//     background-position: center

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
    background-position: center
  &:after
    content: ""
    display: block
    padding-bottom: 120%

.slider
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 200
  // height: calc(var(--vh, 1vh) * 100)
  backdrop-filter: blur(6px)
  background: #FFFFFFCC
  // background-image: url(https://images.prismic.io/morph/4b6110f9-8acc-4028-9802-8ca2460cf5e4_loader.gif?auto=compress)
  // background-size: 20px auto
  // background-position: 50% 43%
  // background-repeat: no-repeat
.nav
  position: relative
  z-index: 250
.close
  position: fixed
  z-index: 300

.item
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  width: 100vw
  overflow: hidden
  transform: translate3d(0, 0, 0)
  .image
    height: 90vh
    height: calc(var(--vh, 1vh) * 90)
    width: 90vw
    transform: translate(5vw, 5vh)
    background-position: center center
    background-size: auto 100%
    background-repeat: no-repeat
.nav
  .control
    +sm
      display: none !important
    z-index: 250
    position: fixed
    top: 0
    width: 20vw
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
    // background: #FF000020
  .prev
    left: 0
    cursor: w-resize 
  .next
    right: 0
    cursor: e-resize
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