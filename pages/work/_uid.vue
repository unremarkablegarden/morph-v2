<template lang='pug'>
#work(v-if='doc').mx-10
  .my-0.mx-auto.lg-flex
  
    .title.w-full.lg-w-auto.pb-6.pr-8.text-base.pt-34.mt-1px
      h1.uppercase.leading-tight.mr-4.text-3xl.font-bold(v-if='doc.title && doc.title.length') {{ doc.title[0].text }}
      
      content-menu(:data='doc')
  
    .text.w-full.lg-w-5x12.pb-6.pr-14.text-justify.text-base.pt-35.overflow-y-auto.hyphens-auto
      .pb-6.max-w-96
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
    
    .tabs.pt-37.w-full
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
#work 
  .text
    height: 100vh
    
.tabb
  height: 0
  
</style>

<style lang='sass'>
#work p
  margin-bottom: 1em
</style>

<style>
.tabs-enter-active, .tabs-leave-active { 
  transition: opacity 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95), transform 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95); 
  opacity: 1;
}
.tabs-enter, .tabs-leave-active { 
  transition: opacity 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95), transform 333ms cubic-bezier(0.445, 0.05, 0.55, 0.95); 
  transform: translateX(100vw);
  opacity: 0; 
}
</style>