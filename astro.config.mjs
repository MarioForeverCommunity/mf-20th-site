// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

function yamlHmr() {
  return {
    name: 'yaml-hmr',
    /** @param {import('vite').ViteDevServer} server */
    configureServer(server) {
      server.watcher.on('change', /** @param {string} file */ (file) => {
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      });
    },
  };
}

export default defineConfig({
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss(), yamlHmr()],
  },
});
