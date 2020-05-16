import React, { Component } from "react";
import "./Listings.css";
import PropTypes from "prop-types";
import Listing from "../Listing/Listing";
import { Link } from "react-router-dom";

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

	/* displayName = () => {
		console.log(props.name)
	} */

	componentDidUpdate(prevProps) {
		if (this.props.listings !== prevProps.listings) {
			this.fetchListingDetails(this.props.listings).then((listings) =>
				this.setState({ listings })
			);
		}
	}

	componentWillUnmount() {
		this.setState({ listings: null });
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
				<div>
					<Listing
						key={i}
						{...listing}
						areaId={this.props.id}
						selectListing={this.props.selectListing}
					/>
				</div>
			);
		});

		return (
			<div>
				<div className="listings">{listingCards}</div>
				<div className="bottom">
					<Link className="back-to-areas-button" to="/areas">
						Back to Areas
					</Link>
				</div>
			</div>
		);
	}
}

export default Listings;
