import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://main.d3ludbi4nxj7ab.amplifyapp.com',
  base: process.env.SITE_BASE || '/',
  build: { inlineStylesheets: 'auto' },
});
