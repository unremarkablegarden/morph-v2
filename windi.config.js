/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/

module.exports = {
  separator: '-',
  variants: {},
  theme: {
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1x2': '50%',
      '1x3': 'calc(100% * 1/3)', // 33.333333%',
      '2x3': 'calc(100% * 2/3)', // 66.666667%',
      '1x4': '25%',
      '2x4': '50%',
      '3x4': '75%',
      '1x5': '20%',
      '2x5': '40%',
      '3x5': '60%',
      '4x5': '80%',
      '1x6': 'calc(100% * 1/6)', // 16.666667%',
      '2x6': 'calc(100% * 2/6)', // 33.333333%',
      '3x6': '50%',
      '4x6': 'calc(100% * 4/6)', // 66.666667%',
      '5x6': 'calc(100% * 5/6)', // 83.333333%',
      '1x12': 'calc(100% * 1/12)', // 8.333333%',
      '2x12': 'calc(100% * 2/12)', // 16.666667%',
      '3x12': '25%',
      '4x12': 'calc(100% * 4/12)', // 33.333333%',
      '5x12': 'calc(100% * 5/12)', // 41.666667%',
      '6x12': '50%',
      '7x12': 'calc(100% * 7/12)', // 58.333333%',
      '8x12': 'calc(100% * 8/12)', // 66.666667%',
      '9x12': '75%',
      '10x12': 'calc(100% * 10/12)', // 83.333333%',
      '11x12': 'calc(100% * 11/12)', // 91.666667%',
      full: '100%',
      screen: '100vw',
      'grid_20': 'calc(100% + 4rem)',
    }),
    // purge: {
    //   // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    //   enabled: process.env.NODE_ENV === 'production',
    //   content: [
    //     'components/**/*.vue',
    //     'slices/**/*.vue',
    //     'layouts/**/*.vue',
    //     'pages/**/*.vue',
    //     'plugins/**/*.js',
    //     'nuxt.config.js'
    //   ],
    //   options: {
    //     whitelistPatterns: [
    //       // pug classes
    //       // https://github.com/tailwindlabs/tailwindcss/pull/1639#issuecomment-623703605
    //       /^.[^\.]*\.[^\. "']*/,
    //       // vue transition classes
    //       /-enter-active$/,
    //       /-leave-active$/,
    //       /-enter$/,
    //       /-leave-to$/,
    //       // content-dynamic classes
    //       /col-span-/,
    //       /col-start-/,
    //       /x12$/, // dynamic widths (w-5x12, md-w-6x12)
    //       /text-white/,
    //       /bg-transparent/,
    //     ]
    //   }
    // }
  }
}