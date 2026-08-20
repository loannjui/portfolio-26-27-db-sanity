import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'imageBlock' },
        { type: 'table' },
      ],
    }),
  ],
})