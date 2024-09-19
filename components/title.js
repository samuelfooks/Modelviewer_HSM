import { useRef } from 'react'
import { useColorMode } from 'theme-ui'

import { Box } from 'theme-ui'
import { Column, Link, Row } from '@carbonplan/components'

const Title = ({ expanded, setExpanded }) => {
  const hasExpanded = useRef(false)
  const [colorMode] = useColorMode()

  hasExpanded.current ||= expanded

  return (
    <Box
      sx={{
        display: [
          hasExpanded.current ? 'none' : 'inherit',
          hasExpanded.current ? 'none' : 'inherit',
          'inherit',
          'inherit',
        ],
      }}
    >
      <Row>
        <Column start={[1, 2, 7, 7]} width={[5, 5, 5, 5]}>
          <Box
            sx={{
              mt: [9],
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s',
              position: 'relative',
              display: 'block',
              zIndex: 1001,
              fontSize: [6, 7, 7, 8],
              letterSpacing: 'heading',
              fontFamily: 'heading',
              lineHeight: 'heading',
              pointerEvents: 'none',
              userSelect: 'none',
              textShadow: `0px 0px 20px ${
                colorMode === 'dark' || !colorMode ? 'black' : 'white'
              }`,
            }}
          >
            Mapping habitat suitability
          </Box>
          <Box
            sx={{
              mt: [3],
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s',
              position: 'relative',
              display: 'block',
              zIndex: 1001,
              fontSize: [2, 3, 3, 4],
              pointerEvents: 'none',
              userSelect: 'none',
              textShadow: `0px 0px 20px ${
                colorMode === 'dark' || !colorMode ? 'black' : 'white'
              }`,
            }}
          >
            Demonstrator of Edito-infra project. Read the{' '}
            <Link
              href='https://github.com/willem0boone/Edito_model_viewer'
              sx={{ pointerEvents: expanded ? 'none' : 'all' }}
            >
            paper
            </Link>{' '}
            and the{' '} 

            <Link
              href='https://github.com/willem0boone/Edito_model_viewer'
              sx={{ pointerEvents: expanded ? 'none' : 'all' }}
            >
            explaining article.
  
            </Link>
            This application makes use of technology developed by {' '}
            <Link
              href=' https://github.com/carbonplan/seaweed-farming-web'
            >
            Carbonplan.
            </Link>   
          </Box>
        </Column>
      </Row>
    </Box>
  )
}

export default Title
