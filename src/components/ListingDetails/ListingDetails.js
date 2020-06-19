import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import MdHeart from "react-ionicons/lib/MdHeart";
import MdHeartOutline from "react-ionicons/lib/MdHeartOutline";
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
  toggleFavorites,
  favoritesID,
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
        to={`/areas/${areaId}/listings`}
      >
        Back to Listings
      </Link>
      <p className="favorites-button-label">Click to add to your Favorites</p>
      {favoritesID.includes(listing_id) ? (
        <div data-testid={`fullStar-${listing_id}`}>
          <MdHeart
            color="red"
            fontSize="80px"
            onClick={() => toggleFavorites(listing_id)}
          />
        </div>
      ) : (
        <div data-testid={`emptyStar-${listing_id}`}>
          <MdHeartOutline
            color="red"
            fontSize="80px"
            onClick={() => toggleFavorites(listing_id)}
          />
        </div>
      )}
    </div>
  );
};

ListingDetails.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  areaId: PropTypes.number.isRequired,
  baths: PropTypes.number.isRequired,
  beds: PropTypes.number.isRequired,
  cost_per_night: PropTypes.number.isRequired,
  features: PropTypes.array.isRequired,
  superhost: PropTypes.bool.isRequired,
  listing_id: PropTypes.number.isRequired,
};

export default ListingDetails;
