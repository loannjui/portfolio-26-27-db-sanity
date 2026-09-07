import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThLargeIcon } from '@sanity/icons/ThLarge'
import { LinkIcon } from '@sanity/icons/Link'

export const table = defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  icon: ThLargeIcon,

  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),

            defineField({
              name: 'key',
              title: 'Key',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'key' },
          },
        }),
      ],
    }),

    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Text',
                      type: 'string',
                    }),

                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'reference',
                      to: [{ type: 'media' }],
                      description: 'Optional — shown in the cell alongside the text',
                    }),

                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'object',
                      icon: LinkIcon,
                      description: 'Optional — turns the text into a link',
                      options: {
                        collapsible: true,
                        collapsed: true,
                      },
                      fields: [
                        defineField({
                          name: 'reference',
                          title: 'Page or project',
                          type: 'reference',
                          to: [{ type: 'page' }, { type: 'project' }],
                        }),

                        defineField({
                          name: 'url',
                          title: 'External URL',
                          type: 'url',
                          description: 'Used only if no page or project is selected',
                          validation: Rule =>
                            Rule.uri({
                              scheme: ['http', 'https', 'mailto', 'tel'],
                            }).error('Must be a URL starting with http://, https://, mailto: or tel:'),
                        }),

                        defineField({
                          name: 'newTab',
                          title: 'Open in a new tab',
                          type: 'boolean',
                          initialValue: false,
                        }),
                      ],
                      validation: Rule =>
                        Rule.custom(link => {
                          if (link?.reference && link?.url) {
                            return 'Pick either a page or project, or an external URL — not both'
                          }

                          return true
                        }),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'value',
                      imageTitle: 'image.title',
                      media: 'image.image',
                      url: 'link.url',
                      pageSlug: 'link.reference.slug.current',
                      pageTitle: 'link.reference.title',
                    },
                    prepare({ title, imageTitle, media, url, pageSlug, pageTitle }) {
                      const target = pageSlug ? `/${pageSlug}` : url || undefined

                      return {
                        title: title || imageTitle || 'Empty cell',
                        subtitle: target ? `→ ${pageTitle || target}` : undefined,
                        media: media || (target ? LinkIcon : undefined),
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              const values = Array.isArray(cells)
                ? cells
                    .map((cell) => cell?.value || (cell?.image ? 'Image' : null))
                    .filter(Boolean)
                : []

              return {
                title: values.join(' · ') || 'Empty row',
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      columns: 'columns',
      rows: 'rows',
    },
    prepare({ columns, rows }) {
      const columnCount = Array.isArray(columns) ? columns.length : 0
      const rowCount = Array.isArray(rows) ? rows.length : 0

      return {
        title: 'Table',
        subtitle: `${columnCount} columns · ${rowCount} rows`,
        media: ThLargeIcon,
      }
    },
  },
})
