<template lang="pug">
.resp-img(:class="{ 'relative': !bg, 'enlarge-on-hover': hoverEnlarge }", :style="{paddingBottom: !bg && `${dims.height / dims.width * 100}%`}", v-if="image.url")
    .text(:style='{ color: textColour.toLowerCase() }', :class='textSizeClasses', v-if='text').absolute.z-10.h-full.w-full.flex.justify-center.items-center.not-italic.font-normal.tracking-wide.uppercase
      | {{ text }} 
    //- //- modern browsers load srcset instead of src
    //- //- lazysizes will load data-srcset when visible
    img.absolute.overlay.lazyload(ref="image", :class="fit", :src="$thumb(image.url, [800])", srcset="/loading.gif", :data-srcset="thumb", data-sizes="auto", :alt="image.alt", @click="$emit('click')", data-expand="2000")
</template>

<script>
export default {
  name: 'RespImg',
  props: {
    image: { type: Object, default: () => ({}) },
    bg: { type: Boolean, default: false },
    fit: { type: String, default: 'object-cover object-center' },
    ratio: { type: Number, default: 0 },
    text: { type: String, default: null },
    textColour: { type: String, default: 'white' },
    textSize: { type: String, default: 'small' },
    hoverEnlarge: { type: Boolean, default: false },
    isHero: { type: Boolean, default: false }
  },
  data () {
    return {
      thumb: '',
      win: {
        w: 0,
        h: 0
      }
    }
  },
  computed: {
    isVertical () {
      return this.win.w / this.win.h < 1
    },
    dims () {
      let dims = this.image.dimensions || { height: this.image.height, width: this.image.width }
      if (this.isVertical && this.isHero) {
        // vertical not horizontal = phone
        // turn the landscape aspect image into portrait
        dims = { height: this.image.dimensions.width, width: this.image.dimensions.height } || { height: this.image.width, width: this.image.height }
      }
      return dims
    },
    textSizeClasses () {
      const ts = this.textSize
      let classes
      if (ts === 'big') {
        classes = 'md-text-30 md-leading-none text-21 leading-loose'
      } else if (ts === 'small') {
        classes = 'text-21 leading-loose'
      }
      return classes
    }
  },
  methods: {
    resizeImgByFit () {
      /*
       * optimized image size, based on image asset aspect-ratio (AR) against <img>
      */
      const nativeAR = this.dims && this.dims.width / this.dims.height // 2x3 = 0.66
      // frame details (fallback to window for hidden images, like in lightbox)
      const frameW = this.$refs.image?.offsetWidth || window.innerWidth
      const frameH = this.$refs.image?.offsetHeight || window.innerHeight
      const frameAR = frameW / frameH // W x H (4x3 > 1.5)
      // conditions for sizing by height...
      const isBgContain = this.bg && this.fit.includes('object-contain')
      const resizeByHeight = (isBgContain && nativeAR < frameAR) || (this.bg && nativeAR > frameAR)
      // size by height or width ?
      let size = resizeByHeight ? [null, frameH] : [frameW]
      // increase the resolution for mobile hero images
      if (this.isVertical && this.isHero) {
        size = [size[0] * 3]
      }
      // resize !
      this.thumb = this.$thumb(this.image.url, size)
    },
    measureWindow () {
      this.win.w = window.innerWidth
      this.win.h = window.innerHeight
    }
  },
  mounted () {
    this.measureWindow()
    this.resizeImgByFit()
  }
}
</script>

<style scoped>
.enlarge-on-hover img {
  will-change: transform;
  transition: 200ms transform ease-in;
  transform: scale(1.0);
}
.enlarge-on-hover:hover img {
  will-change: transform;
  transition: 200ms transform ease-out;
  transform: scale(1.05);
}
.resp-img {
  overflow: hidden;
}
.text {
  /* position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.15em;
  text-transform: uppercase; */
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>

<!--
lazysizes loaded image, using "modern srcset" approach
* https://github.com/aFarkas/lazysizes#modern-transparent-srcset-pattern
-->
