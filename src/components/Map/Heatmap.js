import React, { useEffect } from 'react'
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { useSelector } from "react-redux";


const Heatmap = () => {
  const chosenPoints = useSelector((state) => {
	const initialValue = state.map.sortedChosenObjects
	const chosenToFrom = [state.map.from, state.map.to] 

	var count = 1
	var newArray = []
	initialValue.slice().reverse().forEach(element => {
		const newElement = {
			"_id": element._id,
			"address": element.address,
			"type": element.type,
			"district": element.district,
			"adminstrativeDistrict": element.adminstrativeDistrict,
			"model": element.model,
			"rating": element.rating,
			"intensity": count,
			"geometry": {
				"type": element.geometry.type,
				"coordinates": element.geometry.coordinates
			}
		}
		count ++
		if((element.rating > chosenToFrom[0]) && (element.rating < chosenToFrom[1])){
			newArray.push(newElement)
		}
	})
	console.log('bad', newArray)
	return newArray
	})


  return (
	<HeatmapLayer
	fitBoundsOnLoad
	points={chosenPoints}
	longitudeExtractor={(m) => m.geometry.coordinates[0]}
	latitudeExtractor={(m) => m.geometry.coordinates[1]}
	intensityExtractor={(m) => parseFloat(m.intensity)}
	minOpacity={.4}
	/>
  )
}

export default Heatmap