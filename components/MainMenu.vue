<template lang="pug">
#menu
  template(:class='{ "hide-menu": !artistID }')
    artist-image(:artistUID='artistID', v-if='artistID')
    
  .menu(:class='{ "hide-menu": !showLeft }').left-menu.fixed.w-full.lg-w-7x12.top-0.z-20.lg.lg-pl-10.pl-4.overflow-y-auto.lg-overflow-x-hidden
    .lg-flex.flex-wrap.lg-h-full
      .main-menu.w-1x3.font-bold.text-2xl.lg-text-3xl.uppercase(style='height: calc(100% - 2rem)').pt-14.lg-pt-34.mt-3px
        .menu-item(:class='{ "open": subShow.includes("work") }')
          span(@click='openSub("work")').cursor-pointer Work
        .menu-item(:class='{ "open": subShow.includes("artists") }')
          span(@click='openSub("artists")').cursor-pointer Artists
        .menu-item
          //- a(href='https://shop.morph.film', target='_blank') Shop
          .opacity-20 Shop
        .menu-item(:class='{ "open": subShow.includes("about") }')
          span(@click='openSub("about")').cursor-pointer About
        .menu-item(:class='{ "open": subShow.includes("contact") }')
          span(@click='openSub("contact")').cursor-pointer Contact
        
      .sub-menus.w-full.lg-w-2x3.lg-text-xl.lg-overflow-y-auto.overflow-y-hidden.overflow-x-hidden.lg-pt-35.lg-pb-20.pt-6.lg-pl-0.pr-5.lg-pr-0
        
          .sub-menu(ref='work', :class='{ "hide-sub z-40": !subShow.includes("work") }')
          
            .sub-inner.mb-6
              .item(v-for='(m,i) in menu.work_artistic', v-if='m.title.length && m.title[0].text', :data-n='i+1')
                nuxt-link(:to='m.link.url') {{ m.title[0].text }}
            .sub-inner
              .item(v-for='(m,i) in menu.work_commercial', v-if='m.title.length && m.title[0].text', :data-n='i + 1 + menu.work_artistic.length')
                nuxt-link(:to='m.link.url') {{ m.title[0].text }}
                
          .sub-menu(ref='artists', :class='{ "hide-sub  z-40": !subShow.includes("artists") }').lg-pr-20
            
            .item(v-for='(m,i) in menu.artists', v-if='m.name.length && m.name[0].text', :data-n='i + 1')
              span(@click='toggleArtist(m)', :class='{ underline: (m.name[0].text === artistShow) }').cursor-pointer {{ m.name[0].text }}
            .item
              artist(:artistUID='artistID')
            
          .sub-menu(ref='about', :class='{ "hide-sub  z-40": !subShow.includes("about") }').lg-pr-20
            .item
              page(uid='about')
            
          .sub-menu(ref='contact', :class='{ "hide-sub  z-40": !subShow.includes("contact") }').lg-pr-20
            .item
              page(uid='contact')
              
              transition(name='fade')
                div(v-if='subShow.includes("contact")')
                  newsletter2
      
      footer-menu(:showCredit='subShow.includes("contact")', :section='subShow[0]')
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
      this.$ga.event('navigation', 'open', 'submenu', sel)
      console.log('GA > open submenu > ' + sel)
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
        this.$ga.event('navigation', 'open', 'artist', sel.name[0].text)
        console.log('GA > open artist > ' + sel.name[0].text)
      }
    }
  },
}
</script>

<style lang="sass">
@import '@/assets/sass/responsive.sass'

// +sm
//   .h-full
//     height: 100vh !important
//     height: calc(var(--vh, 1vh) * 100) !important
  
.menu
  backdrop-filter: blur(6px)
  background: #FFFFFFCC
  box-shadow: 0 0 25px 0px #00000022
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

.menu, .hide-menu
  transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
.menu-item, .menu-item.open  
  transition: transform 150ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
  
.left-menu.hide-menu
  transform: translateX(-110%)
.right-menu.hide-menu
  transform: translateX(110%)

// .right-menu
//   border-left: 3px black solid
// .left-menu
//   border-right: 3px black solid
  
.menu-item.open
  -webkit-text-stroke: 0.9px black
  -webkit-text-fill-color: transparent

.sub-menus
  +lg
    height: 100vh
    
.sub-menu .item, .hide-sub .item
  transition: all 250ms cubic-bezier(0.445, 0.05, 0.55, 0.95)
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

.credit
  a
    text-decoration: underline
  
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
@media only screen and (min-width: 1024px) {
  .fade-enter-active, .fade-leave-active { 
    /* transition-delay: 1s; */
    transition: transform 600ms, opacity 600ms; 
    transform: translateY(0vh);
  }
  .fade-enter, .fade-leave-active { 
    opacity: 0; 
    transform: translateY(100vh);
    transition-delay: 1s;
  }
}
</style>