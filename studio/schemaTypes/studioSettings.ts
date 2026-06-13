import {defineType} from 'sanity'

export default defineType({
  name: 'studioSettings',
  title: 'Kids Studio 3D Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrowTop',
      title: 'Top Eyebrow Text',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'instagramLabel',
      title: 'Instagram Button Label',
      type: 'string',
    },
    {
      name: 'journeyText',
      title: 'Journey Text (above cards)',
      type: 'string',
    },
    {
      name: 'storyCards',
      title: 'Story Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' },
          ],
        },
      ],
    },
    {
      name: 'gearHeading',
      title: 'Gear Section Heading',
      type: 'string',
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
