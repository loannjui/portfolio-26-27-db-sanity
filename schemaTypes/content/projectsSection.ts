import { defineArrayMember, defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons/Projects'

export const projectsSection = defineType({
  name: 'projectsSection',
  title: 'Projets',
  type: 'object',
  icon: ProjectsIcon,

  fields: [
    defineField({
      name: 'projects',
      title: 'Projets',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      projects: 'projects',
    },
    prepare({ projects }) {
      const count = Array.isArray(projects) ? projects.length : 0

      return {
        title: 'Projets',
        subtitle: count === 1 ? '1 projet' : `${count} projets`,
        media: ProjectsIcon,
      }
    },
  },
})
