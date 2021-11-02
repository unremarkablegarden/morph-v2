<template lang="pug">
#artist.text-justify.text-base.mt-16.max-w-96
  transition(name='artist')
    prismic-rich-text(:field='artist.text', v-if='artist && artist.text')
    div(v-else-if='!artist && !text && !loading')
      p Morph formally represents a selection of visual artists from its community, with dedicated agents handling inquiries and other management tasks on their behalf. 
      p Our goal is to develop these artists’ individual and collective practices — in collaboration with both external partners, and our own studio & community.
</template>

<script>
export default {
  name: 'artist',
  props: ['artistUID'],
  data () {
    return {
      artist: false,
      text: false,
      loading: false,
    }
  },
  watch: {
    artistUID () {
      this.artist = false
      this.text = false
      this.loading = true
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
        this.loading = false
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

<style>
.artist-enter-active, .artist-leave-active { 
  /* transition-delay: 1s; */
  transition: all 300ms; 
  opacity: 1;
}
.artist-enter, .artist-leave-active { 
  opacity: 0; 
}
</style>