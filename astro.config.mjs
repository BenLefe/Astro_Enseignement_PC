import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build
export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  integrations: [
    starlight({
      title: 'Physique-Chimie Collège',
      // 🟩 Fixed: Converted to a flat array using the modern layout
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
