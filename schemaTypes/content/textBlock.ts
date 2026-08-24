import { defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons/Text'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Bloc de texte',
  type: 'object',
  icon: TextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Contenu',
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
        title: title || content || 'Bloc de texte',
        subtitle: 'Texte',
        media: TextIcon,
      }
    },
  },
})
