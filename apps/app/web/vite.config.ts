/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/web',
  server: {
    port: 4200,
    host: '0.0.0.0',
    cors: true
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // },
    // proxy: {
    //   '/api/v1': {
    //     changeOrigin: true
    //   }
    // }
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../'
    })
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../../node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
})
