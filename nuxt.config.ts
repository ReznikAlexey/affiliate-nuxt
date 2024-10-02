import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  app: {
    head: {
      title: "Nomad Club",
      link: [{
        rel: "icon", type: "image/png", href: "/favicon.ico"
      }]
    }
  },
  ssr: true,
  nitro: {
    // devProxy: {
    //   "/v2/**": {
    //     target: "http://api.gravty.me/v2/",
    //     prependPath: true,
    //     changeOrigin: true,
    //   },
    // },
    prerender: {
      failOnError: false,
    }
  },
  // routeRules: {
  //   '/v2/**': {
  //     proxy: { to: "http://api.gravty.me/v2/**" },
  //   },
  //   '/v1/**': {
  //     proxy: { to: "http://api.gravty.me/v1/**" },
  //   }
  // },
  build: {
    transpile: [/vue-i18n/]
  },
  modules: [['@pinia/nuxt', { autoImports: ['defineStore'] }], 'nuxt-swiper', '@nuxtjs/device', '@nuxt/ui'],
  plugins: ['@/plugins/firebase.client.js'],
  css: [
    '@/assets/styles/styles.scss',
    "@/assets/fonts/stylesheet.css"
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/global.scss";',
        }
      },
    },
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
      }
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  },
  spaLoadingTemplate: false,
  components: [
    {path: '~/components/sliders', pathPrefix: false},
    {path: '~/components/buttons', pathPrefix: false},
    '~/components'
  ],
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      apiUsername: process.env.VITE_API_USERNAME,
      apiPassword: process.env.VITE_API_PASSWORD,
      apiKey: process.env.VITE_API_KEY,
    },
    apiKey: "AIzaSyAbwylvVD25yuMBLU2H7ND49FyXkYfwhZo",
    authDomain: "affiliate-8d45d.firebaseapp.com",
    projectId: "affiliate-8d45d",
    storageBucket: "affiliate-8d45d.appspot.com",
    messagingSenderId: "287584876106",
    appId: "1:287584876106:web:223b2352f7ff2aaa8b98b3",
    measurementId: "G-JTK7MHKWPK",
    cryptoKey: "affiliate-key"
  }
})
