<template lang='pug'>
#work(v-if='doc').mx-4.lg-mx-10
  .my-0.mx-auto.lg-flex
  
    .title.w-full.lg-w-auto.lg-pb-6.lg-pr-8.text-base.lg-pt-34.lg-mt-1px.pt-20
      h1.uppercase.leading-tight.lg-mr-4.text-2xl.lg-text-3xl.font-bold(v-if='doc.title && doc.title.length') {{ doc.title[0].text }}
      
      .hidden.lg-block 
        content-menu(:data='doc')
  
    .text.w-full.lg-w-5x12.pb-6.lg-pr-14.text-justify.text-sm.lg-text-base.lg-pt-35.pt-4.overflow-y-auto.hyphens-auto
      .lg-pb-6.lg-max-w-96
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
        
        .block.lg-hidden
          content-menu(:data='doc')
    
    .tabs.lg-pt-37.w-full.min-h-52.lg-min-h-0.overflow-x-hidden
      transition(name='tabs', :mode="mode")
        .tabb.video(v-if='doc.vimeo_embed.video_id && tab === 1')
          .inner.border-3.border-black
            plyr(:vimeoID='doc.vimeo_embed.video_id')
      transition(name='tabs', :mode="mode")
        .tabb.video2(v-if='doc.vimeo_embed2.video_id && tab === 2')
          .inner
            plyr(:vimeoID='doc.vimeo_embed2.video_id')
      transition(name='tabs', :mode="mode")
        .tabb.gallery(v-if='doc.gallery && doc.gallery.length > 1 && tab === 3')
          .inner
            gallery(:gallery='doc.gallery')
            
    .block.lg-hidden.pb-10
    
</template>


<script>
export default {
  name: 'work',
  head () {
    return {
      title: "Morph — " + this.title,
      // meta: [
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'My custom description'
      //   }
      // ]
    }
  },
  data () {
    return {
      tab: 1,
      mode: 'out-in',
    }
  },
  computed: {
    title () {
      if (this.doc && this.doc.title && this.doc.title.length) {
        return this.doc.title[0].text
      }
    }
  },
  mounted () {
    this.$nuxt.$on('tab-change', (tab) => {
      this.tab = tab
    })
  },
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
@import '@/assets/sass/responsive.sass'

#work 
  .text
    +lg
      height: 100vh
    
.tabb
  +lg
    height: 0
  
</style>

<style lang='sass'>
#work p
  margin-bottom: 1em
</style>

<style>
@media only screen and (min-width: 1024px) {
  .tabs-enter-active, .tabs-leave-active { 
    transition: opacity 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95), transform 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95); 
    opacity: 1;
  }
  .tabs-enter, .tabs-leave-active { 
    transition: opacity 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95), transform 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95); 
    transform: translateX(100vw);
    opacity: 0; 
  }
}
</style>