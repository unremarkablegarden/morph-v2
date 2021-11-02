<template lang="pug">
.footer-menu.flex.uppercase.bottom-0.fixed.z-100.pt-4.pb-3.lg-pb-5.text-xs.lg-text-sm.justify-between(:class='section')
  .flex
    .item.mr-4
      a(href='https://www.instagram.com/morphfilm/', target='_blank') Instagram
    .item.mr-4
      a(href='https://vimeo.com/morphfilm', target='_blank') Vimeo
  .item.text-warm-gray-500.credit.text-xs.lg-pt-3px(v-if='showCredit')
    span Web dev 
    a(href='https://unremarkablegarden.com', target='_blank') Olle Holmberg
</template>

<script>
export default {
  name: 'footer-menu',
  props: ['showCredit', 'section']
}
</script>

<style lang='sass' scoped>
@import '@/assets/sass/responsive.sass'
+sm
  .work, .artists, .about, .contact
    display: none
.footer-menu
  width: calc(100% - 2rem)
  +lg
    width: calc(100% - 5.5rem)
.credit a
  text-decoration: none
  border-bottom: 1px #ccc solid
</style>