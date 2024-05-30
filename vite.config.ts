import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'vite.svg'],
            manifest: {
                name: '学園アイドルマスター Calculator',
                short_name: '学マス Cal',
                description: 'Calculator the estimated final exam score',
                theme_color: '#1a1b1e',
                icons: [
                    {
                      src: 'vite.svg',
                      sizes: '192x192',
                      type: 'image/svg'
                    }
                ]
            }
        })
    ],
    esbuild: {
        drop: ['console', 'debugger'],
    },
    build: {
        sourcemap: false,
    }
})
