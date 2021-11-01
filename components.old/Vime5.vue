<template lang="pug">
#vime(v-if='embed && embed.video_id')
  .thumb(v-if='embed.thumbnail_url', :style='{ "background-image": "url(" + embed.thumbnail_url.replace("_640", "_1280") + ");" }')

  //- Player(v-if='embed.video_id && ready', ref='player')
    Vimeo(:videoId='embed.video_id')
    
  //- Player(
  //-   v-if='embed.video_id && ready'
  //-   ref='player'
  //-   :controls='false'
  //-   :cookies='false'
  //-   playsinline
  //- )
  //-   Vimeo(
  //-     :videoId='embed.video_id'
  //-     :byline='false'
  //-     noAutoAspectRatio
  //-     :portrait='false'
  //-     :poster='embed.thumbnail_url.replace("_640", "_1280")' 
  //-   )
  //-   Ui
  //-     IconLibrary
  //-     ClickToPlay
  //-     Controls(fullWidth)
  //-       //- VimeControlGroup
  //-         VimeScrubberControl
  //-       ControlGroup(space='top')
  //-         PlaybackControl(hideTooltip)
  //-         //- VimeControlSpacer
  //-         ScrubberControl
  //-         TimeProgress 
  //-         FullscreenControl(hideTooltip)
    
</template>

<script>
import { Player,Vimeo,Ui,ClickToPlay,Controls,ScrubberControl,TimeProgress,ControlGroup,PlaybackControl,IconLibrary,ControlSpacer,FullscreenControl } from '@vime/vue'

export default {
  name: 'Vime',
  props: ['embed'],
  data () {
    return {
      ready: false  
    }
  },
  components: { Player,Vimeo,Ui,ClickToPlay,Controls,ScrubberControl,TimeProgress,ControlGroup,PlaybackControl,IconLibrary,ControlSpacer,FullscreenControl },
  computed: {
    aspect () {
      return this.embed.width / this.embed.height
    },
    player () {
      return this.$refs.player
    }
  },
  mounted () {
    this.ready = true
  }
}
</script>

<style>
@import '@vime/core/themes/default.css';
@import '@vime/core/themes/light.css';

vime-ui {
  font-family: 'f', sans-serif;
}
vime-icon {
  --vm-icon-scale: 0.9;
}
vime-controls {
  --vm-controls-padding: 8px;
}
vime-control-group {
  --vm-control-group-spacing: 10px;
}
vime-time-progress {
  margin-left: 18px;
  margin-right: 0px;
}
vime-control {
  --vm-control-focus-bg: transparent;
}
vime-time {
  font-size: 0.8rem !important;
}
vime-control button.notTouch:focus, vime-control button.notTouch:hover, vime-control button.notTouch[aria-expanded=true] {
  transform: scale(1);
}

</style>

<style lang="sass" scoped>
.thumb
  padding-bottom: calc(100% / 16*9)
  background-size: cover
  background-position: center center
</style>