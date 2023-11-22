/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { GITHUB_REF = '', GITHUB_REPOSITORY = '' } = process.env;
const isPR = /\/pull\/\d+\//.test(GITHUB_REF);
const [,, pr] = isPR ? GITHUB_REF.split('/') : [];
const [, repo] = isPR ? GITHUB_REPOSITORY.split('/') : [];

// https://vitejs.dev/config/
export default defineConfig({
  base: isPR ? `/${repo}/${pr}/` : '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
