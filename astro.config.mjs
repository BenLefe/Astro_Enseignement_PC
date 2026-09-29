import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 🟩 1. FLAG TO ACTIVATE YOUR CUSTOM DOMAIN NAME LATER
// Set this to true the day you buy your domain name (e.g., physique-college.fr)
const USE_CUSTOM_DOMAIN = true; 

export default defineConfig({
  // 🟩 2. FUTURE PROOF SITE URL & REPOSITORY CLEANUP
  site: USE_CUSTOM_DOMAIN ? 'https://ravenphysis.fr' : 'https://benlefe.github.io',
  
  // 🟩 3. CONDITIONAL BASE PATH RESOLUTION
  // Fixes local 404 dev server bugs, handles standard builds, and drops subfolders if a custom domain is active!
  base: (process.env.NODE_ENV === 'production' && !USE_CUSTOM_DOMAIN) 
    ? '/Astro_Enseignement_PC' 
    : '/',
  
  // Safe global parsing engine
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
      title: 'Ravenphysis.fr : Physique-Chimie au Collège',
      
      logo: {
        src: './src/assets/logo.png',
      },

      favicon: '/favicon.png',
      
      // Completely clean of fragile, cross-origin external CDN links !
      head: [],
      // Loads KaTeX's styles directly using local node modules distribution paths
      customCss: [
        'katex/dist/katex.min.css',
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
