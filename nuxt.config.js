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
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    //'@nuxtjs/bulma',
    '@nuxtjs/font-awesome',
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
  /*
  ** You can extend webpack config here
  */
  extend(config, ctx) {

  },
}

