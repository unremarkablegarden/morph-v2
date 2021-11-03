<template lang="pug">
.vimeo-player.overflow-hidden(:class="{'opacity-0-off': invisible, 'absolute overlay': bgSize}")
  //- frame
  .vimeo-player__frame.overflow-hidden(
    ref="vimeo", 
    :class="{'relative': !bgSize, 'pb-ar-16x9': !bgSize && !loaded, 'absolute': bgSize }"
  )
    //- :style="!bgSize && ratio && {paddingBottom: `calc(100% * ${ratio})`}"
    //- <iframe> video will be injected

  //- resp-img(v-if="poster && !hasImagery", :image="poster", :bg="true")  
</template>

<script>
let Player
if (process.client) {
  Player = require('@vimeo/player')
  Player = Player.default
}
export default {
  name: 'VimeoPlayer',
  props: {
    vimeoURL: { type: String, default: undefined },
    bgSize: { type: String, default: undefined },
    clip: { type: Array, default: () => [] },
    controls: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    playBtn: { type: Boolean, default: false },
    loop: { type: Boolean, default: true },
    poster: { type: Object, default: undefined },
    clickable: { type: Boolean, default: false },
    observe: { type: Boolean, default: false },
    backgroundMode: { type: Boolean, default: true },
    index: { type: Number, default: 99999 },
    // autoplay: { type: Boolean, default: true }
  },
  data () {
    return {
      player: null,
      loaded: false,
      hasImagery: false,
      invisible: true,
      elW: 0,
      elH: 0,
      videoW: 0,
      videoH: 0,
      iframe: null,
      playing: null, // null while starting in looped-clip state
      muted: true,
      duration: 0
    }
  },
  computed: {
    elRatio () {
      return this.elH / this.elW
    },
    ratio () {
      return this.videoH / this.videoW
    },
    clipEnabled () {
      return this.clip[0] !== undefined && this.clip[1] > this.clip[0]
    },
    clipMode () {
      return this.playing === null && this.clipEnabled
    }
  },
  watch: {
    visible (vis) {
      if (vis) {
        this.$nextTick(() => this.resizeIframe())
        this.play()
      } else {
        this.pause()
      }
    }
  },
  mounted () {
    this.measure()
    
    this.$nuxt.$on('playerDone', (index) => {
      // console.log('playerDone = ' + index)
      if (index === this.index) {
        if (this.player === null) {
          console.log('init player index ' + this.index)
          this.init()
        }
      }
    })
    
    window.addEventListener('resize', this.resizeIframe)
    // this.$store.state.bus.$on('newWindowWidth', this.onNewWindowWidth)
  },
  destroyed () {
    // this.$store.state.bus.$off('newWindowWidth', this.onNewWindowWidth)
    window.removeEventListener('resize', this.resizeIframe)
  },
  methods: {
    init () {
      if (!this.vimeoURL) { return console.warn('No vimeo URL') }
      const options = {
        url: this.vimeoURL,
        background: this.backgroundMode,
        loop: this.loop
      }
      if (this.bgSize === 'cover') {
        options.maxheight = this.elH * 0.8
      } else {
        options.maxwidth = this.elW
      }
      // create player
      this.player = new Player(this.$refs.vimeo, options)
      // events
      this.player.on('loaded', async () => {
        try {
          await this.startAtClip()
          this.loaded = true
          this.$emit('loaded')
          this.resizeIframe() // resize and reveal
          this.duration = await this.player.getDuration()
          this.autoPlayPauseViewport()
          this.$nuxt.$emit('playerDone', (this.index+1)) // init next ones
          this.$nuxt.$emit('playerDone', (this.index+2)) // init next ones
        } catch (e) {
          console.error(e)
        }
      })
      this.player.on('timeupdate', this.onTimeUpdate)
      this.player.on('timeupdate', this.onFirstPlay) // binding to @play is inconsistent !
      this.player.on('ended', () => this.$emit('ended'))
    },

    startAtClip () {
      // jump to clip start (if set)
      if (!this.clipEnabled) { return Promise.resolve() }
      return this.player.setCurrentTime(this.clip[0])
    },
    onFirstPlay () {
      /**
       * Function to emit when video has visible imagery
       * - bind to 'timeupdate' because 'play' event fires inconsistently...
      **/
      this.hasImagery = true
      this.$emit('firstplay')
      // remove handler
      this.player.off('timeupdate', this.onFirstPlay)
      //
      // if (!this.autoplay) {
      //   console.log('no auto', this.vimeoURL)
      //   return this.pause()
      // }
      // skip if vimeo not visible yet
      // if (!this.visible) { return }
      // emit event (functions as "isLoaded")
      // this.$emit('firstplay')
    },
    onTimeUpdate (time) {
      // TODO - maybe don't update if in clip mode still ?
      if (this.playing !== null) {
        this.$emit('progress', time.percent * 100)
      }
      // if in clip mode - loop back to clip start on clip end
      if (this.clipEnabled && this.playing === null) {
        const end = this.clip[1]
        return end && time.seconds >= end && this.player.setCurrentTime(this.clip[0])
      }
    },

    play () {
      return this.player && this.player.getPaused().then(paused => paused && this.player.play())
    },
    pause () {
      return this.player && this.player.getPaused().then(paused => !paused && this.player.pause())
    },
    beginFullPlayback () {
      // exit: already setup
      if (this.playing !== null) { return console.warn('Full playback already initialized!') }
      // disable clip mode, set time to 0
      this.$nuxt.$loading.start()
      return this.player.setCurrentTime(0).then(() => {
        this.$nuxt.$loading.finish()
        // confirm play state
        this.playing = true
        this.$emit('playing', true)
        // start emitting play/pause state
        this.player.on('play', () => { this.playing = true; this.$emit('playing', this.playing) })
        this.player.on('pause', () => { this.playing = false; this.$emit('playing', this.playing) })
        // unmute
        this.unmute()
        // disable loop
        this.player.setLoop(false)
      })
    },
    playBtnClick (noPause = false) {
      return this.playing && !noPause ? this.pause()
        : this.playing === null ? this.beginFullPlayback()
          : this.play()
    },

    /* Progress */
    async changeProgress (pct) {
      this.$nuxt.$loading.start()
      try {
        await this.player.setCurrentTime(Number(pct) * this.duration)
        this.$nuxt.$loading.finish()
        return true
      } catch (err) {
        // this.$nuxt.$loading.error()
        console.error(err)
      }
    },

    /* Mute / Unmute */
    mute () {
      return this.player.setMuted(true).then((mtd) => {
        this.muted = mtd
        this.$emit('mutechange', mtd)
      })
    },
    unmute () {
      return this.player.setMuted(false).then((mtd) => {
        this.muted = mtd
        this.$emit('mutechange', mtd)
      })
    },
    toggleMute () {
      return this.muted ? this.unmute() : this.mute()
    },

    /* Fullscreen */
    async fullscreen () {
      try {
        await this.player.requestFullscreen()
        // TODO - maybe don't play for iOS since it seems to keep player in bg
        this.playBtnClick(true)
      } catch (e) {
        console.error(e)
      }
    },

    /* Resizing */
    onNewWindowWidth () {
      // if (this.bgSize === 'cover') return
      this.measure()
      this.resizeIframe()
    },
    measure () {
      this.elW = this.$el.offsetWidth
      this.elH = this.$el.offsetHeight
    },
    resizeIframe () {
      this.measure()
      this.iframe = this.iframe || this.$el.querySelector('iframe')
      const iframe = this.iframe
      const size = this.bgSize
      // if (!iframe) { return console.warn('No iframe!') }
      // get aspect ratio
      if (!this.videoW) {
        this.videoW = iframe.getAttribute('width')
        this.videoH = iframe.getAttribute('height')
      }
      // resize (if background)
      if (size) {
        const vidIsWider = this.ratio <= this.elRatio // video wider than frame
        const scaleByHt = (size === 'cover' && vidIsWider) || (size === 'contain' && !vidIsWider)
        // apply
        if (scaleByHt) {
          const w = this.elH * this.videoW / this.videoH
          iframe.setAttribute('height', this.elH)
          iframe.setAttribute('width', Math.ceil(w)) // ceil so not white gaps?
        } else {
          const h = this.elW * this.videoH / this.videoW
          iframe.setAttribute('height', Math.ceil(h)) // ceil so not white gaps?
          iframe.setAttribute('width', this.elW)
        }
      }
      this.invisible = false
    },

    /* Observer for auto play/pause */
    autoPlayPauseViewport () {
      if (!this.observe) { return }
      const observer = new IntersectionObserver((entries) => {
        return entries[0].isIntersecting ? this.play() : this.pause()
      })
      observer.observe(this.$el)
    }
  }
}
</script>

<style lang='sass'>
@import '@/assets/sass/responsive.sass'
.vimeo-player__frame
  padding-bottom: 56.25%
  +sm
    padding-bottom: 100%
    iframe
      transform: scale(calc(16/9))
      
  
  
</style>

<style lang='scss'>
.vimeo-player__frame {
  /* padding-bottom: 56.25%; */
  &.absolute {
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.relative iframe {
    position: absolute;
    top:-1px; left:-1px;
    width:calc(100% + 3px) !important;
    height:calc(100% + 3px) !important; /* extra pixels for safari */
  }
}
</style>
