export default {
  name: 'services',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'serviceList',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    },
  ],
};
