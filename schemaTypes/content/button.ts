import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: LinkIcon,

  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Text shown on the button, e.g. "Visit the website"',
      validation: Rule => Rule.required().max(60),
    }),

    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule =>
        Rule.required()
          .uri({ scheme: ['http', 'https', 'mailto'] })
          .error('Must be a URL starting with http://, https:// or mailto:'),
    }),
  ],

  preview: {
    select: {
      label: 'label',
      url: 'url',
    },
    prepare({ label, url }) {
      return {
        title: label || 'Button',
        subtitle: url,
        media: LinkIcon,
      }
    },
  },
})
