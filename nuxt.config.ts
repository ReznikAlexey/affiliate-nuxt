// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  ssr: true,
  nitro: {
    prerender: {
      failOnError: false,
    }
  },
  modules: ['nuxt-swiper', '@nuxtjs/device', '@nuxt/ui', '@nuxtjs/i18n',],
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
  },
  components: [
    {path: '~/components/sliders', pathPrefix: false},
    {path: '~/components/buttons', pathPrefix: false},
    '~/components'
  ],
  swiper: {
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation'],
  },
  colorMode: {
    preference: 'light'
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'es',
        name: 'Español'
      },
      {
        code: 'fr',
        name: 'Français'
      }
    ]
  },
})
