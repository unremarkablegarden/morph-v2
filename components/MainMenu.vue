<template lang="pug">
#menu
  template(:class='{ "hide-menu": !artistID }')
    artist-image(:artistUID='artistID', v-if='artistID')
    
  .menu(:class='{ "hide-menu": !showLeft }').left-menu.fixed.w-7x12.h-full.top-0.z-20.px-10.pt-38.pb-8
    .flex.flex-wrap.h-full
    
      .main-menu.w-1x3.font-bold.text-3xl.uppercase(style='height: calc(100% - 2rem)')
        .menu-item(:class='{ "open": subShow.includes("work") }')
          span(@click='openSub("work")').cursor-pointer Work
        .menu-item(:class='{ "open": subShow.includes("artists") }')
          span(@click='openSub("artists")').cursor-pointer Artists
        .menu-item
          a(href='https://shop.morph.film', target='_blank') Shop
        .menu-item.cursor-pointer
          nuxt-link(to='/about') About
        .menu-item
          nuxt-link(to='/contact') Contact
        
      .sub-menus.w-2x3.text-xl
        .sub-menu.absolute(ref='work', :class='{ "hide-sub": !subShow.includes("work") }')
          .sub-inner.mb-6
            .item(v-for='(m,i) in menu.work_artistic', v-if='m.title.length && m.title[0].text')
              nuxt-link(:to='m.link.url') {{ m.title[0].text }}
          .sub-inner
            .item(v-for='(m,i) in menu.work_commercial', v-if='m.title.length && m.title[0].text')
              nuxt-link(:to='m.link.url') {{ m.title[0].text }}
              
        .sub-menu.absolute(ref='artists', :class='{ "hide-sub": !subShow.includes("artists") }', style='height: calc(100vh - 14.5rem)').overflow-y-auto.pr-12.mr-2
          
          .item(v-for='(m,i) in menu.artists', v-if='m.name.length && m.name[0].text')
            span(@click='toggleArtist(m)', :class='{ underline: (m.name[0].text === artistShow) }').cursor-pointer {{ m.name[0].text }}
          
          artist(:artistUID='artistID', v-if='artistID')
      
      footer-menu
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
      showLeft: false,
      // showLeft: true,
      // showRight: false,
      // showRight: true,
      menu: false,
      subShow: [],
      artistShow: false,
      artistID: false
    }
  },
  async fetch () {
    const menu = await this.$prismic.api.getSingle('menu')
    if (menu && menu.data) {
      this.menu = menu.data
    }
  },
  watch: {
    '$route' (to, from) {
      this.showLeft = false
      this.showRight = false
    }
  },
  mounted () {
    this.$nuxt.$on('menu-open', (val) => {
      this.showLeft = val
    })
  },
  methods: {
    openSub (sel) {
      if (this.subShow.includes(sel)) this.subShow = []
      else this.subShow = [sel]
      this.artistShow = false
    },
    toggleArtist (sel) {
      if (this.artistShow === sel.name[0].text) {
        this.artistShow = false
        this.artistShow = false
        this.artistID = false
      }
      else {
        this.artistShow = sel.name[0].text
        this.artistID = sel.link.id
      }
    }
  },
}
</script>

<style lang="sass">
.menu
  backdrop-filter: blur(5px)
  background: #FFFFFFCC
  box-shadow: 0 0 25px 0px #00000022

.menu, .hide-menu
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
.menu-item, .menu-item.open  
  transition: all 150ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
  
.left-menu.hide-menu
  transform: translateX(-100%)
.right-menu.hide-menu
  transform: translateX(100%)

.menu-item.open
  transform: translateX(0.4em)
  
.sub-menu, .hide-sub
  transition: all 250ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
  transform-origin: left
.hide-sub
  transform: rotateY(90deg)
  opacity: 0
</style>