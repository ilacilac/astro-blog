import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://ilacilac.netlify.app/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        '@layouts': '/src/layouts',
        '@components': '/src/components',
      },
    },
  },

  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
})
