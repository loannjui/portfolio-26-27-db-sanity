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
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional',
    }),

    defineField({
      name: 'content',
      title: 'Content',
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
      const items = count === 1 ? '1 item' : `${count} items`

      return {
        title: title || 'Untitled section',
        subtitle: subtitle ? `${subtitle} · ${items}` : items,
        media: BlockContentIcon,
      }
    },
  },
})
