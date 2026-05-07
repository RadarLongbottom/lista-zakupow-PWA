export default defineNuxtConfig({
  compatibilityDate: '2026-05-06',

  modules: ['@vite-pwa/nuxt'],

  app: {
    head: {
      title: 'Smart Shopping List PWA',

      meta: [
        {
          name: 'description',
          content: 'Interaktywna aplikacja PWA do tworzenia list zakupów'
        },
        {
          name: 'theme-color',
          content: '#2563eb'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'default'
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
        },
        {
          rel: 'apple-touch-icon',
          href: '/icon-192.png'
        }
      ]
    }
  },

  pwa: {
    registerType: 'autoUpdate',

    manifest: false,

    workbox: {
      navigateFallback: '/',

      globPatterns: [
        '**/*.{js,css,html,png,svg,ico,webmanifest}'
      ],

      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-stylesheets'
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365
            }
          }
        }
      ]
    },

    devOptions: {
      enabled: true
    }
  }
})