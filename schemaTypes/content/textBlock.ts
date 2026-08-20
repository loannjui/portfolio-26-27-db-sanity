import { defineField, defineType } from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Bloc de texte',
  type: 'object',

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
})