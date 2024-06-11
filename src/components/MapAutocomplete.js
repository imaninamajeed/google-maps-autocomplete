/* global google */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addSearch, markAsFavorite } from "../store/searchSlice";
import {
	Box,
	TextField,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Checkbox,
	Typography,
	Button,
} from "@mui/material";

const MapAutocomplete = () => {
	const mapRef = useRef(null);
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const [type, setType] = useState("all");
	const [selectedPlace, setSelectedPlace] = useState(null);

	useEffect(() => {
		const initMap = () => {
			if (!mapRef.current || !inputRef.current) return;

			const map = new google.maps.Map(mapRef.current, {
				center: { lat: 40.749933, lng: -73.98633 },
				zoom: 13,
				mapTypeControl: false,
			});

			const options = {
				fields: ["formatted_address", "geometry", "name"],
				strictBounds: false,
			};

			const autocomplete = new google.maps.places.Autocomplete(
				inputRef.current,
				options
			);
			autocomplete.bindTo("bounds", map);

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
					window.alert("No details available for input: '" + place.name + "'");
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

				setSelectedPlace(place);
				dispatch(addSearch(place));
			});
		};

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places&v=weekly`;
		script.defer = true;
		script.async = true;
		window.initMap = initMap;
		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	}, [dispatch]);

	const handleTypeChange = (event) => {
		setType(event.target.value);
	};

	const handleFavoriteClick = () => {
		if (selectedPlace) {
			dispatch(markAsFavorite(selectedPlace));
		}
	};

	return (
		<Box>
			<Box>
				<FormControl component="fieldset">
					<RadioGroup
						row
						aria-label="type"
						name="type"
						value={type}
						onChange={handleTypeChange}>
						<FormControlLabel value="all" control={<Radio />} label="All" />
						<FormControlLabel
							value="establishment"
							control={<Radio />}
							label="Establishment"
						/>
						<FormControlLabel
							value="address"
							control={<Radio />}
							label="Address"
						/>
						<FormControlLabel
							value="geocode"
							control={<Radio />}
							label="Geocode"
						/>
						<FormControlLabel
							value="cities"
							control={<Radio />}
							label="Cities"
						/>
						<FormControlLabel
							value="regions"
							control={<Radio />}
							label="Regions"
						/>
					</RadioGroup>
				</FormControl>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label="Bias to map viewport"
				/>
				<FormControlLabel control={<Checkbox />} label="Strict bounds" />
			</Box>
			<TextField
				id="pac-input"
				label="Enter a location"
				variant="outlined"
				fullWidth
				inputRef={inputRef}
			/>
			<Box ref={mapRef} sx={{ height: "500px", mt: 2 }}></Box>
			<div id="infowindow-content" style={{ display: "none" }}>
				<span id="place-name" className="title"></span>
				<br />
				<span id="place-address"></span>
			</div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleFavoriteClick}
				disabled={!selectedPlace}>
				Mark as Favorite
			</Button>
		</Box>
	);
};

export default MapAutocomplete;
