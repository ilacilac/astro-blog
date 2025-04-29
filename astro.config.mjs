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
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
})
