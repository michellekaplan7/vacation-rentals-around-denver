import React from "react";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import MdHeart from "react-ionicons/lib/MdHeart";
import "./ListingDetails.css";

const ListingDetails = ({
	name,
	address,
	areaId,
	baths,
	beds,
	cost_per_night,
	features,
	superhost,
	listing_id,
}) => {
	const pictures = [
		{ url: `/images/${listing_id}_a.jpg` },
		{ url: `/images/${listing_id}_b.jpg` },
		{ url: `/images/${listing_id}_c.jpg` },
	];

	const featuresList = features.map((feature, i) => {
		return `${feature}, `;
	});
	return (
		<div className="listing-detail">
			<h1 className="name">{name}</h1>
			<div className="pictures">
				<SimpleImageSlider width={600} height={400} images={pictures} />
			</div>
			<div className="listing-info">
				<h2 className="address">{address}</h2>
				<p>${cost_per_night} per night</p>
				<p className="features-list">
					This property's features: {featuresList}
					{beds} bed, and {baths} baths
				</p>
				<h3>{superhost && "Superhost!"}</h3>
			</div>
			<Link
				className="back-to-listings-button"
				to={`/areas/${areaId}/listings`}>
				Back to Listings
			</Link>
			<p className="favorites-button-label">Click to add to your Favorites</p>
			<MdHeart
				onClick={(e) => e.target.setAttribute("fill", "red")}
				fontSize="60px"
				color="grey"
				beat={true}
			/>
		</div>
	);
};

export default ListingDetails;
