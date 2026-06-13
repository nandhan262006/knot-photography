import {defineType} from 'sanity'

export default defineType({
  name: 'studioSettings',
  title: 'Kids Studio 3D Section',
  type: 'document',
  fields: [
    {
      name: 'storyCards',
      title: 'Story Cards',
      description: 'Add 3 images with order 1 (Maternity), 2 (Newborn), 3 (Little Star)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(3),
              options: {
                list: [
                  { title: '1 - Maternity', value: 1 },
                  { title: '2 - Newborn', value: 2 },
                  { title: '3 - Little Star', value: 3 },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'order',
              media: 'image',
            },
            prepare({ title, media }) {
              const labels = { 1: 'Maternity', 2: 'Newborn', 3: 'Little Star' }
              return {
                title: `${title ? labels[title] || `Order ${title}` : 'No order'}`,
                media,
              }
            },
          },
        },
      ],
    },
    {
      name: 'cameras',
      title: 'Cameras',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Camera Name', type: 'string' },
            { name: 'image', title: 'Camera Image', type: 'image' },
          ],
        },
      ],
    },
  ],
})
