import BinnedSummary from './binned-summary'
import Summary from './summary'

import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import {
  averageData,
  weightedData,
  valuesToBenefit,
  valuesToCost,
  valuesToMitigationCost,
  valuesTohabitat_suitability,
} from './utils'
import { formatValue, useCustomColormap } from '../utils'

import { LABEL_MAP, NAN } from '../../constants'
import { LAYER_UNITS, SPECIES } from '../../model'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { layer, target, clim, sensitiveAreaMask } = useLayers()
  const { colormap } = useCustomColormap(layer)

  if (!data || !data.value) {
    return 'loading...'
  } else {
    const { area } = data.value.all_variables

    console.log("data display")
    console.log("area")
    console.log(data.value.all_variables)
    console.log({area})

    let values
    switch (layer) {
      case 'habitat_suitability':
        values = valuesTohabitat_suitability(
          data.value.all_variables,
          target,
          parameters,
          sensitiveAreaMask
        )
        console.log("habitat_suitability results")
        console.log(values)
        break
      case 'depth':
        values = data.value.all_variables['elevation'].map((v) =>
          v === NAN ? NAN : v * -1
        )
        break
      case 'salinity':
        values = data.value.all_variables['so_mean']
        break
      case 'temperature':
        values = data.value.all_variables['thetao_mean']
        break

      default:
        values = data.value.all_variables[layer]
        break
    }
    return (
      <BinnedSummary
        clim={clim}
        colormap={colormap}
        data={values}
        area={area}
        label={
          typeof LABEL_MAP[layer] === 'string'
            ? LABEL_MAP[layer]
            : LABEL_MAP[layer][target]
        }
        units={LAYER_UNITS[layer][target]}
      />
    )
  }
}

export default DataDisplay