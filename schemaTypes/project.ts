import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {PROJECT_URL_PREFIX, PrefixedSlugInput} from '../components/PrefixedSlugInput'

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
      validation: (Rule) => Rule.required(),
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
        slugify: (input) =>
          input
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description:
        'When the project was made (or started, if it has an end date) — only the month and year are shown',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Optional — for projects spanning several months or years',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.document as {date?: string} | undefined)?.date
          if (!endDate || !startDate) return true
          return endDate >= startDate ? true : 'The end date must be after the start date'
        }),
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a URL starting with http:// or https://'),
    }),

    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Website', 'Graphic design', 'Motion', 'UI/UX Design'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((value) => (value?.asset ? true : 'A cover image is required')),
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({type: 'section'})],
    }),
  ],

  orderings: [
    {
      name: 'dateDesc',
      title: 'Date, newest first',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      name: 'dateAsc',
      title: 'Date, oldest first',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'coverImage',
    },
  },
})
