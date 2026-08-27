import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const media = defineType({
  name: 'media',
  title: 'Image',
  type: 'document',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Used to find the image in the list, not shown on the site',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describes the image for screen readers and if the image fails to load',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional — text shown below the image',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'image',
    },
    prepare({ title, subtitle, media: image }) {
      return {
        title: title || 'Image',
        subtitle,
        media: image || ImageIcon,
      }
    },
  },
})
