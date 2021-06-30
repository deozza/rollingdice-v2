import { NuxtConfig } from '@nuxt/types'


const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rollingdice-v2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        integrity:
          'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap',
      },
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/global.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',
      {
        manifest: {
          lang: 'fr'
        }
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          {code: 'en', file: 'en.json'},
          {code: 'fr', file: 'fr.json'},
        ],
        langDir: '~/i18n/languages/',
        defaultLocale: 'fr',
        vueI18n: {
          fallbackLocale: 'fr',
        }
      }
    ]
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}

export default config
