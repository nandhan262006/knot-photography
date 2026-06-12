import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export async function getGallery() {
  return client.fetch(`*[_type == "gallery"] | order(order asc){_id, title, category, "url": image.asset->url}`)
}

export async function getPortfolio() {
  return client.fetch(`*[_type == "portfolio"] | order(order asc){_id, title, category, "url": image.asset->url}`)
}

export async function getReviews() {
  return client.fetch(`*[_type == "review"] | order(order asc){name, role, text, rating, date}`)
}
