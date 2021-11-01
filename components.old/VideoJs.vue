<template>
  <div>
    <video ref="videoPlayer" class="video-js  vjs-theme-fantasy"></video>
  </div>
</template>


<script>
import videojs from 'video.js'
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm';

export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null,
      options: {
        autoplay: false,
        techOrder: ['html5'],
        controls: true,
        preload: 'auto',
        playbackRates: [0.5, 1, 1.5, 2],
        suppressNotSupportedErro: true,
        responsive: true,
        aspectRatio: '16:9',
        fluid: true,
        sources: [
          {
            src: this.src,
            type: 'video/vimeo'
          }
        ]
      }
    }
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this)
      }
    )
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
<style scoped>
.vjs-default-skin.vjs-big-play-button {
  background: #00ff00;
}
</style>

<style>
@import 'video.js/dist/video-js.css';
@import '@videojs/themes/dist/fantasy/index.css';
</style>
