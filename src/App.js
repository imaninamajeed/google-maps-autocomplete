// Import libraries and components
import { Provider } from "react-redux"; // Provides the Redux store to the rest of the app
import store from "./store"; // Redux store that holds the app's state
import MapAutocomplete from "./components/MapAutocomplete"; // Component for Google Maps autocomplete functionality
import SearchHistory from "./components/SearchHistory"; // Component for displaying search history
import { Grid, Typography } from "@mui/material"; // Material-UI components for UI styling
import "./App.css"; // Import custom CSS for styling

function App() {
	return (
		<div className="App">
			{/* Provide the Redux store to the rest of the app */}
			<Provider store={store}>
				{/* Grid container for layout, with spacing between items */}
				<Grid container spacing={2} columnSpacing={10}>
					{/* Grid item for the title */}
					<Grid item xs={12}>
						<Typography
							variant="h4"
							component="h1"
							gutterBottom
							align="center"
							fontFamily={"Poppins"}>
							React.JS Assessment
						</Typography>
					</Grid>
					{/* Grid item for the MapAutocomplete component, taking up 8 columns on medium screens and 12 columns on extra small screens */}
					<Grid item md={8} xs={12}>
						<MapAutocomplete /> {/* Autocomplete component */}
					</Grid>
					{/* Grid item for the SearchHistory component, taking up 4 columns on medium screens and 12 columns on extra small screens */}
					<Grid item md={4} xs={12}>
						<SearchHistory />
					</Grid>
				</Grid>
			</Provider>
		</div>
	);
}

export default App; // Export the App component
