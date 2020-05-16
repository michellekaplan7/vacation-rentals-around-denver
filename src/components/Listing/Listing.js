import React from "react";
import "./Listing.css";
import { Link } from "react-router-dom";

const Listing = (props) => {
	const pic1 = `/images/${props.listing_id}_a.jpg`;
	// console.log(props.);
	return (
		<div className="listing">
			<h2 className="listing-name">{props.name}</h2>
			<img src={pic1} alt={props.name} />
			<h2 className="cost">{`$${props.cost_per_night} a night`}</h2>
			<Link
				className="listing-details-button"
				to={`areas/${props.areaId}/listings/3`}
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

export default Listing;
