import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
      // 🟩 Restored: Global CSS formatting headers to draw fractions and chemical symbols cleanly
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cloudflare.com',
            crossorigin: 'anonymous'
          },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      // 🟩 Fixed Layout: Uses the updated unified wrapper schema required by Astro
      markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [[rehypeKatex, { strict: false, trust: true }]],
      },
      sidebar: [
        { label: '6ème', items: [{ autogenerate: { directory: '6eme' } }] },
        { label: '5ème', items: [{ autogenerate: { directory: '5eme' } }] },
        { label: '4ème', items: [{ autogenerate: { directory: '4eme' } }] },
        { label: '3ème', items: [{ autogenerate: { directory: '3eme' } }] }
      ],
    }),
  ],
});
