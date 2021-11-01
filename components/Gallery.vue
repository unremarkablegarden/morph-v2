<template lang="pug">
#gallery(v-if='gallery && gallery.length && gallery[0].image && gallery[0].image.url')
  h1 gallery
  xmp {{ gallery }}
</template>

<script>
export default {
  name: 'gallery',
  props: ['gallery']
}
</script>

<style lang="sass">

</style>