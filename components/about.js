import { Box } from 'theme-ui'
import { Group, Link, Logo, Row, Column } from '@carbonplan/components'

import { ClimateWorks, NCAR, S3, UCI } from './logos'

const logo = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  mb: 3,
}
const About = ({ sx }) => {
  return (
    <>
      <Box sx={sx.heading}>Credits</Box>
      <Group spacing={2}>
        <Box sx={sx.description}>
       
        The application makes use of technology developed by {' '}
        <Link
          href=' https://github.com/carbonplan/seaweed-farming-web'
        >
        Carbonplan.
        </Link>        
        </Box>
      </Group>

    </>
  )
}

export default About
