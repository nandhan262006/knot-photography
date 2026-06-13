export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'stats', title: 'Statistics'},
  ],
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. WELCOME TO KNOT PHOTOGRAPHY',
      group: 'content',
      initialValue: 'WELCOME TO KNOT PHOTOGRAPHY',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. Some Moments Fade. Yours Deserve to Live Forever.',
      group: 'content',
      initialValue: 'Some Moments Fade. Yours Deserve to Live Forever.',
    },
    {
      name: 'paragraphs',
      title: 'Description Paragraphs',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [],
          },
        },
      ],
      description: 'Each block is a paragraph of the About section text.',
      group: 'content',
    },
    {
      name: 'rating',
      title: 'Rating Stat',
      type: 'object',
      group: 'stats',
      description: 'Leave a field empty to fall back to default static data.',
      fields: [
        {
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'e.g. 4.8★',
        },
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g. Google Rating',
        },
        {
          name: 'desc',
          title: 'Description',
          type: 'string',
          description: 'e.g. Celebrated by hundreds of families',
        },
      ],
    },
    {
      name: 'reviews',
      title: 'Reviews Stat',
      type: 'object',
      group: 'stats',
      description: 'Leave a field empty to fall back to default static data.',
      fields: [
        {
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'e.g. 1K+',
        },
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g. Google Reviews',
        },
        {
          name: 'desc',
          title: 'Description',
          type: 'string',
          description: 'e.g. Trusted across Andhra Pradesh & beyond',
        },
      ],
    },
    {
      name: 'weddings',
      title: 'Weddings Stat',
      type: 'object',
      group: 'stats',
      description: 'Leave a field empty to fall back to default static data.',
      fields: [
        {
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'e.g. 300+',
        },
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g. Weddings Captured',
        },
        {
          name: 'desc',
          title: 'Description',
          type: 'string',
          description: 'e.g. Transformed into timeless family treasures',
        },
      ],
    },
  ],
}
