import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuração do Vite para Poetry Creator
// Vite configuration for Poetry Creator
export default defineConfig({
  // Plugins de integração
  plugins: [react()],

  // Configurações do servidor de desenvolvimento
  // Development server configurations
  server: {
    port: 5173, // Porta padrão do Vite
    host: true, // Permite acesso de outros dispositivos na rede
    open: true, // Abre automaticamente no navegador
    strictPort: true, // Força o uso da porta especificada
    cors: true, // Habilita CORS
    proxy: {
      // Configuração de proxy para desenvolvimento
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },

  // Configurações de build
  // Build configurations
  build: {
    outDir: 'dist', // Diretório de saída para build
    assetsDir: 'assets', // Diretório para assets
    sourcemap: true, // Gera sourcemaps para debug
    minify: 'terser', // Minificação usando Terser
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Estratégia de divisão de código
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },

  // Configurações de resolução de módulos
  // Module resolution configurations
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@config': path.resolve(__dirname, './src/config')
    }
  },

  // Configurações de assets estáticos
  // Static assets configurations
  assetsInclude: ['**/*.mp4', '**/*.mov', '**/*.avi', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],

  // Configurações de otimização
  // Optimization configurations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: [
      // Módulos que não devem ser pré-carregados
      'jest'
    ]
  },

  // Configurações de ambiente
  // Environment configurations
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version)
  },

  // Configurações de CSS
  // CSS configurations
  css: {
    preprocessorOptions: {
      // Opções para pré-processadores CSS (se usar)
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    },
    devSourcemap: true // Sourcemaps para CSS
  }
});
