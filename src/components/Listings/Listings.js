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

	componentDidMount = async () => {
		if (this.props.listings && this.state.listings.length === 0) {
			const listings = await fetchListingDetails(this.props.listings);

			this.setState({ listings });
		}
		if (this.props.favorites) {
			this.setState({ listings: this.props.favorites });
		}
	};

	componentDidUpdate = async (prevProps) => {
		if (this.props.listings !== prevProps.listings) {
			const listings = await fetchListingDetails(this.props.listings);
			this.setState({ listings });
		}
	};

	componentWillUnmount() {
		this.setState({ listings: null });
	}

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

Listings.propTypes = {
	about: PropTypes.string,
	area: PropTypes.string,
	details: PropTypes.string,
	id: PropTypes.number,
	listings: PropTypes.array,
	location: PropTypes.string,
	name: PropTypes.string,
	selectListing: PropTypes.func.isRequired,
	match: PropTypes.string.isRequired
  };

export default Listings;
