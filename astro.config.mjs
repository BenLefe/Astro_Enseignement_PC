import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import';

// https://astro.build
export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  integrations: [
    AutoImport({
      imports: [
        {
          './src/components/PdfViewer.astro': [['default', 'PdfViewer']],
        },
      ],
    }),
    starlight({
      title: 'Physique-Chimie Collège',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com' }
      ],
      // 🟩 Fixed: Converted all sidebar links to the modern Starlight v0.39.0 array grouping
      sidebar: [
        {
          label: '6ème',
          items: [{ autogenerate: { directory: '6eme' } }]
        },
        {
          label: '5ème',
          items: [{ autogenerate: { directory: '5eme' } }]
        },
        {
          label: '4ème',
          items: [{ autogenerate: { directory: '4eme' } }]
        },
        {
          label: '3ème',
          items: [{ autogenerate: { directory: '3eme' } }]
        }
      ],
    }),
  ],
});
