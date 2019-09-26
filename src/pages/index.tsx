import React, { useState } from 'react'
import { Box, Heading, Text } from 'rebass'
import { useStaticQuery, graphql } from 'gatsby'
import { PreviewItems, Tags } from '../components'
import Layout from '../layouts'

interface Group {
  tag: string
}
interface Data {
  allMdx: {
    group: Group[]
  }
}

const query = graphql`
  query TagsQuery {
    allMdx {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

const IndexPage = ({ location }: { location: { pathname: string } }) => {
  const {
    allMdx: { group }
  }: Data = useStaticQuery(query)
  const availableTags = group.map(g => g.tag)

  let storedTags: string | null = null
  if (typeof window !== 'undefined') {
    storedTags = localStorage.getItem('selectedTags')
  }
  const startingTags = (storedTags && JSON.parse(storedTags)) || availableTags
  const [selectedTags, setSelectedTagsState] = useState<string[]>(startingTags)

  const setSelectedTags = (tags: string[]) => {
    setSelectedTagsState(tags)
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTags', JSON.stringify(tags))
    }
  }

  return (
    <Layout location={location}>
      <Box py={4}>
        <Heading fontSize={[4, 5, 6]} color="text" my={3}>
          Hello.
        </Heading>
        <Text color="muted" fontSize={[3, 4, 5]} my={3}>
          Here is some poetry. Maybe thoughts about existing in the world. Ideas about technology.
        </Text>
      </Box>

      <Tags availableTags={availableTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <PreviewItems selectedTags={selectedTags} />

      <Box as="hr" my={2} bg="hr" height="2px" sx={{ border: 'none' }} />
      <Text color="muted" fontSize={[0, 1, 2]} my={3}>
        Thanks for your time &amp; attention. Site title from e.e. cummings' <i>who are you, little i</i>.
      </Text>
    </Layout>
  )
}

export default IndexPage
