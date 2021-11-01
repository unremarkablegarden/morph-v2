<template lang="pug">
#vime
  .inner
    //- .thumb(v-if='embed.thumbnail_url', :style='{ "background-image": "url(" + embed.thumbnail_url.replace("_640", "_1280") + ");" }')
    Player(
      ref='player'
      :controls='true'
      :cookies='false'  
      :poster='embed.thumbnail_url.replace("_640", "_1280")' 
      playsinline
    )
      Vimeo(
        :videoId='embed.video_id'
        :byline='false'
      )
      DefaultUi
  //- xmp {{ embed }}  
</template>

<script>
import { Player, Vimeo, DefaultUi } from '@vime/vue'

export default {
  name: 'Vime',
  props: ['embed'],
  components: { Player, Vimeo, DefaultUi },
  computed: {
    aspect () {
      return this.embed.width / this.embed.height
    },
    player () {
      return this.$refs.player
    }
  }
}
</script>

<style>
@import '@vime/core/themes/default.css';
@import '@vime/core/themes/light.css';
</style>

<style lang="sass" scoped>
.thumb
  padding-bottom: calc(100% / 16*9)
  background-size: cover
  background-position: center center
</style>