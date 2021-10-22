<template lang='pug'>
#work
  h1 work!
</template>


<script>
export default {
  name: 'work',
  data () {
    return {
    }
  },
  
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getSingle('landing')
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
