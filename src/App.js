import React from "react"; // Import React library; to build UI
import { Provider } from "react-redux"; // Import Provider for Redux store access
import store from "./store"; // Import Redux store
import MapAutocomplete from "./components/MapAutocomplete"; // Import MapAutocomplete component
import SearchHistory from "./components/SearchHistory"; // Import SearchHistory component
import { Container, CssBaseline, Typography } from "@mui/material"; // Import Material-UI components

function App() {
	return (
		<Provider store={store}>
			{/* Provide Redux store to app */}
			<CssBaseline /> {/* Apply Material-UI baseline styles */}
			<Container>
				{/* Center and constrain content */}
				<Typography variant="h4" component="h1" gutterBottom>
					{/* Heading */}
					React.JS Assessment: Google Maps Place Autocomplete
				</Typography>
				<MapAutocomplete /> {/* Autocomplete component */}
				<SearchHistory /> {/* Search history component */}
			</Container>
		</Provider>
	);
}

export default App; // Export App component
