import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: 'dist',
  //   rollupOptions: {
  //     input: {
  //       main: './src/main.jsx',
  //     },
  //   }
  // }
  // build: {
  //   outDir: 'dist',
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: './src/main.jsx',

  //     },
  //   },
  // },
  
})
