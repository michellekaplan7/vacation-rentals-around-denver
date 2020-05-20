import React from "react";
import "./Listing.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Listing = (props) => {
	const pic1 = `/images/${props.listing_id}_a.jpg`;
	return (
		<div className="listing">
			<h2 className="listing-name">{props.name}</h2>
			<img src={pic1} alt={props.name} />
			<h2 className="cost">{`$${props.cost_per_night} a night`}</h2>
			<Link
				className="listing-details-button"
				to={`/areas/${props.areaId}/listings/${props.listing_id}`}
				onClick={(e) => {
					if (props) {
						props.selectListing(props);
					}
				}}>
				Location details
			</Link>
		</div>
	);
};

Listing.propTypes = {
	listing_id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	cost_per_night: PropTypes.number.isRequired,
	areaId: PropTypes.number.isRequired,
	selectListing: PropTypes.func.isRequired
  };

export default Listing;
