<template lang='pug'>
#about.page(v-if='doc')
  .container.mx-auto.my-10.flex
    div(class='w-3/12')
    div(class='w-6/12')
    
      .title(v-if='doc.title.text')
        prismic-rich-text(:field='doc.title').uppercase.leading-tight.text-xs
      
      .text.text-2xl
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
    
</template>


<script>
export default {
  name: 'work',
  data () {
    return {
    }
  },
  
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getSingle('about')

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
.page p
  margin-bottom: 1em
</style>