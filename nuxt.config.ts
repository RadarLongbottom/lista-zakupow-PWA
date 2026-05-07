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

      navigateFallbackDenylist: [
        /^\/api\//
      ],

      globPatterns: [
        '**/*.{js,css,html,png,svg,ico,webmanifest}'
      ],

      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            networkTimeoutSeconds: 3
          }
        },
        {
          urlPattern: ({ request }) =>
            ['script', 'style', 'image', 'font'].includes(request.destination),
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30
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