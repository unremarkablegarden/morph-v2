<template lang="pug">
#content-menu.inline-block.leading-none.text-xs.lg-text-sm(v-if='enabled')
  .item(v-if='menu1', :class='{ selected: tab == 1 }', @click='tab = 1')
    .title
      span(v-if='data.video_title_1') {{ data.video_title_1 }}
      span(v-else) {{ data.vimeo_embed.title }}
  .item(v-if='menu2', :class='{ selected: tab == 2 }', @click='tab = 2')
    .title 
      span(v-if='data.video_title_2') {{ data.video_title_2 }}
      span(v-else) {{ data.vimeo_embed2.title }}
    
  .item(v-if='menu3', :class='{ selected: tab == 3 }', @click='tab = 3')
    .title 
      span(v-if='data.gallery_title') {{ data.gallery_title }}
      span(v-else) Image gallery
</template>

<script>
export default {
  props: ['data'],
  data () {
    return { 
      tab: 1
    }
  },
  watch: {
    tab () {
      this.$nuxt.$emit('tab-change', this.tab)
    }
  },
  computed: {
    menu1 () {
      if (this.data.vimeo_embed && this.data.vimeo_embed.video_id) {
        return true
      }
    },
    menu2 () {
      if (this.data.vimeo_embed2 && this.data.vimeo_embed2.video_id) {
        return true
      }
    },
    menu3 () {
      if (this.data.gallery && this.data.gallery.length > 1) {
        return true
      }
    },
    enabled () {
      if (this.data.vimeo_embed2 && this.data.vimeo_embed2.video_id) {
        return true
      } else if (this.data.gallery && this.data.gallery.length > 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#content-menu
  border: 1px black solid
  // border-radius: 4px
  .item
    padding: 0.5rem
    border-bottom: 1px black solid
    cursor: pointer
    line-height: 1.1em
    &.selected
      background: black
      color: white
    &:last-of-type
      border-bottom: 0
    
</style>