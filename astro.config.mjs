import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build
export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  integrations: [
    starlight({
      title: 'Physique-Chimie Collège',
      // 🟩 Fixed: social requires an object containing a specific provider structure or links array
      social: {
        github: 'https://github.com',
      },
      sidebar: [
        // 🟩 Fixed: autogenerate must sit inside an items array wrapped by a label group
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
