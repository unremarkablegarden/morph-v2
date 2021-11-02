<template lang='pug'>
#page(v-if='page').text-justify.text-base.max-w-96
  //- prismic-rich-text(:field='page.title', v-if='page.title && page.title.length')
  prismic-rich-text(:field='page.text')
</template>

<script>
export default {
  name: 'Page',
  props: ['uid'],
  async fetch () {
    if (this.uid) {
      const page = await this.$prismic.api.getByUID('page', this.uid)
      this.page = page.data
    }
  },
  data () {
    return {
      page: false
    }
  }
}
</script>

<style lang="sass">
#page
  p
    margin-bottom: 1em
  a
    text-decoration: underline
</style>