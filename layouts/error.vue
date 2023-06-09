<template lang="pug">
#page.error
  .inner.w-full.h-full.flex.justify-center.items-center
    .text-center
      p.text-gray-600
        p(v-if='error.statusCode === 404') Page not found
        p(v-else) An error occurred
      .text-gray-600.flex.justify-center.items-center
        div
          .text-xl.-mb-1.mr-1 &larr; 
        div
          nuxt-link(to="/")
            | Index
</template>

<script>
export default {
  props: ['error'],
  head: {
    title: 'Page not found'
  },
  mounted () {
    console.log(this.error);
  }
}
</script>

<style lang="sass" scoped>
.h-full
  height: 90vh
</style>