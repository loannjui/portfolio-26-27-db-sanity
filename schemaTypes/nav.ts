import { defineArrayMember, defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons/Menu'
import { LinkIcon } from '@sanity/icons/Link'

export const nav = defineType({
  name: 'nav',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,

  fields: [
    defineField({
      name: 'logo',
      title: 'Logo — light mode',
      type: 'reference',
      to: [{ type: 'media' }],
    }),

    defineField({
      name: 'logoDark',
      title: 'Logo — dark mode',
      type: 'reference',
      to: [{ type: 'media' }],
      description: 'Optional — falls back to the light logo if empty',
    }),

    defineField({
      name: 'items',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Link',
          icon: LinkIcon,

          fields: [
            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Optional — falls back to the page title if empty',
            }),
          ],

          preview: {
            select: {
              label: 'label',
              pageTitle: 'page.title',
              slug: 'page.slug.current',
            },
            prepare({ label, pageTitle, slug }) {
              return {
                title: label || pageTitle || 'Link without a page',
                subtitle: slug ? `/${slug}` : undefined,
                media: LinkIcon,
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      items: 'items',
      media: 'logo.image',
    },
    prepare({ items, media }) {
      const count = Array.isArray(items) ? items.length : 0

      return {
        title: 'Navigation',
        subtitle: count === 1 ? '1 link' : `${count} links`,
        media: media || MenuIcon,
      }
    },
  },
})
