import { defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons/Text'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  icon: TextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      return {
        title: title || content || 'Text block',
        subtitle: 'Text',
        media: TextIcon,
      }
    },
  },
})
