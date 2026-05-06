export default defineNuxtConfig({
  compatibilityDate: '2026-05-06',

  modules: ['@vite-pwa/nuxt'],

  app: {
    head: {
      title: 'Lista zakupów PWA',

      meta: [
        {
          name: 'description',
          content: 'Prosta aplikacja PWA w Nuxt 4'
        },
        {
          name: 'theme-color',
          content: '#111827'
        }
      ],

      link: [
        {
          rel: 'manifest',
          href: '/manifest.webmanifest'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon-192.png'
        }
      ]
    }
  },

  pwa: {
    registerType: 'autoUpdate',

    manifest: false,

    workbox: {
      navigateFallback: '/'
    },

    devOptions: {
      enabled: true
    }
  }
})