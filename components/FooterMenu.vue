<template lang="pug">
.footer-menu.flex.uppercase.bottom-0.fixed.z-100.pt-4.pb-5.text-sm.justify-between
  .flex
    .item.mr-4
      a(href='https://www.instagram.com/morphfilm/', target='_blank') Instagram
    //- .item.mr-4
      a(href='https://www.facebook.com/morphfilm', target='_blank') Facebook
    .item.mr-4
      a(href='https://vimeo.com/morphfilm', target='_blank') Vimeo
    //- .item.mr-4
      a(href='https://www.youtube.com/channel/UCaxVfV6mG1w2Hjr2YpDeK8g', target='_blank') Youtube
  .item.text-warm-gray-500.credit.text-xs.pt-3px(v-if='showCredit')
    span Web dev 
    a(href='https://unremarkablegarden.com', target='_blank') Olle Holmberg
</template>

<script>
export default {
  name: 'footer-menu',
  props: ['showCredit']
}
</script>

<style lang='sass' scoped>
.footer-menu
  width: calc(100% - 5.5rem)
.credit a
  text-decoration: none
  border-bottom: 1px #ccc solid
</style>