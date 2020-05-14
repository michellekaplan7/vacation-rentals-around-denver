import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Areas from "../Areas/Areas";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import Listings from "../Listings/Listings";

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
					return Promise.resolve(
						this.fetchListingDetails(details.listings).then((response) => {
							return {
								area: area.area,
								details: area.details,
								id: 590,
								name: details.name,
								location: details.location,
								about: details.about,
								region_code: details.region_code,
								quick_search: details.quick_code,
								// listings: details.listings,
								listingInfo: response,
							};
						})
					);
				});
		});
		return Promise.all(promises);
	};

	fetchListingDetails = (listings) => {
		const promises = listings.map((listing) => {
			return fetch(this.state.url + listing)
				.then((response) => response.json())
				.then((info) => {
					return {
						url: listing,
						...info,
					};
				});
		});
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
					<Route
						path="areas/:id/listings/"
						render={({ match }) => (
							<Listings areas={this.state.areas[match.params.id]} />
						)}
					/>
				</Switch>
			</main>
		);
	}
}

export default App;
