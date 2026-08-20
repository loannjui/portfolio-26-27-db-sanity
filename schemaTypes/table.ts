import { defineField, defineType } from 'sanity'

export const table = defineType({
  name: 'table',
  title: 'Tableau',
  type: 'object',

  fields: [
    defineField({
      name: 'columns',
      title: 'Colonnes',
      type: 'array',
      of: [
        {
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
        },
      ],
    }),

    defineField({
      name: 'rows',
      title: 'Lignes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cellules',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Valeur',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})