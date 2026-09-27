import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://github.io',
  base: '/Astro_Enseignement_PC',
  
  // 🟩 Les plugins mathématiques doivent être déclarés ICI, à la racine d'Astro !
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  
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
      // Injection de la feuille de style KaTeX officielle (Cloudflare) via l'entête
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cloudflare.com',
          },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        { label: '6ème', items: [{ autogenerate: { directory: '6eme' } }] },
        { label: '5ème', items: [{ autogenerate: { directory: '5eme' } }] },
        { label: '4ème', items: [{ autogenerate: { directory: '4eme' } }] },
        { label: '3ème', items: [{ autogenerate: { directory: '3eme' } }] }
      ],
    }),
  ],
});
