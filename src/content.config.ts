import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// 1. Instantiate the native Starlight loader
const baseLoader = docsLoader();

export const collections = {
  docs: defineCollection({ 
    // 2. Wrap the loader to create an exact bypass channel
    loader: {
      name: baseLoader.name,
      load: async (context) => {
        // Run Starlight's layout matching pipeline first
        await baseLoader.load(context);

        // 3. Drop specified files entirely out of memory before validation occurs
        for (const id of context.store.keys()) {
          const lowerId = id.toLowerCase();
          
          if (
            id.startsWith('_programmes_educ/') || // Bypasses everything inside programmes_educ/
            lowerId === 'cheatsheet' ||          // Bypasses CHEATSHEET.md
            lowerId === 'license' ||             // Bypasses LICENSE files
            lowerId.endsWith('.py') ||           // Bypasses any python scripts
            lowerId.endsWith('.pdf')             // Bypasses raw PDFs
          ) {
            context.store.delete(id); // Erases the entry from the compiler sequence completely
          }
        }
      }
    },
    schema: docsSchema() 
  }),
};
