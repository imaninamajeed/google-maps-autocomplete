import { useSelector } from "react-redux"; // Import useSelector hook from react-redux to access Redux store
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"; // Import Material-UI components
import "../App.css";

const SearchHistory = () => {
	// Get search history from Redux store
	const history = useSelector((state) => state.search.history);

	return (
		<Box className="History-Box" sx={{ height: "200px", p: 2, top: 10 }}>
			{/* Title */}
			<Typography
				variant="h5"
				component="h1"
				align="center"
				fontFamily={"Poppins"}>
				Search History
			</Typography>

			{/* List of search history items */}
			<List>
				{history.map((place, index) => (
					<ListItem key={index} className="list-item">
						<ListItemText
							primary={<span className="place-name">{place.name}</span>}
							secondary={
								<span className="place-address">{place.formatted_address}</span>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default SearchHistory;
