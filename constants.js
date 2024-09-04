export const NAN = 9.969209968386869e36

export const COLORMAPS_MAP = {
  habitat_suitability: { clim: [0, 1], step: 0.01, colormapName: 'cool' },
  depth: { clim: [0, 4000], step: 10, colormapName: 'cool' },
  salinity: { clim: [0, 40], step: 0.5, colormapName: 'cool' },
  temperature: { clim: [0, 25], step: 0.5, colormapName: 'cool' },
}

export const LABEL_MAP = {

  habitat_suitability:{
    SSP119: 'habitat suitability',
    SSP245: 'habitat suitability',
    SSP585: 'habitat suitability',
  },
  depth: 'Bathymetry (depth)',
  salinity: 'Sea Surface Salinity',
  temperature: 'Sea Surface Temperature',
}

