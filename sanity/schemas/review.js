export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Bride', value: 'Bride'},
          {title: 'Groom', value: 'Groom'},
          {title: 'Couple', value: 'Couple'},
          {title: 'Father of Bride', value: 'Father of Bride'},
          {title: 'Mother of Bride', value: 'Mother of Bride'},
          {title: 'Guest', value: 'Guest'},
        ],
      },
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          {title: '1', value: 1},
          {title: '2', value: 2},
          {title: '3', value: 3},
          {title: '4', value: 4},
          {title: '5', value: 5},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. "2 weeks ago"',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
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
