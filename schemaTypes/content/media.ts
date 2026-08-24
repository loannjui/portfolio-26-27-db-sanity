import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const media = defineType({
  name: 'media',
  title: 'Image',
  type: 'document',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Nom',
      type: 'string',
      description: 'Sert à retrouver l’image dans la liste, pas affiché sur le site',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: 'Décrit l’image pour les lecteurs d’écran et si l’image ne charge pas',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
      description: 'Facultatif — texte affiché sous l’image',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'image',
    },
    prepare({ title, subtitle, media: image }) {
      return {
        title: title || 'Image',
        subtitle,
        media: image || ImageIcon,
      }
    },
  },
})
