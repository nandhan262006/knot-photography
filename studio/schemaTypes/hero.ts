import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Background Video',
      type: 'file',
      options: { accept: 'video/*' },
    },
    {
      name: 'fallbackImage',
      title: 'Fallback Image',
      type: 'image',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    },
    {
      name: 'scrollLabel',
      title: 'Scroll Down Label',
      type: 'string',
    },
  ],
})
