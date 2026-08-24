import { defineArrayMember, defineField, defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons/BlockContent'

export const section = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  icon: BlockContentIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [
        defineArrayMember({ type: 'textBlock' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'table' }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      const count = Array.isArray(content) ? content.length : 0

      return {
        title: title || 'Section sans titre',
        subtitle: count === 1 ? '1 élément' : `${count} éléments`,
        media: BlockContentIcon,
      }
    },
  },
})
