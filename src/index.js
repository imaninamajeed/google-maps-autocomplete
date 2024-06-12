import React from "react"; // main library to build React components
import ReactDOM from "react-dom/client"; // render React components to the DOM
import "./index.css"; // styling
import App from "./App"; // main component of application
import reportWebVitals from "./reportWebVitals"; // to measure the application's performance
import "@fontsource/poppins"; // Defaults to weight 400

const root = ReactDOM.createRoot(document.getElementById("root")); // instruct React to use this app as root application

// render React elements into DOM; wrap component to catch prob, additional check and warning for its children;
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
