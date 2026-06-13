export default {
  name: 'portfolio',
  title: 'Portfolio Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
    },
    {
      name: 'headingPrefix',
      title: 'Heading Prefix',
      type: 'string',
    },
    {
      name: 'headingSuffix',
      title: 'Heading Suffix',
      type: 'string',
    },
    {
      name: 'buttonText',
      title: 'Gallery Button Text',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Filter Categories',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'items',
      title: 'Portfolio Items',
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
};
