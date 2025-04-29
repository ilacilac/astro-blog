import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  output: 'hybrid',
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
  adapter: netlify(),
})
