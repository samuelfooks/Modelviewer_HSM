import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { LAYER_UNIFORMS } from '../../model'
import { COLORMAPS_MAP } from '../../constants'

const LayersContext = createContext(null)

const INITIAL_CLIMS = Object.entries(COLORMAPS_MAP).reduce((a, d) => {
  a[d[0]] = d[1].clim
  return a
}, {})

export const LayersProvider = ({ children }) => {
  const [layer, setLayer] = useState('habitat_suitability')
  const [target, setTarget] = useState('SSP245')
  const [sensitiveAreaMask, setSensitiveAreaMask] = useState(0)
  const [clims, setClims] = useState(INITIAL_CLIMS)

  const resetLayers = useCallback(() => {
    setLayer('habitat_suitability')
    setTarget('SSP245')
    setSensitiveAreaMask(0)
    setClims(INITIAL_CLIMS)
  }, [])

  return (
    <LayersContext.Provider
      value={{
        layer,
        setLayer,
        target,
        setTarget,
        sensitiveAreaMask,
        setSensitiveAreaMask,
        clims,
        setClims,
        resetLayers,
      }}
    >
      {children}
    </LayersContext.Provider>
  )
}

export const useRawUniformValues = () => {
  const value = useContext(LayersContext)
  return value
}

export const useLayers = () => {
  const { layer, target, clims, setClims, resetLayers, sensitiveAreaMask } =
    useRawUniformValues()

  const layerUniforms = useMemo(
    () =>
      Object.keys(LAYER_UNIFORMS).reduce((uniforms, l) => {
        const uniformName = LAYER_UNIFORMS[l]
        uniforms[uniformName] = layer === l ? 1 : 0
        return uniforms
      }, {}),
    [layer]
  )

  const uniforms = {
    ...layerUniforms,
    sensitiveAreaMask,
    SSP119: target === 'SSP119' ? 1 : 0,
    SSP245: target === 'SSP245' ? 1 : 0,
    SSP585: target === 'SSP585' ? 1 : 0,
  }

  return {
    layer,
    clim: clims[layer],
    setClim: (value) => setClims((prev) => ({ ...prev, [layer]: value })),
    uniforms,
    target,
    sensitiveAreaMask,
    resetLayers,
  }
}
