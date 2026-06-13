export default {
  name: 'kidsStudio',
  title: 'Kids Studio 3D',
  type: 'document',
  description:
    'Upload an image with an order number to replace the corresponding photo holder. Order 1 = Maternity, Order 2 = Newborn, Order 3 = Little Star.',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: '1 = Maternity, 2 = Newborn, 3 = Little Star',
      validation: (Rule) => Rule.required().min(1).max(3).integer(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
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
      title: 'order',
      media: 'image',
    },
    prepare({title, media}) {
      const labels = {1: 'Maternity', 2: 'Newborn', 3: 'Little Star'}
      return {
        title: `Order ${title} — ${labels[title] || 'Unknown'}`,
        media,
      }
    },
  },
}
