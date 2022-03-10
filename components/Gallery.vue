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

  //- transition(name='fade')
  .slider-wrapper(v-if='n !== false')
    keen-slider(ref='slider', vertical, loop, :duration='300', :initial='n', :dragSpeed='1', :mode='"snap"', :class='{ "blurit": blurit }').slider
      keen-slide.item(v-for='(p, i) in gallery', :key='i', :class='["slide"+i]', v-if='p')
        .inner
          .single
            .image(:style='"background-image: url("+p.image.url+"); background-size: contain"', :class='{ "hideImage": hideImage }')
    .nav
      .control.prev(@click='nav("prev")')
      .control.next(@click='nav("next")')
      .close.fixed.top-2.right-2.lg-top-4.lg-right-4.text-3xl.w-8.cursor-pointer(@click='closeGallery') ✕

</template>

<script>
export default {
  name: 'gallery',
  props: ['gallery'],
  data () {
    return {
      // zoomed: false,
      n: false,
      blurit: false,
      hideImage: true
    }
  },
  watch: {
    n () {
      if (this.n !== false) {
        setTimeout(() => {
          this.hideImage = false
          this.blurit = true
        }, 1)
      }
    }
  },
  methods: {
    closeGallery () {
      this.blurit = false
      this.hideImage = true
      setTimeout(() => {
        this.n = false
      }, 501)
    },
    zoom(url, i) {
      console.log('zoom', url, i)
      this.$nuxt.$emit('setVh')
      // this.zoomed = url
      this.n = i
      console.log(this.n)
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
  backdrop-filter: blur(0px)
  background: #FFFFFF00
  transition: backdrop-filter 500ms ease-in, background 500ms ease-in
  &.blurit
    transition: backdrop-filter 500ms ease-out, background 500ms ease-out
    backdrop-filter: blur(6px)
    background: #FFFFFFCC
    
  .image
    opacity: 1
    filter: blur(0px)
    transition: opacity 500ms ease-in, filter 500ms ease-in
  .hideImage
    opacity: 0
    filter: blur(20px)
    transition: opacity 500ms ease-out, filter 500ms ease-out
  
.nav
  position: relative
  z-index: 250
.close
  position: fixed
  z-index: 300
  width: 1.6em

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
  transition: opacity 1300ms ease-out;
}
.fade-enter, .fade-leave-to{
  transition: opacity 1300ms ease-in;
  opacity: 0;
}
</style>