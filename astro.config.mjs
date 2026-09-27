import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax'; // 🟩 Switched to MathJax for pristine ^ and _ handling

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
      // 🟩 Removed the external CSS link since MathJax handles drawing glyphs on a modern canvas layer!
      head: [],
      // 🟩 Updated: Uses explicit markdown parameters inside the Starlight integration block
      markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeMathjax],
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
