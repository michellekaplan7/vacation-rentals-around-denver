import React, { Component } from "react";
import "./Listings.css";
import PropTypes from "prop-types";
import Listing from "../Listing/Listing";

class Listings extends Component {
	state = {
		url: "https://vrad-api.herokuapp.com",
		listings: [],
	};

	componentDidMount() {
		if (this.props.listings && this.state.listings.length === 0) {
			this.fetchListingDetails(this.props.listings).then((listings) =>
				this.setState({ listings })
			);
		}
	}

	componentDidUpdate() {
		if (this.props.listings && this.state.listings.length === 0) {
			this.fetchListingDetails(this.props.listings).then((listings) =>
				this.setState({ listings })
			);
		}
	}

	fetchListingDetails = (listings) => {
		const promises = listings.map((listing) => {
			return fetch(this.state.url + listing)
				.then((response) => response.json())
				.then((info) => {
					return {
						listing_id: info.listing_id,
						name: info.name,
						address: `${info.address.street}, ${info.address.zip}`,
						superhost: info.details.superhost,
						beds: info.details.beds,
						baths: info.details.baths,
						cost_per_night: info.details.cost_per_night,
						features: info.details.features,
					};
				});
		});
		return Promise.all(promises);
	};

	render() {
		let listingCards = this.state.listings.map((listing, i) => {
			return (
				<Listing
					key={i}
					{...listing}
					areaId={this.props.id}
					selectListing={this.props.selectListing}
				/>
			);
		});

		return <div className="listings">{listingCards}</div>;
	}
}

export default Listings;
