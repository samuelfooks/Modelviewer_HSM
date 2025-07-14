import { Box, Container } from 'theme-ui'
import Head from 'next/head'
import {
  Logo,
  Dimmer,
  Meta,
  Guide,
  Header as HeaderComponent,
  Settings,
} from '@carbonplan/components'

const Header = ({ expanded, setExpanded }) => {
  return (
    <>
      <Head>
        <title>Model viewer</title>
      </Head>

      <Container>
        <Guide color='teal' />
      </Container>
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 5000,
        }}
      >
        <Box
          as='header'
          sx={{
            width: '100%',
            borderWidth: 0,
            borderStyle: ['solid', 'solid', 'none', 'none'],
            borderColor: ['muted', 'muted', 'unset', 'unset'],
            borderBottomWidth: ['1px', '1px', 'unset', 'unset'],
            bg: ['background', 'background', 'unset', 'unset'],
            position: 'sticky',
            top: 0,
            height: '56px',
            zIndex: 2000,
          }}
        >
          <Container>
            {/* Optionally add HeaderComponent or Settings here if needed */}
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Header
