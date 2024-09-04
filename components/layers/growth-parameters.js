import { Box, Checkbox, Label } from 'theme-ui'
import { Group } from '@carbonplan/components'
import Info from '../info'

import { useRawUniformValues } from './context'

const sxCheckbox = (checked) => {
  return {
    mt: ['-3px', '-3px', '-3px', '-1px'],
    cursor: 'pointer',
    color: 'muted',
    transition: 'color 0.15s',
    'input:active ~ &': { bg: 'background', color: 'primary' },
    'input:focus ~ &': {
      bg: 'background',
      color: checked ? 'primary' : 'muted',
    },
    'input:hover ~ &': { bg: 'background', color: 'primary' },
    'input:focus-visible ~ &': {
      outline: 'dashed 1px rgb(110, 110, 110, 0.625)',
      background: 'rgb(110, 110, 110, 0.625)',
    },
  }
}

const sxLabel = {
  fontFamily: 'mono',
  letterSpacing: 'mono',
  fontSize: [1, 1, 1, 2],
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const GrowthParameters = ({ sx }) => {
  const {
    // growthModel,
    // setGrowthModel,
    sensitiveAreaMask,
    setSensitiveAreaMask,
  } = useRawUniformValues()

  return (
    <Group spacing={4}>

    </Group>
  )
}

export default GrowthParameters
