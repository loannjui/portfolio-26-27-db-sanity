import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThLargeIcon } from '@sanity/icons/ThLarge'

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
                      title: 'Value',
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
