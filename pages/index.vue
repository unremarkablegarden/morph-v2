<template lang="pug">
#index
  .invert
    logo(:hide='false', :fixed='true')
  .wrapper.flex.justify-center.items-center.text-3xl
    span Our new site is launching later today!
</template>

<script>
export default {
  layout: "disabled"
}
</script>

<style lang="sass">
.wrapper
  width: 100vw
  height: 92vh
.invert
  filter: invert(100)
</style>