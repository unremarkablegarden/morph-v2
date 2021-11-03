<template lang="pug">
.vimeo-thumb
    vimeo-player(
      v-bind="$attrs", 
      :vimeoURL="embed.embed_url", 
      :clickable="false", 
      :backgroundMode="true", 
      :loop="true",
      :index="index",
    )
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
