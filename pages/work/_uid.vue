<template lang='pug'>
#work(v-if='doc').mx-4.lg-mx-10
  .my-0.mx-auto.flex.flex-col.lg-flex-row
  
    .title.w-full.lg-w-auto.lg-pb-6.lg-pr-8.text-base.lg-pt-34.lg-mt-1px.order-2.lg-order-2
      .flex.lg-flex-col.flex-row.w-full.justify-between
        h1.uppercase.leading-tight.mr-4.lg-mr-4.text-2xl.lg-text-3xl.font-bold(v-if='doc.title && doc.title.length') {{ doc.title[0].text }}
        
        content-menu(:data='doc').lg-mt-8.mt-0.lg-mr-4.lg-min-w-36.min-w-30
  
    .text.w-full.lg-w-6x12.pb-8.lg-pr-14.text-justify.text-sm.lg-text-base.lg-pt-35.pt-4.lg-overflow-y-auto.hyphens-auto.order-3.lg-order-3
      .lg-pb-6.lg-max-w-96
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
    
    .tabs.pt-18.lg-pt-37.w-full.overflow-x-hidden.order-1.lg-order-3.lg-pb-0.pb-4
      transition(name='tabs', :mode="mode")
        .tabb.video(v-if='doc.vimeo_embed.video_id && tab === 1')
          .inner.border-3.border-black
            plyr(
              :vimeoID='doc.vimeo_embed.video_id',
              :ratio='doc.vimeo_embed.width+":"+doc.vimeo_embed.height'
            )
      transition(name='tabs', :mode="mode")
        .tabb.video2(v-if='doc.vimeo_embed2.video_id && tab === 2')
          .inner.border-3.border-black
            plyr(
              :vimeoID='doc.vimeo_embed2.video_id',
              :ratio='doc.vimeo_embed.width+":"+doc.vimeo_embed.height'
            )
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
#work 
  p
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