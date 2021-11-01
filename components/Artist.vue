<template lang="pug">
#artist.text-justify.text-base.mt-16
  prismic-rich-text(:field='artist.text', v-if='artist && artist.text')
</template>

<script>
export default {
  name: 'artist',
  props: ['artistUID'],
  data () {
    return {
      artist: false,
      text: false,
    }
  },
  watch: {
    artistUID () {
      this.getArtist(this.artistUID)
    }
  },
  mounted () {
    if (this.artistUID) this.getArtist(this.artistUID)
  },
  methods: {
    async getArtist (UID) {
      if (UID) {
        const artist = await this.$prismic.api.getByID(UID)
        if (artist && artist.data) {
          this.artist = artist.data
        }
      }
    }
  }
}
</script>

<style lang="sass">
#artist 
  p
    margin-bottom: 1em !important
  a
    text-decoration: underline
</style>