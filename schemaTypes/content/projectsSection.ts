import { defineArrayMember, defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons/Projects'

export const projectsSection = defineType({
  name: 'projectsSection',
  title: 'Projects',
  type: 'object',
  icon: ProjectsIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional',
    }),

    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
      validation: Rule => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      projects: 'projects',
    },
    prepare({ title, projects }) {
      const count = Array.isArray(projects) ? projects.length : 0

      return {
        title: title || 'Projects',
        subtitle: count === 1 ? '1 project' : `${count} projects`,
        media: ProjectsIcon,
      }
    },
  },
})
