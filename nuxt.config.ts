import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  devtools: {enabled: false},
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
    prerender: {
      failOnError: false,
    }
  },
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
  // swiper: {
  //   prefix: 'Swiper',
  //   styleLang: 'css',
  //   modules: ['navigation'],
  // },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
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
