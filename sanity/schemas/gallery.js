export default {
  name: 'gallery',
  title: 'Gallery Image',
  type: 'document',
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
      description: 'Determines the display position in the gallery (lower numbers appear first).',
      validation: (Rule) => Rule.required().min(1).integer(),
    },
    {
      name: 'title',
      title: 'Image Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Pre-Wedding', value: 'Pre-Wedding'},
          {title: 'Wedding', value: 'Wedding'},
          {title: 'Fashion', value: 'Fashion'},
          {title: 'Maternity', value: 'Maternity'},
          {title: 'Baby', value: 'Baby'},
          {title: 'Kids Studio', value: 'Kids Studio'},
        ],
      },
    },
  ],
  orderings: [
    {
      title: 'Display Order',
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
