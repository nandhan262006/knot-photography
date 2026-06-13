import {defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
    },
    {
      name: 'headingLeft',
      title: 'Heading (left part)',
      type: 'string',
    },
    {
      name: 'headingRight',
      title: 'Heading (right/italic part)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'ctaDesktop',
      title: 'CTA Button Text (Desktop)',
      type: 'string',
    },
    {
      name: 'ctaMobile',
      title: 'CTA Button Text (Mobile)',
      type: 'string',
    },
    {
      name: 'details',
      title: 'Contact Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    },
  ],
})
