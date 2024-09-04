import { Group } from '@carbonplan/components'
import { useMemo } from 'react'
import { Box, Checkbox, Label } from 'theme-ui'

import Info from '../info'
import { PARAMETERS } from '../../model'
import { useParameters } from './context'

const OUTLOOKS = [
  { id: 'herring', label: 'Atlantic herring' },
  { id: 'mackerel', label: 'Atlantic mackerel'},
  { id: 'seabass', label: 'European Seabass' },
]

const sx = {
  checkbox: (checked) => {
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
  },
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    fontSize: [1, 1, 1, 2],
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
}

const ParameterPresets = ({ target, sx: sxProp }) => {
  const { presets, setPresets, ...values } = useParameters()

  const { outlook, product } = useMemo(() => {
    return Object.keys(PARAMETERS).every((k) => {
      const outlookPreset = PARAMETERS[k].presets[presets.outlook]
      const value =
        typeof outlookPreset === 'number'
          ? outlookPreset
          : outlookPreset[presets.product]
      return value === values[k]
    })
      ? presets
      : {}
  }, [presets.outlook, presets.product, ...Object.values(values)])
  
  return (
    <Group spacing={4}>
      <Box>
        <Box sx={{ ...sxProp.label, mt: ['6px'], mb: ['14px'] }}>
          Preset Species
          <Info
            sx={{
              display: 'inline-block',
              ml: ['12px'],
            }}
            sxInner={{ pb: [3] }}
          >
            Set predefined parameters for well-known species.
          </Info>
        </Box>
        <Group direction='horizontal' spacing='md'>
          {OUTLOOKS.map(({ id, label }) => {
            return (
              <Label key={label} sx={sx.label}>
                <Checkbox
                  sx={sx.checkbox(id === outlook)}
                  label={label}
                  value={id}
                  name='defaultOutlook'
                  onChange={() =>
                    product
                      ? setPresets({ outlook: id })
                      : setPresets({
                          outlook: id,
                          product: id === 'optimistic' ? 'food' : 'fuels',
                        })
                  }
                  checked={id === outlook}
                />
                {label}
              </Label>
            )
          })}
        </Group>
      </Box>      
    </Group>
  )
}

export default ParameterPresets
