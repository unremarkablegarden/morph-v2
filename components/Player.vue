<template lang="pug">
#player.w-full
  .title(:class='titleColor(data)', v-if='data.title.length').absolute.z-1.uppercase.bold.text-2xl.leading-none.flex.items-center.justify-center.w-full
    | {{ data.title[0].text }}
  
  vue-plyr(
    ref='plyr' 
    id='player'
    :options='options[type]' 
  )
    div(
      data-plyr-provider="vimeo" 
      :data-plyr-embed-id='vimeoID'
      :controls='false'
      :playsinline='true'
    )

</template>

<script>
export default {
  name: 'player',
  head () {
    return { link: [{ rel: 'stylesheet', href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css' }] }
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    type: {
      type: String,
      default: 'controls'
    }
  },
  // ['data', 'type'],
  data () {
    return {
      options: {
        loop: {
          controls: [],
          playsinline: true,
          settings: [],
          autoplay: true,
          autopause: false,
          volume: 0,
          muted: true,
          clickToPlay: false,
          quality: 1080,
          loop: { 
            active: true 
          },
          vimeo: { 
            byline: false, 
            portrait: false, 
            title: false, 
            speed: false, 
            transparent: true, 
            controls: false 
          }      
        },
        controls: {
          // https://github.com/sampotts/plyr#options
          // debug: true,
          enabled: true,
          // ratio: this.aspectRatio,
          controls: [
            'play',
            'progress',
            'current-time',
            // 'play-large',
            'mute',
            'fullscreen'
          ],
          playsinline: true,
          settings: [],
          autoplay: false,
          autopause: true,
          volume: 0.5,
          clickToPlay: true,
          // clickToPlay: false,
          // hideControls: true,
          tooltips: { controls: false, seek: true },
          displayDuration: true,
          // fullscreen: { enabled: true, fallback: true, iosNative: false, container: null },
          quality: 1080,
          // loop: { active: true },
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
    }
  },
  computed: {
    vimeoID () {
      if (this.data.vimeo_url) {
        const vimeoURL = this.data.vimeo_url.split('/')
        return vimeoURL[vimeoURL.length - 1]
      }
    },
  },
  methods: {
    titleColor (p) {
      if (p.color) return 'black'
      else return 'white'
    }
    
  },
  mounted () {
    
  }
}
</script>

<style lang='sass' scoped>
.title
  height: calc(100vw / 16*9) // video size
  font-size: 2.2vw
  &.white
    color: #fafafa
    // color: red
  &.black
    color: #050505
</style>