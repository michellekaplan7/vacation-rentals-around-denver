import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Areas from "../Areas/Areas";

class App extends Component {
	state = {
		url: "https://vrad-api.herokuapp.com",
		areas: null,
		listings: null,
	};

	componentDidMount() {
		fetch("https://vrad-api.herokuapp.com/api/v1/areas")
			.then((response) => response.json())
			.then((data) => this.fetchAreaDetails(data.areas))
			.then((areas) => this.setState({ areas }))
			// .then((data) => this.setState({ areas: data.areas }))
			.catch((err) => console.log(err));
	}

	fetchAreaDetails = (areaList) => {
		const promises = areaList.map((area) => {
			return fetch(this.state.url + area.details)
				.then((response) => response.json())
				.then((details) => {
					return {
						area: area.area,
						...details,
					};
				});
		});
		return Promise.all(promises);
	};

	updateState = (areasInfo) => {};

	// fetchListingDetails = (listings) => {
	// 	const promises = listings.map((listing) => {
	// 		return fetch(this.state.url + listing.details)
	// 			.then((response) => response.json())
	// 			.then(details);
	// 	});
	// };

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					{!this.state.areas ? (
						<h1>Loading...</h1>
					) : (
						<Areas areas={this.state.areas} />
					)}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
