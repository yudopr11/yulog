import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const allowedHosts = [
    'localhost',
    '.railway.app'
  ];

  // Add custom hosts from env if exists (comma-separated list)
  if (env.VITE_ALLOWED_HOST) {
    const customHosts = env.VITE_ALLOWED_HOST.split(',').map(host => host.trim());
    allowedHosts.push(...customHosts);
  }

  return {
    plugins: [
      react()
    ],
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
      host: true,
      allowedHosts
    },
    build: {
      chunkSizeWarningLimit: 1200, // Increased slightly while we optimize
      target: 'esnext', // Optimizes output for modern browsers
      rollupOptions: {
        output: {
          // Enable default vendor chunk splitting
          manualChunks: {
            'react-core': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'ui-components': ['@headlessui/react', '@heroicons/react'],
            'markdown-processing': ['react-markdown', 'rehype-katex', 'rehype-raw', 'remark-gfm', 'remark-math', 'remark-toc', 'katex'],
            'utilities': ['axios', 'react-hot-toast', 'crypto-js'],
            'syntax-highlighting': ['shiki']
          }
        }
      }
    }
  };
});
