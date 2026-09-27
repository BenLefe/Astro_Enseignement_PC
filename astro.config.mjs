import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import'; // 🟩 Imported AutoImport handler

export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  integrations: [
    // 🟩 Configured Global Auto-Import rules BEFORE Starlight loads
    AutoImport({
      imports: [
        {
          // Path pointing directly to your custom layout component file
          './src/components/PdfViewer.astro': [['default', 'PdfViewer']],
        },
      ],
    }),
    starlight({
      title: 'Physique-Chimie Collège',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com' }
      ],
      sidebar: [
        { label: '6ème', autogenerate: { directory: '6eme' } },
        { label: '5ème', autogenerate: { directory: '5eme' } },
        { label: '4ème', autogenerate: { directory: '4eme' } },
        { label: '3ème', autogenerate: { directory: '3eme' } }
      ],
    }),
  ],
});
