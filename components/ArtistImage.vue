<template lang="pug">
.menu(:class='{ "hide-menu": !show }').right-menu.fixed.w-5x12.h-full.top-0.right-0.z-20
  #artist-image(:style='"background-image: url("+ image +");"', v-if='image').w-full.h-full
</template>

<script>
export default {
  name: 'artistimage',
  props: ['artistUID'],
  data () {
    return {
      artist: false,
      image: false,
      show: false
    }
  },
  watch: {
    artistUID () {
      this.closeIt()
      this.getArtist(this.artistUID)
    },
    image () {
      if (this.image) {
        setTimeout(() => {
          this.show = true
        }, 500)
      }
    }
  },
  mounted () {
    if (this.artistUID) this.getArtist(this.artistUID)
    
    this.$nuxt.$on('menu-open', (val) => {
      if (val === false) this.closeIt()
    })
  },
  methods: {
    closeIt () {
      this.show = false
      setTimeout(() => {
        this.artist = false
        this.image = false
      }, 300)
    },
    async getArtist (UID) {
      if (UID) {
        const artist = await this.$prismic.api.getByID(UID)
        if (artist && artist.data) {
          this.artist = artist.data
          if (artist.data.image && artist.data.image.url) {
            this.image = artist.data.image.url
          }
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#artist-image
  background-size: cover
  background-position: center
</style>