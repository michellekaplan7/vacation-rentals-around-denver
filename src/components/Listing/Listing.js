import React from "react";
import "./Listing.css";

const Listing = (props) => {
	const pic1 = `/images/${props.listing_id}_a.jpg`;

	return (
		<div className="listing">
			<h2 className="listing-name">{props.name}</h2>
			<img src={pic1} alt={props.name} />
			<h2 className="cost">{`$${props.cost_per_night} a night`}</h2>
		</div>
	);
};

export default Listing;
