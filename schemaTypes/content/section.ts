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
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Facultatif',
    }),

    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [
        defineArrayMember({ type: 'textBlock' }),
        defineArrayMember({
          type: 'reference',
          title: 'Image',
          to: [{ type: 'media' }],
        }),
        defineArrayMember({ type: 'table' }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      content: 'content',
    },
    prepare({ title, subtitle, content }) {
      const count = Array.isArray(content) ? content.length : 0
      const items = count === 1 ? '1 élément' : `${count} éléments`

      return {
        title: title || 'Section sans titre',
        subtitle: subtitle ? `${subtitle} · ${items}` : items,
        media: BlockContentIcon,
      }
    },
  },
})
