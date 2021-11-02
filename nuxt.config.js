export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // dev: true,
  
  // generate: {
  //   devtools: true
  // },
  
  // vue: {
  //   config: {
  //     devtools: true
  //   }
  // },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend(config, { isClient }) {
    //   // Extend only webpack config for client-bundle
    //   if (isClient) {
    //     config.devtool = 'source-map'
    //   }
    // }
    // transpile: ["@vime/vue", "@vime/core"]
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Morph',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/global.sass',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/lazysizes.js' },
    { src: '~/plugins/thumb.js' },
    { src: '@/plugins/vue-plyr.js', mode: 'client' },
    { src: '@/plugins/vue-keen-slider.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 'nuxt-vite',
    'nuxt-windicss',
    // '@nuxtjs/tailwindcss'
    '@nuxtjs/prismic'
  ],
  
  // windicss: {
  //   analyze: {
  //     analysis: {
  //       interpretUtilities: false,
  //     },
  //     // see https://github.com/unjs/listhen#options
  //     server: {
  //       port: 4444,
  //       open: true,
  //     }
  //   }
  // },
  
  prismic: {
    endpoint: 'https://morph.cdn.prismic.io/api/v2',
    modern: true,
    preview: false,
    apiOptions: {
      // example resolving documents with type `page` to `/:uid`
      routes: [
        {
          type: 'landing',
          path: '/'
        },
        {
          type: 'work',
          path: '/work/:uid'
        },
        {
          type: 'page',
          path: '/:uid'
        }, 
      ]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],
  
  server: {
    host: '0' // default: localhost
  },

}
