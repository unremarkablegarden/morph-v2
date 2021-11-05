<template lang="pug">
#player(v-if='loaded')
  vue-plyr(
    ref='plyr' 
    id='player'
    :options='options' 
  )
    div(
      data-plyr-provider="vimeo" 
      :data-plyr-embed-id='vimeoID'
    )
    //- :controls='false'
    //- :playsinline='true'

</template>

<script>
export default {
  name: 'plyr',
  head () {
    return { link: [{ rel: 'stylesheet', href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css' }] }
  },
  // props: ['vimeoID'],
  props: {
    vimeoID: {
      type: Number,
      default: 0
    },
    ratio: {
      type: String,
      default: "16:9"
    }
  },
  data () {
    return {
      loaded: false,
      options: {
        // https://github.com/sampotts/plyr#options
        controls: [
          'play',
          'progress',
          'current-time',
          'play-large',
          // 'mute',
          'fullscreen'
        ],
        // playsinline: true,
        playsinline: false,
        clickToPlay: false,
        volume: 1,
        hideControls: true,
        tooltips: { controls: false, seek: true },
        fullscreen: { enabled: true, fallback: true, iosNative: true, container: null },
        quality: 1080,
        ratio: this.ratio,
        vimeo: { 
          byline: false, 
          portrait: false, 
          title: false, 
          speed: false, 
          transparent: true, 
          controls: false 
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loaded = true
      console.log('load plyr')
    })
  }
}
</script>

<style lang='sass'>
#player
  --plyr-color-main: white
  --plyr-control-icon-size: 14px
  --plyr-control-spacing: 10px
  --plyr-control-padding: --plyr-control-spacing * 0.7
  --plyr-control-toggle-checked-background: #FFFFFF10
  --plyr-video-controls-background: transparent
  --plyr-video-control-color-hover: white
  --plyr-video-control-background-hover: transparent
  --plyr-range-thumb-height: 5px
  --plyr-range-thumb-shadow: none
  --plyr-font-family: 'f', sans-serif
  .plyr__control--overlaid 
    background: #00000033
    border-radius: 0
    left: 0
    top: 0
    opacity: 1
    transform: none
    z-index: 3
    width: 100% !important
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    svg
      transform: scale(2.2)
    
</style>