import React from "react";
import "./Areas.css";
import PropTypes from "prop-types";

const Areas = (props) => {
	console.log(props);
	const areaNames = props.areas.map((area, i) => {
		return (
			<div key={i} className={`area ${area.name.split(" ").join("-")}`}>
				<h1>{area.name}</h1>
				<h2 className="nickname">{area.area}</h2>
				<h3 className="location">{area.location}</h3>
				<p>{area.about}</p>
				<button className="see-listings-button">
					See {area.area} Listings
				</button>
			</div>
		);
	});
	return <div className="areas">{areaNames}</div>;
};

export default Areas;
