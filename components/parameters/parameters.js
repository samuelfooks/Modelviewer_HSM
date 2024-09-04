import { Box } from 'theme-ui'
import { useMemo } from 'react'
import { Group } from '@carbonplan/components'

import { LAYER_PARAMETERS, PARAMETERS } from '../../model'
import Parameter from './parameter'
import ParameterPresets from './parameter-presets'
import { useParameters } from './context'
import { useLayers } from '../layers'

const Parameters = ({ sx }) => {
  const {
    heading: sxHeading,
    description: sxDescription,
    label: sxLabel,
    ...sxProps
  } = sx

  const { setParameters, ...parameters } = useParameters()
  const { target, layer } = useLayers()

  const active = useMemo(() => {
    if (!LAYER_PARAMETERS[layer]) {
      return []
    }
    let result = LAYER_PARAMETERS[layer][target].concat(
      LAYER_PARAMETERS[layer].env_par
    )
    return result
  }, [target, layer])

 
  if (layer === 'habitat_suitability'){
    return (
      <Box sx={sxProps}>
        <Group spacing={4}>
          <ParameterPresets target={target} sx={sx} />
          <Box>
            {active.map((id) => (
              <Parameter
                key={id}
                value={parameters[id]}
                setValue={setParameters}
                sx={sxLabel}
                {...PARAMETERS[id]}
              />
            ))}
          </Box>
        </Group>
      </Box>
    )
  }
  else{
    return (
      <Box sx={sxProps}>
      <Group spacing={4}>
        
        <Box>
          {active.map((id) => (
            <Parameter
              key={id}
              value={parameters[id]}
              setValue={setParameters}
              sx={sxLabel}
              {...PARAMETERS[id]}
            />
          ))}
        </Box>
      </Group>
    </Box>
    )
  }
}

export default Parameters
