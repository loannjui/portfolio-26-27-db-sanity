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
      title: 'Logo — mode clair',
      type: 'reference',
      to: [{ type: 'media' }],
    }),

    defineField({
      name: 'logoDark',
      title: 'Logo — mode sombre',
      type: 'reference',
      to: [{ type: 'media' }],
      description: 'Facultatif — reprend le logo clair si vide',
    }),

    defineField({
      name: 'items',
      title: 'Liens',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Lien',
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
              title: 'Libellé',
              type: 'string',
              description: 'Facultatif — reprend le titre de la page si vide',
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
                title: label || pageTitle || 'Lien sans page',
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
        subtitle: count === 1 ? '1 lien' : `${count} liens`,
        media: media || MenuIcon,
      }
    },
  },
})
