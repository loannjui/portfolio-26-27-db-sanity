import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { PROJECT_URL_PREFIX, PrefixedSlugInput } from '../components/PrefixedSlugInput'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: `The project will be published under ${PROJECT_URL_PREFIX}<slug>`,
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
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When the project was made — only the month and year are shown',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a URL starting with http:// or https://'),
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
      title: 'Cover image — landscape',
      type: 'image',
      description: 'Horizontal format',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'coverImagePortrait',
      title: 'Cover image — portrait',
      type: 'image',
      description: 'Vertical format',
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

  orderings: [
    {
      name: 'dateDesc',
      title: 'Date, newest first',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      name: 'dateAsc',
      title: 'Date, oldest first',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      landscape: 'coverImage',
      portrait: 'coverImagePortrait',
    },
    prepare({ title, subtitle, landscape, portrait }) {
      return {
        title,
        subtitle,
        media: landscape || portrait || DocumentTextIcon,
      }
    },
  },
})
