import React, { Component } from "react";
import "./Listings.css";
import PropTypes from "prop-types";
import Listing from "../Listing/Listing";
import { Link } from "react-router-dom";
import { fetchListingDetails } from "../../apiCalls";

class Listings extends Component {
	state = {
		url: "https://vrad-api.herokuapp.com",
		listings: [],
	};

	componentDidMount() {
		if (this.props.listings && this.state.listings.length === 0) {
			fetchListingDetails(this.props.listings).then((listings) =>
				this.setState({ listings })
			);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.listings !== prevProps.listings) {
			fetchListingDetails(this.props.listings).then((listings) =>
				this.setState({ listings })
			);
		}
	}

	componentWillUnmount() {
		this.setState({ listings: null });
	}

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
