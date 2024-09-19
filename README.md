# Edito Resampling datasets

## About
This project is part of EDITO-INFRA ([Grant agreement ID: 101101473](https://doi.org/10.3030/101101473)):
- T7.3: End-to-end demonstrator for aquaculture and maritime industry

Author: Willem Boone | contact: [willem.boone@vliz.be](willem.boone@vliz.be)

## Goal
#### Summary of Demonstrator
The demonstrator use case (DUC) consists of a smartviewer that hosts a model to predict habitat suitability based on environmental living conditions. The smartviewer is based on Carbonplan its [seaweed-farming-web](https://carbonplan.org/research/seaweed-farming)/[GitHub](https://github.com/carbonplan/seaweed-farming-web).

In this demonstrator, habitat suitability is calculated using a deterministic model that uses minimum and maximum thresholds on the environmental variables.
 The environmental parameters that are used are: 

- Sea surface temperature
- Sea surface salinity
- Bathymetry

The thresholds for all variables can be adopted using slider widgets. On any changing parameter, the suitability map is updated and rendered in the viewer. Using a time slider, environmental parameters for several future climate scenarios can be accessed and converted in suitability maps.
This work is available on this [GitHub page](https://github.com/willem0boone/Edito_model_viewer). 

#### Data formatting
The environmental variable dataset used by the smartviewer, need to be provided in a specific format. To create this dataset, different sources and storage from Edito data lake are used. Two pipelines were required: 
- Downscaling large .zarr datasets to lower resolution. E.g. the bathymetry dataset is around 20GB, which is to large for the demonstrator purpose.
- Creating pyramids in which each level has increasing resolution (for optimal zooming/rendering).

This work is available on this [GitHub page](https://github.com/willem0boone/Edito_resampling_datasets)

## Building the site

Assuming you already have `Node.js` installed, you can install the build dependencies as:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

and then visit `http://localhost:5002/model_viewer/habitat_suitability` in your browser.

## Simulating Habitat Suitability

### Environmental living conditions
Each environmental variable has 5 settings (sliders) that can be adjusted to user requirements / species characteristics. Four of them are related to the living preferences and limitations of the species and are described in this table:  


| Environmental value				| Situation 					| habitat suitability 		|
|-------					|-----						|------------			|
|                     .  < critical minimum  	| The species cannot survive 			| 0	   			|
| critical minimum <  .  < optimal minimum   	| Not optimal but the species can survive  	| value between 0-1 (linear) 	|
| optimal minimum  <  .  < optimal maximum	| Optimal living conditions  			| 1     			|
| optimal maximum  <  .  < critical maximum	| Not optimal but the species can survive  	| value between 1-0 (linear)   	|
| critical maximum <  . 			| The species cannot survive 			| 0     			|

The fifth slider serves to adjust the importance of this variable in the simulation.

### Habitat suitability

<!-- 
Index \( i \) represent each environmental variable in the habitat suitability model.

```math
\text{Habitat suitability} = \frac{\sum_{i=1}^{n} \left( W_i \cdot S_i \right)}{\sum_{i=1}^{n} W_i}
\\

\text{with:}

\begin{align*}
W_i & \text{ is the weight for environmental variable } i,\\
S_i & \text{ is the suitability score for environmental variable } i,\\
n & \text{ is the number of } i \text{ environmental variables ranging: }[1:n].
\end{align*}
```
 -->
 
 Habitat suitability is calculated as the weighted average of suitability per environmental variables. Each environmental variable has:
- The **weight** (W) representing its importance.
- A **suitability score** (S) indicating how suitable that variable is.

#### Formula
Habitat suitability is the total sum of the products of weights and suitability scores for all environmental variables, divided by the total sum of the weights.
- Multiply each environmental variable's weight by its corresponding suitability score.
- Add these values together to get the **numerator**.
- Then, sum up all the weights to get the **denominator**.
- Finally, divide the numerator by the denominator to calculate the habitat suitability.

#### Variables
- **W** = Weight of each environmental variable (how important it is).
- **S** = Suitability score of each environmental variable (how suitable it is).
- **n** = The number of environmental variables considered.

### Presets
The simulation is preconfigured for 3 species which can be selected using checkboxes.


<<some reference to Rutendo/Ward: source of presets>>


### Simulating the future
For future predictions, 3 Shared Socioeconomic Pathways can be selected. Using the time slider, the situation in 2010, 2050 and 2090 can be simulated. In these future simulations, sea surface salinity & sea surface temperature are subject to change, while bathymetry is considered static.

 
| [SSP](https://en.wikipedia.org/wiki/Shared_Socioeconomic_Pathways) 	|  Scenario 															|
|-------   								|-----------------														|
| SSP119  								| Very low GHG emissions:CO2 emissions cut to net zero around 2050. 								|
| SSP245   								| Intermediate GHG emissions: CO2 emissions around current levels until 2050, then falling but not reaching net zero by 2100.    |
| SSP585   								| Very high GHG emissions: CO2 emissions triple by 2075.    									|

## Credits
This work is based on Carbonplan their seaweed-farming-web: [app](https://carbonplan.org/research/seaweed-farming) | [GitHub](https://github.com/carbonplan/seaweed-farming-web). 
