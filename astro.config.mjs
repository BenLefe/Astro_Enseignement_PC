import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build
export default defineConfig({
  // ⚠️ Crucial for GitHub Pages to serve files from the right folder
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  integrations: [
    starlight({
      title: 'Physique-Chimie Collège',
      social: {
        github: 'https://github.com',
      },
      sidebar: [
        // The sidebar will automatically generate links based on your folder structure (6eme, 5eme, etc.)
        {
          label: 'Classes',
          autogenerate: { directory: '' },
        },
      ],
    }),
  ],
});
