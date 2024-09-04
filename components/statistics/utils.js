import { NAN } from '../../constants'

import {evaluateSuitability} from '../../model'

export const averageData = (data, area) => {
  const totalArea = area
    .filter((a, i) => a !== NAN && data[i] !== NAN)
    .reduce((accum, a) => a + accum, 0)

  return data.reduce((a, d, i) => {
    const dArea = area[i]
    if (d === NAN || dArea === NAN) {
      return a
    } else {
      const areaWeight = dArea / totalArea
      return a + d * areaWeight
    }
  }, 0)
}

export const weightedData = (data, area) => {
  const totalArea = area
    .filter((a, i) => a !== NAN && data[i] !== NAN)
    .reduce((accum, a) => a + accum, 0)

  return data.reduce((a, d, i) => {
    const dArea = area[i]
    if (d === NAN || dArea === NAN) {
      return a
    } else {
      a[d] = a[d] || 0
      a[d] += dArea / totalArea
      return a
    }
  }, {})
}

const isMasked = (
  { seaweed_dw, sensitive_areas, d2sink },
  sensitiveAreaMask,
  target
) => {
  return false
}

export const valuesTohabitat_suitability = (values, target, parameters, sensitiveAreaMask) => {
  return values.elevation.reduce((accum, _, i) => {
    const suitability = evaluateSuitability(
      target,
      {
        elevation: -1.0 * values.elevation[i],
        temperature: values.thetao_mean[i],  
        salinity: values.so_mean[i] 
      },
      parameters
    );

    accum.push(suitability);
    return accum;
  }, []);
}

/*
export const valuesTohabitat_suitability = (values, target, parameters, sensitiveAreaMask) => {
  return values.harv_preferred.reduce((accum, _, i) => {
    const seaweed_dw = values.harv_preferred[i]
    const sensitive_areas = values.sensitive_areas[i]
    const d2sink = values.d2sink[i]

    const habitat_suitability = evaluateSuitability(
      target,
      {
        depth: -1.0 * values.elevation[i],
        d2p: values.d2p[i],
        wave_height: values.wave_height[i],
      },
      parameters
    )

    accum.push(habitat_suitability)
    return accum
  }, [])
}
*/