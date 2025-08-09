import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimisation de React
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          'transform-remove-console',
          'transform-remove-debugger',
        ],
      },
    }),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024, // Compresser les fichiers > 1KB
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      '@heroicons/react',
      'framer-motion',
      'react-helmet',
      'react-hot-toast',
      'react-icons',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@headlessui') || id.includes('@heroicons') || id.includes('framer-motion')) {
              return 'ui-vendor';
            }
            if (id.includes('react-helmet') || id.includes('react-hot-toast') || id.includes('react-icons')) {
              return 'utils-vendor';
            }
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Optimisation du cache
    assetsInlineLimit: 4096,
    // Génération de manifest pour le cache
    manifest: true,
    // Optimisation des assets
    assetsDir: 'assets',
    emptyOutDir: true,
    // Compression des assets
    brotliSize: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    hmr: {
      overlay: false, // Désactiver l'overlay HMR pour de meilleures performances
    },
  },
  // Optimisation du cache
  cacheDir: '.vite_cache',
  // Optimisation des assets statiques
  publicDir: 'public',
  // Optimisation du chargement des modules
  esbuild: {
    treeShaking: true,
    minify: true,
    target: 'esnext',
  },
});
