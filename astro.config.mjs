import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build
export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  // 🟩 Fixed: Tells Astro to treat assets as standard static public paths
  legacy: {
    collections: true,
  },
  
  integrations: [
    starlight({
      title: 'Physique-Chimie Collège',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com' }
      ],
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
