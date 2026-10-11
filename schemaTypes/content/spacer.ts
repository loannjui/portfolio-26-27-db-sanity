import { defineField, defineType } from 'sanity'
import { SquareIcon } from '@sanity/icons/Square'

export const spacer = defineType({
  name: 'spacer',
  title: 'Empty space',
  type: 'object',
  icon: SquareIcon,
  description: 'Leaves an empty spot to shift the next items on desktop',

  // Sanity requires at least one field on an object, so this one is never shown
  fields: [
    defineField({
      name: 'placeholder',
      type: 'boolean',
      hidden: true,
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Empty space',
        media: SquareIcon,
      }
    },
  },
})
