/* global google */
import React, { useEffect, useRef } from "react";

const MapAutocomplete = () => {
	const mapRef = useRef(null);
	const inputRef = useRef(null);

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

				if (infowindowContent) {
					infowindowContent.querySelector(".place-name").textContent =
						place.name;
					infowindowContent.querySelector(".place-address").textContent =
						place.formatted_address;
				}
				infowindow.open(map, marker);
			});

			document
				.getElementById("changetype-all")
				.addEventListener("click", () => {
					autocomplete.setTypes([]);
					inputRef.current.value = "";
				});

			document
				.getElementById("changetype-address")
				.addEventListener("click", () => {
					autocomplete.setTypes(["address"]);
					inputRef.current.value = "";
				});

			document
				.getElementById("changetype-establishment")
				.addEventListener("click", () => {
					autocomplete.setTypes(["establishment"]);
					inputRef.current.value = "";
				});

			document
				.getElementById("changetype-geocode")
				.addEventListener("click", () => {
					autocomplete.setTypes(["geocode"]);
					inputRef.current.value = "";
				});

			document
				.getElementById("changetype-cities")
				.addEventListener("click", () => {
					autocomplete.setTypes(["(cities)"]);
					inputRef.current.value = "";
				});

			document
				.getElementById("changetype-regions")
				.addEventListener("click", () => {
					autocomplete.setTypes(["(regions)"]);
					inputRef.current.value = "";
				});

			const biasInputElement = document.getElementById("use-location-bias");
			const strictBoundsInputElement =
				document.getElementById("use-strict-bounds");

			biasInputElement.addEventListener("change", () => {
				if (biasInputElement.checked) {
					autocomplete.bindTo("bounds", map);
				} else {
					autocomplete.unbind("bounds");
					autocomplete.setBounds({
						east: 180,
						west: -180,
						north: 90,
						south: -90,
					});
					strictBoundsInputElement.checked = biasInputElement.checked;
				}
				inputRef.current.value = "";
			});

			strictBoundsInputElement.addEventListener("change", () => {
				autocomplete.setOptions({
					strictBounds: strictBoundsInputElement.checked,
				});

				if (strictBoundsInputElement.checked) {
					biasInputElement.checked = strictBoundsInputElement.checked;
					autocomplete.bindTo("bounds", map);
				}

				inputRef.current.value = "";
			});
		};

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places&v=weekly`;
		script.defer = true;
		window.initMap = initMap;
		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	}, []);

	return (
		<div>
			<div className="pac-card" id="pac-card">
				<div>
					<div id="title">Autocomplete search</div>
					<div id="type-selector" className="pac-controls">
						<input
							type="radio"
							name="type"
							id="changetype-all"
							defaultChecked
						/>
						<label htmlFor="changetype-all">All</label>

						<input type="radio" name="type" id="changetype-establishment" />
						<label htmlFor="changetype-establishment">Establishment</label>

						<input type="radio" name="type" id="changetype-address" />
						<label htmlFor="changetype-address">Address</label>

						<input type="radio" name="type" id="changetype-geocode" />
						<label htmlFor="changetype-geocode">Geocode</label>

						<input type="radio" name="type" id="changetype-cities" />
						<label htmlFor="changetype-cities">Cities</label>

						<input type="radio" name="type" id="changetype-regions" />
						<label htmlFor="changetype-regions">Regions</label>
					</div>
					<br />
					<div id="strict-bounds-selector" className="pac-controls">
						<input type="checkbox" id="use-location-bias" defaultChecked />
						<label htmlFor="use-location-bias">Bias to map viewport</label>

						<input type="checkbox" id="use-strict-bounds" />
						<label htmlFor="use-strict-bounds">Strict bounds</label>
					</div>
				</div>
				<div id="pac-container">
					<input
						id="pac-input"
						ref={inputRef}
						type="text"
						placeholder="Enter a location"
					/>
				</div>
			</div>
			<div
				id="map"
				ref={mapRef}
				style={{ height: "500px", width: "100%" }}></div>
			<div id="infowindow-content" style={{ display: "none" }}>
				<span className="place-name"></span>
				<br />
				<span className="place-address"></span>
			</div>
		</div>
	);
};

export default MapAutocomplete;
