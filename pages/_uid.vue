<template lang='pug'>
#about.page(v-if='doc')
  .container.mx-auto.my-10.flex.mt-20.lg-mt-35.mx-4.lg-mx-0
    .w-3x12.hidden.lg-block
    .w-full.lg-w-6x12
      .title(v-if='doc.title.text')
        prismic-rich-text(:field='doc.title').uppercase.leading-tight.text-xs
      
      .text.text-base.lg-text-xl
        prismic-rich-text(:field='doc.text', v-if='doc.text.length')
    
</template>


<script>
import get from 'lodash/get'

export default {
  name: 'page',
  
  head () {
    if (!this.doc) { return }
    const title_text = get(this.doc, 'title[0].text')
    const description_text = get(this.doc, 'meta_description[0].text')
    const img_url = get(this.doc, 'meta_image.url')
    
    let meta = [
      { charset: 'utf-8' }
    ]
    
    const description = {
      hid: 'description',
      name: 'description', 
      content: description_text 
    }
    if (description_text && description_text !== 'undefined') meta.push(description)
      
    const image = {
      hid: 'og:image',
      property: 'og:image',
      content: img_url
    }
    if (img_url && img_url !== 'undefined') meta.push(image)
    
    const twitter = [
      // { name: "twitter:site", content: "@bobross" },
      { name: "twitter:card", content: "summary_large_image" },
      // {
      //   hid: "twitter:url",
      //   name: "twitter:url",
      //   content: "https://morph.film/",
      // },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: title_text,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: description_text,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: img_url,
      },
    ]
    meta = [...meta, ...twitter]
    
    return {
      title: 'Morph — ' + title_text,
      meta: meta
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