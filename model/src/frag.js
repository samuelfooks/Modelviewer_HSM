import {
  LAYER_UNIFORMS,
} from './constants'

const defaultLayers = Object.keys(LAYER_UNIFORMS)
  .filter((l) => !['habitat_suitability'].includes(l))
  .map(
    (l) => `
    if (${LAYER_UNIFORMS[l]} == 1.0) {
      value = ${l};
    }
  `
  )
  .join('')

const frag = `

float value;

// invert depth
float depth = elevation == 9.969209968386869e36? 9.969209968386869e36:-1.0 * elevation;
float salinity;
float temperature;
float time = time;

//---------------------------------------------------------------------------------


if (time == 2010.0) {
    // Handle the case for 2010
    salinity = SALINITY_baseline_2010;
    temperature = SST_baseline_2010;
} 
else if (time == 2050.0 && SSP119 == 1.0) {
    salinity = SALINITY_SSP119_2050;
    temperature = SST_SSP119_2050;
} 
else if (time == 2050.0 && SSP245 == 1.0) {
    salinity = SALINITY_SSP245_2050;
    temperature = SST_SSP245_2050;
} 
else if (time == 2050.0 && SSP585 == 1.0) {
    salinity = SALINITY_SSP585_2050;
    temperature = SST_SSP585_2050;
} 
else if (time == 2090.0 && SSP119 == 1.0) {
    salinity = SALINITY_SSP119_2090;
    temperature = SST_SSP119_2090;
} 
else if (time == 2090.0 && SSP245 == 1.0) {
    salinity = SALINITY_SSP245_2090;
    temperature = SST_SSP245_2090;
} 
else if (time == 2090.0 && SSP585 == 1.0) {
    salinity = SALINITY_SSP585_2090;
    temperature = SST_SSP585_2090;
} 
else {
    salinity = 0.0;
    temperature = 0.0;
}

${defaultLayers}

if (habitat_suitabilityLayer == 1.0) {
  // ---------------------------------------------
  // GET PARAMETERS & CHECK VALIDITY
  // ---------------------------------------------

  float extMin_b = extMin_b;
  float optMin_b = optMin_b;
  float optMax_b = optMax_b;
  float extMax_b = extMax_b;

  float extMin_s = extMin_s;
  float optMin_s = optMin_s;
  float optMax_s = optMax_s;
  float extMax_s = extMax_s;

  float extMin_t = extMin_t;
  float optMin_t = optMin_t;
  float optMax_t = optMax_t;
  float extMax_t = extMax_t;

  bool valid_b = (extMin_b <= optMin_b) && (optMin_b <= optMax_b) && (optMax_b <= extMax_b);
  bool valid_s = (extMin_s <= optMin_s) && (optMin_s <= optMax_s) && (optMax_s <= extMax_s);
  bool valid_t = (extMin_t <= optMin_t) && (optMin_t <= optMax_t) && (optMax_t <= extMax_t);

  if (valid_b && valid_s && valid_t){
    // ---------------------------------------------
    // BATHYMETRY
    // ---------------------------------------------

    float slopeUp_b = (1.0 - 0.0) / (optMin_b - extMin_b);
    float slopeDwn_b = (0.0 - 1.0) / (extMax_b - optMax_b);
    float interceptUp_b = 0.0 - (slopeUp_b * extMin_b);
    float interceptDwn_b = 0.0 - (slopeDwn_b * extMax_b);

    float betweenExtMinAndoptMin_b  = extMin_b < depth &&  depth < optMin_b? (slopeUp_b * depth) + interceptUp_b : 0.0;
    float betweenoptMinAndoptMax_b = optMin_b < depth &&  depth < optMax_b? 1.0 : 0.0;
    float betweenoptMaxAndExtMax_b  = optMax_b < depth &&  depth < extMax_b? (slopeDwn_b * depth) + interceptDwn_b : 0.0;

    float suitability_b = (betweenExtMinAndoptMin_b + betweenoptMinAndoptMax_b + betweenoptMaxAndExtMax_b);

    // ---------------------------------------------
    // SALINITY
    // ---------------------------------------------

    float slopeUp_s = (1.0 - 0.0) / (optMin_s - extMin_s);
    float slopeDwn_s = (0.0 - 1.0) / (extMax_s - optMax_s);
    float interceptUp_s = 0.0 - (slopeUp_s * extMin_s);
    float interceptDwn_s = 0.0 - (slopeDwn_s * extMax_s);

    float betweenExtMinAndoptMin_s  = extMin_s < salinity &&  salinity < optMin_s? (slopeUp_s * salinity) + interceptUp_s : 0.0;
    float betweenoptMinAndoptMax_s = optMin_s < salinity &&  salinity < optMax_s? 1.0 : 0.0;
    float betweenoptMaxAndExtMax_s  = optMax_s < salinity &&  salinity < extMax_s? (slopeDwn_s * salinity) + interceptDwn_s : 0.0;

    float suitability_s = (betweenExtMinAndoptMin_s + betweenoptMinAndoptMax_s + betweenoptMaxAndExtMax_s);

    // ---------------------------------------------
    // TEMPERATURE
    // ---------------------------------------------

    float slopeUp_t = (1.0 - 0.0) / (optMin_t - extMin_t);
    float slopeDwn_t = (0.0 - 1.0) / (extMax_t - optMax_t);
    float interceptUp_t = 0.0 - (slopeUp_t * extMin_t);
    float interceptDwn_t = 0.0 - (slopeDwn_t * extMax_t);

    float betweenExtMinAndoptMin_t  = extMin_t < temperature &&  temperature < optMin_t? (slopeUp_t * temperature) + interceptUp_t : 0.0;
    float betweenoptMinAndoptMax_t = optMin_t < temperature &&  temperature < optMax_t? 1.0 : 0.0;
    float betweenoptMaxAndExtMax_t  = optMax_t < temperature &&  temperature < extMax_t? (slopeDwn_t * temperature) + interceptDwn_t : 0.0;

    float suitability_t = (betweenExtMinAndoptMin_t + betweenoptMinAndoptMax_t + betweenoptMaxAndExtMax_t);
    
    // ---------------------------------------------
    // TOTAL SUITABILITY
    // ---------------------------------------------

    // convert importances to weights
    float total_weights = weight_b + weight_t + weight_s;
    float weight_b = weight_b / total_weights;
    float weight_t = weight_t / total_weights;
    float weight_s = weight_s / total_weights;


    //if (suitability_b == 0.0  && weight_b > 0.0){
    //  value = 0.0;
    //}
    //else if (suitability_s == 0.0  && weight_s > 0.0){
    //  value = 0.0;
    //}
    //else if (suitability_t == 0.0  && weight_t > 0.0){
    // value = 0.0;
    //}
    //else {
    //    value = (weight_b * suitability_b) + (weight_s * suitability_s) + (weight_t * suitability_t);
    //  }
    value = (weight_b * suitability_b) + (weight_s * suitability_s) + (weight_t * suitability_t);
  }
  value = depth == 9.969209968386869e36? 9.969209968386869e36: value;
}

if (value == fillValue) {
  gl_FragColor = vec4(empty, empty, empty, opacity);
  gl_FragColor.rgb *= gl_FragColor.a;
  return;
}

// transform for display
float rescaled = (value - clim.x)/(clim.y - clim.x);
vec4 c = texture2D(colormap, vec2(rescaled, 1.0));
gl_FragColor = vec4(c.x, c.y, c.z, opacity);
gl_FragColor.rgb *= gl_FragColor.a;
`

export default frag
