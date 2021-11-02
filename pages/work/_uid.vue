<template lang='pug'>
#work(v-if='doc').mx-10
  .my-0.mx-auto.lg-flex
  
    .title.w-full.lg-w-auto.pb-6.pr-8.text-base.pt-34.mt-1px
      h1.uppercase.leading-tight.mr-4.text-3xl.font-bold(v-if='doc.title && doc.title.length')
        | {{ doc.title[0].text }}
      
      gallery(:gallery='doc.gallery')
  
    .text.w-full.lg-w-5x12.pb-6.pr-14.text-justify.text-base.pt-35.overflow-y-auto
      .pb-6.max-w-96
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
        
    .video.pt-35.w-full(v-if='doc.vimeo_embed.video_id')
      .inner.border-3.border-black.mt-2
        plyr(:embed='doc.vimeo_embed')
        //- vime4(:embed='doc.vimeo_embed')
        //- vime5(:embed='doc.vimeo_embed')
        //- vime5(:embed='doc.vimeo_embed')
        //- video-js(:src='doc.vimeo_embed.embed_url')
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
#work 
  .text
    height: 100vh
</style>

<style lang='sass'>
#work p
  margin-bottom: 1em
</style>