/* global google */
import React, { useEffect, useRef, useState } from "react"; // Import React and hooks
import { useDispatch } from "react-redux"; // Import Redux dispatch
import { addSearch } from "../store/searchSlice"; // Import actions
import { Box, TextField, Button } from "@mui/material"; // Import Material-UI components

const MapAutocomplete = () => {
	const mapRef = useRef(null); // Reference for map container
	const inputRef = useRef(null); // Reference for input field
	const dispatch = useDispatch(); // Redux dispatch function
	const [selectedPlace, setSelectedPlace] = useState(null); // State for selected place

	useEffect(() => {
		const initMap = () => {
			if (!mapRef.current || !inputRef.current) return;

			const map = new google.maps.Map(mapRef.current, {
				center: { lat: 40.749933, lng: -73.98633 }, // Map center
				zoom: 13, // Initial zoom level
				mapTypeControl: false,
			});

			const options = {
				fields: ["formatted_address", "geometry", "name"], // Autocomplete fields
				strictBounds: false,
			};

			const autocomplete = new google.maps.places.Autocomplete(
				inputRef.current,
				options
			);
			autocomplete.bindTo("bounds", map); // Bind autocomplete to map

			const infowindow = new google.maps.InfoWindow();
			const infowindowContent = document.getElementById("infowindow-content");
			infowindow.setContent(infowindowContent);

			const marker = new google.maps.Marker({
				map,
				anchorPoint: new google.maps.Point(0, -29),
			});

			autocomplete.addListener("place_changed", () => {
				infowindow.close();
				marker.setVisible(false);

				const place = autocomplete.getPlace();

				if (!place.geometry || !place.geometry.location) {
					alert("No details available for input: '" + place.name + "'");
					return;
				}

				if (place.geometry.viewport) {
					map.fitBounds(place.geometry.viewport);
				} else {
					map.setCenter(place.geometry.location);
					map.setZoom(17);
				}

				marker.setPosition(place.geometry.location);
				marker.setVisible(true);

				infowindowContent.children["place-name"].textContent = place.name;
				infowindowContent.children["place-address"].textContent =
					place.formatted_address;
				infowindow.open(map, marker);

				setSelectedPlace(place); // Update selected place state
				dispatch(addSearch(place)); // Dispatch addSearch action
			});
		};

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places&v=weekly`;
		script.defer = true;
		script.async = true;
		window.initMap = initMap;
		document.head.appendChild(script);

		return () => {
			script.remove(); // Cleanup script on unmount
		};
	}, [dispatch]); // Effect dependency

	return (
		<Box>
			<TextField
				id="pac-input"
				label="Enter a location"
				variant="outlined"
				fullWidth
				inputRef={inputRef}
			/>
			<Box ref={mapRef} sx={{ height: "500px", mt: 2 }}></Box>
			<div id="infowindow-content" style={{ display: "inline" }}>
				<span id="place-name" className="title"></span>
				<br />
				<span id="place-address"></span>
			</div>
			<Button
				variant="contained"
				color="primary"
				// onClick={handleFavoriteClick}
				disabled={!selectedPlace}>
				Mark as Favorite
			</Button>
		</Box>
	);
};

export default MapAutocomplete; // Export component
