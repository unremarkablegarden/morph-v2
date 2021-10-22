<template lang='pug'>
#work(v-if='doc')
  .container.mx-auto.my-10.flex
    
    .title(class='w-3/12').pr-10
      prismic-rich-text(:field='doc.title').uppercase.leading-tight.text-xs
    
    .text(class='w-3/12')
      prismic-rich-text(:field='doc.text', v-if='doc.text.length')
      div(v-else) No text yet...
    
    .video(class='w-6/12').border-3.border-black
      .inner
        player(v-if='doc.vimeo_url', :data='doc', type='controls')
      
</template>


<script>
export default {
  name: 'work',
  data () {
    return {
    }
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
.video
  .inner
    // height: calc(100vw / 16*9)
    padding-bottom: 56.25%
    width: 100%
</style>