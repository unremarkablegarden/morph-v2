<template lang="pug">
#page.shop
  .inner.w-full.h-full.flex.justify-center.items-center
    .text-center
      //- h1.text-4xl.text-gray-700
        | Shop
      p.text-gray-600
        | The shop is currently closed
      .text-gray-600.flex.justify-center.items-center
        div
          .text-xl.-mb-1.mr-1 &larr; 
        div
          nuxt-link(to="/")
            | Index
</template>

<style lang="sass" scoped>
.h-full
  height: 90vh
</style>