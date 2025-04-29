import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify'

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
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
})
