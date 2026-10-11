import { defineField, defineType } from 'sanity'
import { SquareIcon } from '@sanity/icons/Square'

export const spacer = defineType({
  name: 'spacer',
  title: 'Empty space',
  type: 'object',
  icon: SquareIcon,
  description: 'Leaves an empty spot to shift the next items on desktop',

  fields: [
    defineField({
      name: 'hideOnMobile',
      title: 'Hide on mobile',
      type: 'boolean',
      description: 'When on, the empty space only exists on desktop',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      hideOnMobile: 'hideOnMobile',
    },
    prepare({ hideOnMobile }) {
      return {
        title: 'Empty space',
        subtitle: hideOnMobile === false ? 'Desktop and mobile' : 'Desktop only',
        media: SquareIcon,
      }
    },
  },
})
