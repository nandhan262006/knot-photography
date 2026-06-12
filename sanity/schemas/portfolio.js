export default {
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Wedding', value: 'Wedding'},
          {title: 'Pre-Wedding', value: 'Pre-Wedding'},
          {title: 'Candid', value: 'Candid'},
          {title: 'Reception', value: 'Reception'},
          {title: 'Engagement', value: 'Engagement'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: async (_, context) => {
        const client = context.getClient({apiVersion: '2024-01-01'})
        const maxOrder = await client.fetch(`max(*[_type == "portfolio"].order)`)
        return (maxOrder ?? -1) + 1
      },
    },
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}
