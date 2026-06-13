import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/studio/schemas';

export default defineConfig({
  name: 'default',
  title: 'THE KNOT Photography',
  projectId: 'ea0dzojf',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
