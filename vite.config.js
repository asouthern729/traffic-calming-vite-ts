import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [tailwindcss(), react(), tsconfigPaths()],
    base: '/traffic-calming',
    css: {
        postcss: {
            plugins: [
                autoprefixer,
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@test': path.resolve(__dirname, './src/test')
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            }
        }
    },
    server: {
        host: true,
        allowedHosts: ['cofasv38', 'istest.franklintn.gov', 'dev.franklintn.gov']
    }
});
