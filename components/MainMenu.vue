<template lang="pug">
#menu
  template(:class='{ "hide-menu": !artistID }')
    artist-image(:artistUID='artistID', v-if='artistID')
    
  .menu(:class='{ "hide-menu": !showLeft }').left-menu.fixed.w-7x12.h-full.top-0.z-20.pl-10
    //- .pt-35.pb-8
    //- xmp {{ artistShow }}
    //- xmp {{ artistID }}
    .flex.flex-wrap.h-full
      .main-menu.w-1x3.font-bold.text-3xl.uppercase(style='height: calc(100% - 2rem)').pt-34.mt-3px
        .menu-item(:class='{ "open": subShow.includes("work") }')
          span(@click='openSub("work")').cursor-pointer Work
        .menu-item(:class='{ "open": subShow.includes("artists") }')
          span(@click='openSub("artists")').cursor-pointer Artists
        .menu-item
          a(href='https://shop.morph.film', target='_blank') Shop
        .menu-item(:class='{ "open": subShow.includes("about") }')
          span(@click='openSub("about")').cursor-pointer About
        .menu-item(:class='{ "open": subShow.includes("contact") }')
          span(@click='openSub("contact")').cursor-pointer Contact
        
      .sub-menus.w-2x3.text-xl.overflow-y-auto.overflow-x-hidden.pt-35.pb-20
        
          .sub-menu(ref='work', :class='{ "hide-sub z-40": !subShow.includes("work") }')
          
            .sub-inner.mb-6
              .item(v-for='(m,i) in menu.work_artistic', v-if='m.title.length && m.title[0].text', :data-n='i+1')
                nuxt-link(:to='m.link.url') {{ m.title[0].text }}
            .sub-inner
              .item(v-for='(m,i) in menu.work_commercial', v-if='m.title.length && m.title[0].text', :data-n='i + 1 + menu.work_artistic.length')
                nuxt-link(:to='m.link.url') {{ m.title[0].text }}
                
          .sub-menu(ref='artists', :class='{ "hide-sub  z-40": !subShow.includes("artists") }').pr-20
            
            .item(v-for='(m,i) in menu.artists', v-if='m.name.length && m.name[0].text', :data-n='i + 1')
              span(@click='toggleArtist(m)', :class='{ underline: (m.name[0].text === artistShow) }').cursor-pointer {{ m.name[0].text }}
            
            artist(:artistUID='artistID', v-if='artistID')
            
          .sub-menu(ref='about', :class='{ "hide-sub  z-40": !subShow.includes("about") }').pr-20
            .item
              page(uid='about')
            
          .sub-menu(ref='contact', :class='{ "hide-sub  z-40": !subShow.includes("contact") }').pr-20
            .item
              page(uid='contact')
      
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
      this.artistID = false
    },
    toggleArtist (sel) {
      if (this.artistShow === sel.name[0].text) {
        this.artistShow = false
        this.artistShow = false
        this.artistID = false
      }
      else {
        this.artistShow = sel.name[0].text
        // this.artistID = false
        // setTimeout(() => {
          this.artistID = sel.link.id
        // }, 10)
      }
    }
  },
}
</script>

<style lang="sass">
.menu
  backdrop-filter: blur(6px)
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
  // transform: translateX(0.4em)
  -webkit-text-stroke: 0.9px black
  -webkit-text-fill-color: transparent

.sub-menus
  // height: calc(100vh - 4.5rem)
  height: 100vh
    
.sub-menu .item, .hide-sub .item
  transition: all 250ms cubic-bezier(0.445, 0.05, 0.55, 0.95)
  // transform-origin: left
  // -webkit-transform-style: preserve-3d
  // transform: translate3d(0,0,0)
  // transition-delay: 1000ms
  will-change: transform opacity
  position: relative
  z-index: 100
.hide-sub 
  // display: none
  height: 0
  overflow-y: hidden
  .item
    // transform: rotateY(90deg)
    transform: translateX(100%)
    // transform: translateX(1rem)
    opacity: 0
    z-index: 0
    * 
      cursor: default !important
  

#menu *
  -webkit-backface-visibility: hidden
</style>

<style lang="scss" scoped>
@for $i from 1 through 30 {
  /* [data-id="b5c3cde7-8aa1"]  { */
  .item[data-n="#{$i}"] {
    transition-delay: calc($i * 40ms);
  }
}
</style>