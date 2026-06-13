import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '8vissldq',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-05-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// ── About ──
const aboutQuery = `*[_type == "about"][0]{
  heading,
  subtitle,
  paragraphs,
  rating,
  reviews,
  weddings
}`

export async function getAbout() {
  return client.fetch(aboutQuery)
}

// ── Bespoke Services (match by serviceName) ──
const servicesQuery = `*[_type == "bespokeService"]{serviceName, image}`

export async function getBespokeServices() {
  return client.fetch(servicesQuery)
}

// ── Gallery (ordered) ──
const galleryQuery = `*[_type == "gallery"] | order(order asc){_id, title, category, image, order}`

export async function getGallery() {
  return client.fetch(galleryQuery)
}

// ── Kids Studio (ordered) ──
const studioQuery = `*[_type == "kidsStudio"] | order(order asc){order, image}`

export async function getKidsStudio() {
  return client.fetch(studioQuery)
}
