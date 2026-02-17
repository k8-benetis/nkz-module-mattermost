import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/App.tsx'), // Main component export
            name: 'nkz_module_mattermost',
            fileName: () => 'nkz-module.js',
            formats: ['iife'], // Compile to single IIFE string
        },
        rollupOptions: {
            // External dependencies that exist in the Host environment
            external: [
                'react',
                'react-dom',
                '@nekazari/sdk',
                '@nekazari/ui-kit'
            ],
            output: {
                // Map external deps to global variables
                globals: {
                    react: 'window.React',
                    'react-dom': 'window.ReactDOM',
                    '@nekazari/sdk': 'window.__NKZ_SDK__',
                    '@nekazari/ui-kit': 'window.__NKZ_UI__'
                },
                // Ensure the IIFE assigns to a predictable variable if needed (though we rely on side-effects)
                name: 'nkz_module_mattermost',
                extend: true,
            },
        },
        minify: 'esbuild',
        emptyOutDir: true,
    },
});
