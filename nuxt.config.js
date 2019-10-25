// const pkg = require('package')
const bodyParser = require('body-parser')

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'WD blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cool web development blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fa923f', height: '4px', duration: '5000' },
  loadingIndicator: { name: 'circle', color: '#fa923f' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios"
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://vuejs-on-steroids.firebaseio.com',
    fbAPIKey: 'AIzaSyDH01EXFzltryqwf5p_guIuQFaSIvNJXbg'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
