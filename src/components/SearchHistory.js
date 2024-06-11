import React from "react"; // Import React to use JSX and create components
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"; // Import Material-UI components

const SearchHistory = () => {
	// Define a functional component called SearchHistory
	const history = useSelector((state) => state.search.history); // Access the search history from the Redux store

	return (
		// Create a Box container with a margin-top of 2 units
		<Box mt={2}>
			{/* Display a heading */}
			<Typography variant="h6">Search History</Typography>
			{/* Create a List to display search history items */}
			<List>
				{history.map(
					(
						place,
						index // Loop over each item in the history array
					) => (
						// Create a ListItem for each place, using index as a unique key
						<ListItem key={index}>
							<ListItemText
								primary={place.name} // Set the primary text to the place's name
								secondary={place.formatted_address} // Set the secondary text to the place's address
							/>
						</ListItem>
					)
				)}
			</List>
		</Box>
	);
};

export default SearchHistory;
