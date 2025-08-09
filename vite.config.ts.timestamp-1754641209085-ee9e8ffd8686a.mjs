// vite.config.ts
import { defineConfig } from "file:///C:/Users/ELITEBOOK/Bureau/sites/zofin-ken/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ELITEBOOK/Bureau/sites/zofin-ken/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { splitVendorChunkPlugin } from "file:///C:/Users/ELITEBOOK/Bureau/sites/zofin-ken/node_modules/vite/dist/node/index.js";
import { compression } from "file:///C:/Users/ELITEBOOK/Bureau/sites/zofin-ken/node_modules/vite-plugin-compression2/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\ELITEBOOK\\Bureau\\sites\\zofin-ken";
var vite_config_default = defineConfig({
  plugins: [
    react({
      // Optimisation de React
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
          "transform-remove-console",
          "transform-remove-debugger"
        ]
      }
    }),
    splitVendorChunkPlugin(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024
      // Compresser les fichiers > 1KB
    }),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024
    })
  ],
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@headlessui/react",
      "@heroicons/react",
      "framer-motion",
      "react-helmet",
      "react-hot-toast",
      "react-icons"
    ],
    exclude: ["@vite/client", "@vite/env"]
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "react-vendor";
            }
            if (id.includes("@headlessui") || id.includes("@heroicons") || id.includes("framer-motion")) {
              return "ui-vendor";
            }
            if (id.includes("react-helmet") || id.includes("react-hot-toast") || id.includes("react-icons")) {
              return "utils-vendor";
            }
            return "vendor";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1e3,
    // Optimisation du cache
    assetsInlineLimit: 4096,
    // Génération de manifest pour le cache
    manifest: true,
    // Optimisation des assets
    assetsDir: "assets",
    emptyOutDir: true,
    // Compression des assets
    brotliSize: true
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    hmr: {
      overlay: false
      // Désactiver l'overlay HMR pour de meilleures performances
    }
  },
  // Optimisation du cache
  cacheDir: ".vite_cache",
  // Optimisation des assets statiques
  publicDir: "public",
  // Optimisation du chargement des modules
  esbuild: {
    treeShaking: true,
    minify: true,
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFTElURUJPT0tcXFxcQnVyZWF1XFxcXHNpdGVzXFxcXHpvZmluLWtlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRUxJVEVCT09LXFxcXEJ1cmVhdVxcXFxzaXRlc1xcXFx6b2Zpbi1rZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0VMSVRFQk9PSy9CdXJlYXUvc2l0ZXMvem9maW4ta2VuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgc3BsaXRWZW5kb3JDaHVua1BsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIC8vIE9wdGltaXNhdGlvbiBkZSBSZWFjdFxuICAgICAgYmFiZWw6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIFsnQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcmVhY3QtanN4JywgeyBydW50aW1lOiAnYXV0b21hdGljJyB9XSxcbiAgICAgICAgICAndHJhbnNmb3JtLXJlbW92ZS1jb25zb2xlJyxcbiAgICAgICAgICAndHJhbnNmb3JtLXJlbW92ZS1kZWJ1Z2dlcicsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgIGV4Y2x1ZGU6IFsvXFwuKGJyKSQvLCAvXFwuKGd6KSQvXSxcbiAgICAgIHRocmVzaG9sZDogMTAyNCwgLy8gQ29tcHJlc3NlciBsZXMgZmljaGllcnMgPiAxS0JcbiAgICB9KSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICBleGNsdWRlOiBbL1xcLihicikkLywgL1xcLihneikkL10sXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgfSksXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdyZWFjdCcsXG4gICAgICAncmVhY3QtZG9tJyxcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICdAaGVhZGxlc3N1aS9yZWFjdCcsXG4gICAgICAnQGhlcm9pY29ucy9yZWFjdCcsXG4gICAgICAnZnJhbWVyLW1vdGlvbicsXG4gICAgICAncmVhY3QtaGVsbWV0JyxcbiAgICAgICdyZWFjdC1ob3QtdG9hc3QnLFxuICAgICAgJ3JlYWN0LWljb25zJyxcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFsnQHZpdGUvY2xpZW50JywgJ0B2aXRlL2VudiddLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUuZGVidWcnXSxcbiAgICAgICAgcGFzc2VzOiAyLFxuICAgICAgfSxcbiAgICAgIG1hbmdsZTogdHJ1ZSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBjb21tZW50czogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdCcpIHx8IGlkLmluY2x1ZGVzKCdyZWFjdC1kb20nKSB8fCBpZC5pbmNsdWRlcygncmVhY3Qtcm91dGVyLWRvbScpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAncmVhY3QtdmVuZG9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQGhlYWRsZXNzdWknKSB8fCBpZC5pbmNsdWRlcygnQGhlcm9pY29ucycpIHx8IGlkLmluY2x1ZGVzKCdmcmFtZXItbW90aW9uJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd1aS12ZW5kb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdC1oZWxtZXQnKSB8fCBpZC5pbmNsdWRlcygncmVhY3QtaG90LXRvYXN0JykgfHwgaWQuaW5jbHVkZXMoJ3JlYWN0LWljb25zJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd1dGlscy12ZW5kb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIC8vIE9wdGltaXNhdGlvbiBkdSBjYWNoZVxuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LFxuICAgIC8vIEdcdTAwRTluXHUwMEU5cmF0aW9uIGRlIG1hbmlmZXN0IHBvdXIgbGUgY2FjaGVcbiAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAvLyBPcHRpbWlzYXRpb24gZGVzIGFzc2V0c1xuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgLy8gQ29tcHJlc3Npb24gZGVzIGFzc2V0c1xuICAgIGJyb3RsaVNpemU6IHRydWUsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ2FjaGUtQ29udHJvbCc6ICdwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZScsXG4gICAgfSxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLCAvLyBEXHUwMEU5c2FjdGl2ZXIgbCdvdmVybGF5IEhNUiBwb3VyIGRlIG1laWxsZXVyZXMgcGVyZm9ybWFuY2VzXG4gICAgfSxcbiAgfSxcbiAgLy8gT3B0aW1pc2F0aW9uIGR1IGNhY2hlXG4gIGNhY2hlRGlyOiAnLnZpdGVfY2FjaGUnLFxuICAvLyBPcHRpbWlzYXRpb24gZGVzIGFzc2V0cyBzdGF0aXF1ZXNcbiAgcHVibGljRGlyOiAncHVibGljJyxcbiAgLy8gT3B0aW1pc2F0aW9uIGR1IGNoYXJnZW1lbnQgZGVzIG1vZHVsZXNcbiAgZXNidWlsZDoge1xuICAgIHRyZWVTaGFraW5nOiB0cnVlLFxuICAgIG1pbmlmeTogdHJ1ZSxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULFNBQVMsb0JBQW9CO0FBQ3RWLE9BQU8sV0FBVztBQUNsQixTQUFTLDhCQUE4QjtBQUN2QyxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGVBQWU7QUFKeEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsTUFFSixPQUFPO0FBQUEsUUFDTCxTQUFTO0FBQUEsVUFDUCxDQUFDLHFDQUFxQyxFQUFFLFNBQVMsWUFBWSxDQUFDO0FBQUEsVUFDOUQ7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELHVCQUF1QjtBQUFBLElBQ3ZCLFlBQVk7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFNBQVMsQ0FBQyxXQUFXLFNBQVM7QUFBQSxNQUM5QixXQUFXO0FBQUE7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFNBQVMsQ0FBQyxXQUFXLFNBQVM7QUFBQSxNQUM5QixXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxnQkFBZ0IsV0FBVztBQUFBLEVBQ3ZDO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsUUFDZixZQUFZLENBQUMsZUFBZSxnQkFBZ0IsZUFBZTtBQUFBLFFBQzNELFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBQ3BCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxHQUFHLFNBQVMsT0FBTyxLQUFLLEdBQUcsU0FBUyxXQUFXLEtBQUssR0FBRyxTQUFTLGtCQUFrQixHQUFHO0FBQ3ZGLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxhQUFhLEtBQUssR0FBRyxTQUFTLFlBQVksS0FBSyxHQUFHLFNBQVMsZUFBZSxHQUFHO0FBQzNGLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEtBQUssR0FBRyxTQUFTLGlCQUFpQixLQUFLLEdBQUcsU0FBUyxhQUFhLEdBQUc7QUFDL0YscUJBQU87QUFBQSxZQUNUO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCx1QkFBdUI7QUFBQTtBQUFBLElBRXZCLG1CQUFtQjtBQUFBO0FBQUEsSUFFbkIsVUFBVTtBQUFBO0FBQUEsSUFFVixXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUE7QUFBQSxJQUViLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQTtBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFVBQVU7QUFBQTtBQUFBLEVBRVYsV0FBVztBQUFBO0FBQUEsRUFFWCxTQUFTO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
