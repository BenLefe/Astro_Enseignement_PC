import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AutoImport from 'astro-auto-import';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import starlightViewModes from 'starlight-view-modes';

const USE_CUSTOM_DOMAIN = true; 

export default defineConfig({
  site: USE_CUSTOM_DOMAIN ? 'https://ravenphysis.fr' : 'https://github.io',
  base: (process.env.NODE_ENV === 'production' && !USE_CUSTOM_DOMAIN) ? '/Astro_Enseignement_PC' : '/',
  publicDir: 'public',

  integrations: [
    AutoImport({
      imports: [{ './src/components/PdfViewer.astro': [['default', 'PdfViewer']] }],
    }),
    starlight({
      title: 'Ravenphysis.fr : Physique-Chimie au Collège',
      plugins: [starlightViewModes()],
      markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
      logo: { src: './src/assets/favicon2.png' },
      favicon: '/favicon.svg',
      
      head: [
  {
    tag: 'script',
    content: `
      function initZenButton() {
        if (document.getElementById('custom-zen-toggle')) return;

        const pathname = window.location.pathname;
        const isZen = pathname.includes('/zen-mode/');

        // STYLE DE CENTRAGE, NETTOYAGE ET ADAPTATION SPÉCIALE POUR VOTRE CUSTOM.CSS
        if (isZen) {
          const style = document.createElement('style');
          style.id = 'zen-mode-cleaner-css';
          style.textContent = \`
            /* 1. Masque complètement la table des matières à droite */
            aside, .right-sidebar, starlight-toc { 
              display: none !important; 
            }
            
            /* 2. Réinitialise la grille globale de Starlight à une seule colonne */
            .main-frame {
              grid-template-columns: 1fr !important;
            }
            
            /* 3. Force le contenu à se centrer parfaitement au milieu de l'écran */
            .main-pane, main, .content-panel, #starlight__main-content { 
              max-width: 65rem !important; 
              width: 100% !important; 
              margin: 0 auto !important;   
              float: none !important;
              padding-inline: 2rem !important;
            }

            /* 4. LE GRAND ZOOM PROJECTEUR (SANS EFFET DE CASSE) 🟩 */
            :root, html {
              /* On augmente la base relative */
              font-size: 135% !important; 
            }

            /* On force le contenu de votre cours (qui était figé à 15px) à écouter le zoom en passant en 'rem' */
            .sl-markdown-content p,
            .sl-markdown-content li,
            .sl-markdown-content ul,
            .sl-markdown-content ol,
            .sl-markdown-content table,
            .sl-markdown-content blockquote {
              font-size: 1.5rem !important; /* Devient proportionnel à la taille de l'écran */
            }

            /* On fait de même pour vos titres afin qu'ils grandissent proportionnellement */
            .sl-markdown-content h1 { font-size: 2.5rem !important; }
            .sl-markdown-content h2 { font-size: 2.1rem !important; }
            .sl-markdown-content h3 { font-size: 1.7rem !important; }
            
            /* Bonus visuel pour les formules mathématiques au fond de la classe */
            .katex-html {
              font-size: 1.3em !important;
            }
          \`;
          document.head.appendChild(style);
        }

        // Création du bouton flottant
        const btn = document.createElement('button');
        btn.id = 'custom-zen-toggle';
        btn.innerText = isZen ? '✕ Quitter le mode Zen' : '👁️ Mode Zen / Classe';
        
        Object.assign(btn.style, {
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: '9999',
          padding: '12px 20px',
          backgroundColor: isZen ? '#dc2626' : '#059669',
          color: '#ffffff',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          transition: 'transform 0.2s ease',
        });

        btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
        btn.onmouseleave = () => btn.style.transform = 'scale(1)';

        btn.onclick = () => {
          if (isZen) {
            window.location.pathname = pathname.replace('/zen-mode/', '/');
          } else {
            const base = pathname.startsWith('/Astro_Enseignement_PC') ? '/Astro_Enseignement_PC' : '';
            if (base) {
              window.location.pathname = pathname.replace(base, base + '/zen-mode');
            } else {
              window.location.pathname = '/zen-mode' + pathname;
            }
          }
        };

        document.body.appendChild(btn);
      }

      window.addEventListener('DOMContentLoaded', initZenButton);
      document.addEventListener('astro:page-load', initZenButton);
    `
  }
],

      
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
