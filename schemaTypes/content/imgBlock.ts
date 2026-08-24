import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const imgBlock = defineType({
  name: 'imageBlock',
  title: 'Bloc image',
  type: 'object',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Bloc image',
        subtitle: 'Image',
        media: media || ImageIcon,
      }
    },
  },
})
