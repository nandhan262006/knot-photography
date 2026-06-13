import {defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    },
    {
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'category' },
          },
        },
      ],
    },
  ],
})
