<template lang="pug">
#player
  
  vue-plyr(
    ref='plyr' 
    id='player'
    :options='options' 
  )
    div(
      data-plyr-provider="vimeo" 
      :data-plyr-embed-id='embed.video_id'
    )
    //- :controls='false'
    //- :playsinline='true'

</template>

<script>
export default {
  name: 'player',
  head () {
    return { link: [{ rel: 'stylesheet', href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css' }] }
  },
  props: {
    embed: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      options: {
        // https://github.com/sampotts/plyr#options
        controls: [
          'play',
          'progress',
          'current-time',
          // 'play-large',
          // 'mute',
          'fullscreen'
        ],
        playsinline: true,
        volume: 1,
        hideControls: true,
        tooltips: { controls: false, seek: true },
        fullscreen: { enabled: true, fallback: true, iosNative: false, container: null },
        quality: 1080,
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
  
}
</script>

<style lang='sass' scoped>
#player
  --plyr-color-main: white
  --plyr-control-icon-size: 14px
  --plyr-control-spacing: 10px
  --plyr-control-padding: --plyr-control-spacing * 0.7 (7px)
  --plyr-control-toggle-checked-background: #FFFFFF10
  --plyr-video-controls-background: transparent
  --plyr-video-control-color-hover: white
  --plyr-video-control-background-hover: transparent
  --plyr-range-thumb-height: 5px
  --plyr-range-thumb-shadow: none
  --plyr-font-family: 'f', sans-serif
  // --plyr-font-weight-regular: 600
  *
    font-weight: bold
</style>