<template lang="pug">
.vimeo-thumb
    //- $attrs passes down `clip` and `visible`
    vimeo-player(
      v-bind="$attrs", 
      :vimeoURL="embed.embed_url", 
      :clickable="false", 
      :backgroundMode="true", 
      :loop="true",
      :index="index"
    )
    //- props: {
    //-   vimeoURL: { type: String, default: undefined },
    //-   bgSize: { type: String, default: undefined },
    //-   clip: { type: Array, default: () => [] },
    //-   controls: { type: Boolean, default: false },
    //-   visible: { type: Boolean, default: true },
    //-   playBtn: { type: Boolean, default: false },
    //-   loop: { type: Boolean, default: true },
    //-   poster: { type: Object, default: undefined },
    //-   clickable: { type: Boolean, default: false },
    //-   observe: { type: Boolean, default: false },
    //-   backgroundMode: { type: Boolean, default: true }
    //-   // autoplay: { type: Boolean, default: true }
    //- },
</template>

<script>
export default {
  name: 'VimeoThumb',
  props: {
    // vimeoURL: { type: String, default: undefined }
    embed: { type: Object, default: undefined },
    index: { type: Number, default: 99999 }
  },
  computed: {
    externalVimeo () {
      // disable lightbox for non-MA vimeos (...?external=true)
      return this.vimeoURL?.includes('external=true') // eslint-disable-line camelcase
    }
  }
}
</script>
