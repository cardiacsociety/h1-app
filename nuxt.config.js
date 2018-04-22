const pkg = require('./package')

module.exports = {

  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},

  /*
  ** Global CSS
  */
  css: [
    {src: '~assets/styles/custom.scss', lang: 'sass'},
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/global-components',
    '~plugins/number-filters',
    '~plugins/date-filters',
    '~plugins/instantsearch',
    '~plugins/vee-validate',

    // can only get customisations to work by using script tag in default layout
    // example: https://github.com/rafaelpimpa/buefy-simple/blob/master/src/App.vue
    // won't load customisations from custom.scss
    //'~plugins/buefy',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],

  router: {
    linkActiveClass: "is-active",
    linkExactActiveClass: "is-active",
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  // */
  build: {
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    }
  },

  env: {
    REST_API_BASE_URL: process.env.REST_API_BASE_URL || "http://localhost:5000/v1",
    GRAPHQL_API_BASE_URL: process.env.GRAPHQL_API_BASE_URL || "http://localhost:5001/graphql",
    ALGOLIA_APP_ID: "MZQPVRPXFY",
    ALGOLIA_API_KEY: "b2870abe304ad95866629a6713fd6e91",
    ALGOLIA_DIRECTORY_INDEX: process.env.ALGOLIA_DIRECTORY_INDEX || "mappcpd_demo_DIRECTORY",
    ALGOLIA_RESOURCES_INDEX: process.env.ALGOLIA_RESOURCES_INDEX || "mappcpd_demo_RESOURCES",
    INVALID_EMAIL_STRINGS: process.env.INVALID_EMAIL_STRINGS || "noemailaddress,member.csanz.edu.au",
  },

  /*
  ** You can extend webpack config here
  */
  extend(config, ctx) {

  },
}

