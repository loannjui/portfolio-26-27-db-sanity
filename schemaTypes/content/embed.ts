import { defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe'

export const embed = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  icon: EarthGlobeIcon,

  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Address of the page to show in the iframe, e.g. a Figma, YouTube or CodePen embed link',
      validation: Rule =>
        Rule.required()
          .uri({ scheme: ['https'] })
          .error('Must be a URL starting with https://'),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Describes the embedded content for screen readers, not shown on the site',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'aspectRatio',
      title: 'Aspect ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '1:1', value: '1/1' },
          { title: '9:16 (portrait)', value: '9/16' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '16/9',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional — text shown below the embed',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title || 'Embed',
        subtitle: url,
        media: EarthGlobeIcon,
      }
    },
  },
})
