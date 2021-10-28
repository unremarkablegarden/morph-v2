<template lang='pug'>
#about.page(v-if='doc')
  .container.mx-auto.my-10.flex
    .w-3x12.hidden.lg-block
    .w-full.lg-w-6x12
      .title(v-if='doc.title.text')
        prismic-rich-text(:field='doc.title').uppercase.leading-tight.text-xs
      
      .text.text-xl.lg-text-2xl
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
    
</template>


<script>
export default {
  name: 'page',
  data () {
    return {
    }
  },
  
  async asyncData({ $prismic, params, error }) {
    // const document = await $prismic.api.getSingle('about')
    const document = await $prismic.api.getByUID('page', params.uid)

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

<style lang="sass">
.page 
  p
    margin-bottom: 1em
  a
    text-decoration: underline
</style>