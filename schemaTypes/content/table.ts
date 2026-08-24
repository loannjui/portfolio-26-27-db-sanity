import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThLargeIcon } from '@sanity/icons/ThLarge'

export const table = defineType({
  name: 'table',
  title: 'Tableau',
  type: 'object',
  icon: ThLargeIcon,

  fields: [
    defineField({
      name: 'columns',
      title: 'Colonnes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
            }),

            defineField({
              name: 'key',
              title: 'Clé',
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
      title: 'Lignes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cellules',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Valeur',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: { title: 'value' },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              const values = Array.isArray(cells)
                ? cells.map((cell) => cell?.value).filter(Boolean)
                : []

              return {
                title: values.join(' · ') || 'Ligne vide',
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
        title: 'Tableau',
        subtitle: `${columnCount} colonnes · ${rowCount} lignes`,
        media: ThLargeIcon,
      }
    },
  },
})
