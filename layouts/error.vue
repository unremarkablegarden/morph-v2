<template lang="pug">
#page.error
  .inner.w-full.h-full.flex.justify-center.items-center
    .text-center
      p.text-gray-600
        | The page couldn't be found
      .text-gray-600.flex.justify-center.items-center
        div
          .text-xl.-mb-1.mr-1 &larr; 
        div
          nuxt-link(to="/")
            | Index
</template>