import React from "react";
import { Link } from "react-router-dom";

const ListingDetails = (props) => {
	console.log(props);
	return (
		<Link to="/areas/:id/listings">
			<div>hi</div>
		</Link>
	);
};

export default ListingDetails;
