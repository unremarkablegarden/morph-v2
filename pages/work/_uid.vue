<template lang='pug'>
#work(v-if='doc').mx-10
  //- .container
  .my-10.mx-auto.lg-flex.flex-wrap
  
    .title.w-full.lg-w-2x12.mb-6
      prismic-rich-text(:field='doc.title').uppercase.leading-tight.mr-4
    
    .text.w-full.lg-w-3x12.mb-6
      prismic-rich-text(:field='doc.text', v-if='doc.text.length')
      
    .spacer.lg-w-1x12.hidden.lg-block
    
    .video.w-full.w-full.lg-w-6x12(v-if='doc.vimeo_embed.video_id')
      .inner.border-3.border-black
        vime(:embed='doc.vimeo_embed')
</template>


<script>
export default {
  name: 'work',
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID('work', params.uid)
    if (document && document.data) {
      const doc = document.data
      return { doc }
    } else {
      error({ statusCode: 404 })
    }
    return false
  }
}
</script>

<style lang="sass" scoped>
.video
  .inner
    // height: calc(100vw / 16*9)
    // padding-bottom: calc(100% / 16*9)
</style>

<style lang='sass'>
#work p
  margin-bottom: 1em
</style>