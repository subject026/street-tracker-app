import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { 
	Attribution,
	ScaleLine,
	ZoomSlider,
	Zoom,
	Rotate,
	MousePosition,
	OverviewMap,
	defaults as DefaultControls
} from 'ol/control'
import * as olEvents from 'ol/events';

const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: DefaultControls().extend([
				new MousePosition()
			]),
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		// mapObject.addEventListener.register("touchstart", event => {
		// 	console.log(event)
		// })
		setMap(mapObject);
		console.log(olEvents)
		return () => mapObject.setTarget(undefined);
	}, [center, zoom]);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [map, zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center, map])

	const handleMapClick = event => {
		console.log(map)
		console.log(event)
	}



	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map" onClick={handleMapClick}>
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;