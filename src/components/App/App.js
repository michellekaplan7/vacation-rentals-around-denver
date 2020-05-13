import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Areas from "../Areas/Areas";
import WelcomeForm from "../WelcomeForm/WelcomeForm";

class App extends Component {
	state = {
		url: "https://vrad-api.herokuapp.com",
		areas: [],
	};

	componentDidMount() {
		fetch("https://vrad-api.herokuapp.com/api/v1/areas")
			.then((response) => response.json())
			.then((data) => this.fetchAreaDetails(data.areas))
			.then((areas) => this.setState({ areas }))
			.catch((err) => console.log(err));
	}

	fetchAreaDetails = (areaList) => {
		const promises = areaList.map((area) => {
			return fetch(this.state.url + area.details)
				.then((response) => response.json())
				.then((details) => {
					return {
						area: area.area,
						details: area.details,
						...details,
					};
				});
			// .then((data) => this.fetchListingDetails(data.listings))
			// .then((allInfo) => console.log(allInfo));
		});
		return Promise.all(promises);
	};

	// .then((details) => {
	// 	return {
	// 		area: area.area,
	// 		...details,
	// 	};
	// });

	fetchListingDetails = (listings) => {
		const promises = listings.map((listing) => {
			return fetch(this.state.url + listing)
				.then((response) => response.json())
				.catch((err) => console.log(err));
		});
		console.log(promises);
		return Promise.all(promises);
	};

	render() {
		console.log(this.state.areas);
		return (
			<main className="app">
				<Switch>
					<Route exact path="/" render={() => <WelcomeForm />} />
					<Route
						path="/areas"
						render={() => <Areas areas={this.state.areas} />}
					/>
				</Switch>
			</main>
		);
	}
}

export default App;
