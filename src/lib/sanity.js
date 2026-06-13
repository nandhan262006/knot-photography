import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = 'ea0dzojf';
const dataset = 'production';
const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
