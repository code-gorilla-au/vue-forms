import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  root: './examples',
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': path.resolve(
        __dirname,
        '..',
        'packages',
        'vue-forms',
        'src',
        'components',
      ),
      '@use': path.resolve(
        __dirname,
        '..',
        'packages',
        'vue-forms',
        'src',
        'use',
      ),
    },
  },
});
