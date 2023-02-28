import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/js/admin/app.tsx',
                'resources/js/webapp/app.tsx'
            ],
            refresh: true,
            postcss: [
                autoprefixer(),
            ],
        }),
    ],
});
