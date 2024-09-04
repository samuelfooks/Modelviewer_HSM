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
      <Box sx={sx.heading}>About</Box>
      <Group spacing={2}>
        <Box sx={sx.description}>
        This interactive tool is a demonstrator use case of the Edito-infra project ...
        </Box>
      </Group>

    </>
  )
}

export default About
