export default {
  name: 'bespokeService',
  title: 'Bespoke Service',
  type: 'document',
  description:
    'Add or update a service card. If the Service Name matches an existing card title (e.g. "Engagement", "Weddings"), its image will be replaced. Otherwise a new card is appended.',
  fields: [
    {
      name: 'serviceName',
      title: 'Service Name',
      type: 'string',
      description:
        'Must exactly match the card title to replace (e.g. "Engagement", "Weddings", "Post Wedding", "Pre Wedding", "Fashion Photography", "Outdoor Photography", "Kids Studio", "Baby Photography", "Maternity Shoot").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'serviceName',
      media: 'image',
    },
  },
}
