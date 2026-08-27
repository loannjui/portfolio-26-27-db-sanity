import type { StructureResolver } from 'sanity/structure'

/** Projects are listed newest first; every other type keeps the default list. */
export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items(
      S.documentTypeListItems().map(listItem =>
        listItem.getId() === 'project'
          ? listItem.child(
              S.documentTypeList('project')
                .title('Project')
                .defaultOrdering([{ field: 'date', direction: 'desc' }]),
            )
          : listItem,
      ),
    )
