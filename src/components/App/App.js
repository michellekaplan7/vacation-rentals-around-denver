import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { getAreas } from "../../apiCalls";
import "./App.css";

import Areas from "../Areas/Areas";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import Listings from "../Listings/Listings";
import ListingDetails from "../ListingDetails/ListingDetails";
import Header from "../Header/Header";

class App extends Component {
	state = {
		userInfo: {},
		url: "https://vrad-api.herokuapp.com",
		areas: [],
		selectedListing: {},
		favorites: [],
	};

	componentDidMount = async () => {
		const areas = await getAreas();
		this.setState({ areas });
	};

	selectListing = (selectedListing) => {
		this.setState({ selectedListing });
	};

	handleUserInfo = (userInfo) => {
		this.setState({ userInfo });
	};

	addToFavorites = (listing) => {
		this.setState = { favorites: [...this.state.favorites, listing] };
	};

	render() {
		return (
			<main className="app">
				<Switch>
					<Route
						path="/areas/:id/listings/:listingId"
						render={({ match }) => {
							return (
								<div>
									<Header userInfo={this.state.userInfo} />
									<ListingDetails {...this.state.selectedListing} />
								</div>
							);
						}}
					/>
					<Route
						path="/areas/:id/listings"
						render={({ match }) => {
							const areaId = Number(match.params.id);
							const selectedArea = this.state.areas.find(
								(area) => areaId === area.id
							);
							return (
								<div>
									<Header userInfo={this.state.userInfo} />
									<Listings
										match={match.params.id}
										{...selectedArea}
										selectListing={this.selectListing}
									/>
								</div>
							);
						}}
					/>
					<Route
						exact
						path="/areas"
						render={() => {
							return (
								<div>
									<Header userInfo={this.state.userInfo} />
									<Areas areas={this.state.areas} />
								</div>
							);
						}}
					/>
					<Route
						exact
						path="/"
						render={() => <WelcomeForm handleUserInfo={this.handleUserInfo} />}
					/>
				</Switch>
			</main>
		);
	}
}

export default App;
