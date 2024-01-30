// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  modules: ['nuxt-swiper', '@nuxtjs/device'],
  css: ['@/assets/styles/styles.scss'],
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
    { path: '~/components/sliders', pathPrefix: false },
    '~/components'
  ],
  swiper: {
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation'],
  }
})
