import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { GrowthParameters, useLayers } from '../layers'
import Parameters from './parameters'

const OUTPUTS = ['habitat_suitability']

const ParametersSection = ({ sx }) => {
  const { layer } = useLayers()

  
  return (
    <>
      <Box sx={sx.heading}>Parameters</Box>

      {OUTPUTS.includes(layer) ? (
        <Group spacing={4}>
          <Parameters sx={sx} />
        </Group>
      ) : (
        <Group spacing={4}>
          <Parameters sx={sx} />
        </Group>
      )}
    </>
  )
}

export default ParametersSection
