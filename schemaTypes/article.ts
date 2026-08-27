import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { ARTICLE_URL_PREFIX, PrefixedSlugInput } from '../components/PrefixedSlugInput'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,

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
      description: `L'article sera publié sous ${ARTICLE_URL_PREFIX}<slug>`,
      components: {
        input: PrefixedSlugInput,
      },
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input =>
          input
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
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
      name: 'externalUrl',
      title: 'URL externe',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Doit être une URL commençant par http:// ou https://'),
    }),

    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      validation: Rule => Rule.unique(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({ type: 'section' })],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'coverImage',
    },
  },
})
