export default {
  name: 'gallery',
  title: 'Gallery Image',
  type: 'document',
  description:
    'Upload a gallery image with an order number. If the order is greater than the current number of gallery photos it will be appended. If the order is less than or equal to the existing count, it replaces the image at that position.',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Order in the gallery (1-based). Greater than total count → append. Less than or equal to total count → replace.',
      validation: (Rule) => Rule.required().min(1).integer(),
    },
    {
      name: 'title',
      title: 'Image Title',
      type: 'string',
      description: 'Optional title for the image (e.g. "Love in the Wild").',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description:
        'Optional category (e.g. Pre-Wedding, Wedding, Fashion, Maternity, Baby, Kids Studio).',
    },
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'order',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || `Image #${subtitle}`,
        subtitle: `Order: ${subtitle}`,
        media,
      }
    },
  },
}
