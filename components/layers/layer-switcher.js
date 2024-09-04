import { useCallback, useEffect, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box, Divider } from 'theme-ui'

import { useRawUniformValues } from './context'
import { LABEL_MAP } from '../../constants'
import Info from '../info'
import Radio from '../radio'

const OUTPUT_LAYERS = ['habitat_suitability']

const INPUT_LAYERS = [
  'depth',
  'salinity',
  'temperature',
]


const filterToValue = {
  [LABEL_MAP['habitat_suitability']['SSP119']]: 'habitat_suitability',
  [LABEL_MAP['habitat_suitability']['SSP126']]: 'habitat_suitability',
  [LABEL_MAP['habitat_suitability']['SSP245']]: 'habitat_suitability',
  [LABEL_MAP['habitat_suitability']['SSP460']]: 'habitat_suitability',
  [LABEL_MAP['habitat_suitability']['SSP585']]: 'habitat_suitability',
  [LABEL_MAP['depth']]: 'depth',
  [LABEL_MAP['salinity']]: 'salinity',
  [LABEL_MAP['temperature']]: 'temperature',
}

const outputDescriptions = {
  habitat_suitability: 'Suitability of the environment',
}
const inputDescriptions = {
  input: 'test',
}

const getFilter = (layers, activeLayer, target) => {
  return layers.reduce((accum, layer) => {
    let key;
    if (LABEL_MAP[layer]) {
      key = typeof LABEL_MAP[layer] === 'string'
        ? LABEL_MAP[layer]
        : LABEL_MAP[layer][target];
    }

    if (key) {
      accum[key] = layer === activeLayer;
    }

    return accum;
  }, {});
}

const getOutputDescription = (layer, target) => {
  const description = outputDescriptions[layer]

  if (!description) {
    return 'getOutputDescription'
  } else if (typeof outputDescriptions[layer] === 'string') {
    return outputDescriptions[layer]
  } else {
    return outputDescriptions[layer][target]
  }
}

const getInputDescription = (layer, target) => {
  const description = inputDescriptions[layer]

  if (!description) {
    return 'Environmental variables'
  } else if (typeof inputDescriptions[layer] === 'string') {
    return inputDescriptions[layer]
  } else {
    return inputDescriptions[layer][target]
  }
}

const LayerSwitcher = ({ sx }) => {
  const {
    heading: sxHeading,
    label: sxLabel,
    description: sxDescription,
    ...sxProps
  } = sx
  const { layer, setLayer, setTarget, target } = useRawUniformValues()
  const [outputs, setOutputs] = useState(() =>
    getFilter(OUTPUT_LAYERS, layer, target)
  )
  const [inputs, setInputs] = useState(() =>
    getFilter(INPUT_LAYERS, layer, target)
  )

  useEffect(() => {
    setOutputs(getFilter(OUTPUT_LAYERS, layer, target))
  }, [layer, target])

  const handleOutputChange = useCallback(
    (res) => {
      const selected = Object.keys(res).find((key) => res[key])
      setOutputs(res)
      setInputs(getFilter(INPUT_LAYERS, selected, target))
      setLayer(filterToValue[selected])
    },
    [target]
  )

  const handleInputChange = useCallback(
    (res) => {
      const selected = Object.keys(res).find((key) => res[key])
      setOutputs(getFilter(OUTPUT_LAYERS, selected, target))
      setInputs(res)
      setLayer(filterToValue[selected])
    },
    [target]
  )

  return (
    <Group sx={sxProps} spacing={4}>
      <Group spacing={3}>
        <Box sx={sxDescription}>
        Select a target climate scenario.
        </Box>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Radio
              label='SSP119'
              value='SSP119'
              name='target'
              onChange={setTarget}
              checked={target === 'SSP119'}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Radio
              label='SSP245'
              value='SSP245'
              name='target'
              onChange={setTarget}
              checked={target === 'SSP245'}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Radio
              label='SSP585'
              value='SSP585'
              name='target'
              onChange={setTarget}
              checked={target === 'SSP585'}
            />
          </Box>
        </Box>
      </Group>
      
      <Divider sx={{ my: 4 }} />

      <Box sx={sxHeading}>Display</Box>
      <Box sx={{ mb: ['22px'] }}>
        <Box sx={{ ...sxLabel, display: 'inline-block' }}>Output</Box>
        <Info
          sx={{
            ...sxDescription,
            display: 'inline-block',
            position: 'relative',
            ml: ['12px'],
            top: '-1px',
          }}
          sxInner={{ pb: ['6px'] }}
        >
          <Box sx={{ mt: [-1], mb: [3] }}>
            {getOutputDescription(layer, target)}
          </Box>
        </Info>

        <Filter values={outputs} setValues={handleOutputChange} />
      </Box>

      <Box>
        <Box sx={{ ...sxLabel, display: 'inline-block' }}>Inputs</Box>
        <Info
          sx={{
            ...sxDescription,
            display: 'inline-block',
            position: 'relative',
            ml: ['12px'],
            top: '-1px',
          }}
          sxInner={{ pb: ['6px'] }}
        >
          <Box sx={{ mt: [-1], mb: [3] }}>
            {getInputDescription(layer, target)}
          </Box>
        </Info>

        <Filter values={inputs} setValues={handleInputChange} />
      </Box>
    </Group>
  )
}

export default LayerSwitcher
