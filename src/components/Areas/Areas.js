import React from "react";
import "./Areas.css";
import PropTypes from "prop-types";

const Areas = (props) => {
	const areaNames = props.areas.map((area, i) => {
		return (
			<div key={i} className={`area ${area.name.split(" ").join("-")}`}>
				<h1>{area.area}</h1>
				<h1>{area.name}</h1>
			</div>
		);
	});
	return <div className="areas">{areaNames}</div>;
};

export default Areas;
