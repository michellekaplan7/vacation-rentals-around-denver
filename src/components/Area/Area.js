import React from "react";
import "./Area.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Area = ({ area, about, id, location, name }) => {
	return (
		<div className="area">
			<h1>{name}</h1>
			<h2 className="nickname">{area}</h2>
			<h3 className="location">{location}</h3>
			<p>{about}</p>
			<Link to={`areas/${id}/listings`} className="see-listings-button">
				See {area} Listings
			</Link>
		</div>
	);
};

Area.propTypes = {
	area: PropTypes.string.isRequired,  
	about: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	location: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
  };

export default Area;
