import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build
export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  integrations: [
    starlight({
      title: 'Physique-Chimie Collège',
      // 🟩 Fixed: social syntax now explicitly maps the provider to its config object
      social: {
        github: { link: 'https://github.com' },
      },
      sidebar: [
        {
          label: 'Classes',
          items: [
            { autogenerate: { directory: '' } }
          ]
        },
      ],
    }),
  ],
});
