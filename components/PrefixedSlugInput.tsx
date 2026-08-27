import { Box, Card, Flex, Text } from '@sanity/ui'
import type { SlugInputProps } from 'sanity'

/** URL prefix for projects. Display only: it is not stored in the data. */
export const PROJECT_URL_PREFIX = '/projects/'

export function PrefixedSlugInput(props: SlugInputProps) {
  return (
    <Flex align="center" gap={1}>
      <Card border paddingX={2} paddingY={2} radius={2} tone="transparent">
        <Text muted size={1} style={{ whiteSpace: 'nowrap' }}>
          {PROJECT_URL_PREFIX}
        </Text>
      </Card>

      <Box flex={1}>{props.renderDefault(props)}</Box>
    </Flex>
  )
}
