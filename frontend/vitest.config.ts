import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/custom-elements/__tests__/**/*.vitest.ts'],
    setupFiles: ['vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@primer/react': path.resolve(__dirname, 'src/test-stubs/primer-react.tsx'),
      '@primer/octicons-react': path.resolve(
        __dirname,
        'src/test-stubs/octicons-react.tsx',
      ),
    },
  },
});
