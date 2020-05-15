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
					return {
						area: area.area,
						details: area.details,
						id: details.id,
						name: details.name,
						location: details.location,
						about: details.about,
						listings: details.listings,
					};
				});
		});
		return Promise.all(promises);
	};

	render() {
		return (
			<main className="app">
				<Switch>
					{/* <Route path="areas/:id/listings/:id" render={() => <ListingDetails />} /> */}
					<Route
						path="/areas/:id/listings"
						render={({ match }) => {
							const areaId = Number(match.params.id);
							const selectedArea = this.state.areas.find(
								(area) => areaId === area.id
							);
							return <Listings match={match.params.id} {...selectedArea} />;
						}}
					/>
					<Route
						path="/areas"
						render={() => <Areas areas={this.state.areas} />}
					/>
					{/* <Route exact path="/" render={() => <WelcomeForm />} /> */}
				</Switch>
			</main>
		);
	}
}

export default App;
