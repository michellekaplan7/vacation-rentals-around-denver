import React from "react";
import "./App.css";
import Areas from "../Areas/Areas";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<h1>Hello</h1>
			<Areas title="FUCK" />
		</div>
	);
}

export default App;
