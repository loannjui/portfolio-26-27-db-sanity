import { defineField, defineType } from 'sanity'

export const imgBlock = defineType({
  name: 'imageBlock',
  title: 'Bloc image',
  type: 'object',

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
})