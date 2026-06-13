import {defineType} from 'sanity'

export default defineType({
  name: 'reviews',
  title: 'Reviews Section',
  type: 'document',
  fields: [
    {
      name: 'rating',
      title: 'Rating (e.g. 4.8)',
      type: 'string',
    },
    {
      name: 'reviewCount',
      title: 'Review Count Text (e.g. 1K+)',
      type: 'string',
    },
    {
      name: 'reviewList',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'text', title: 'Review Text', type: 'text' },
            { name: 'rating', title: 'Rating', type: 'number' },
            { name: 'date', title: 'Date', type: 'string' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'role' },
          },
        },
      ],
    },
  ],
})
