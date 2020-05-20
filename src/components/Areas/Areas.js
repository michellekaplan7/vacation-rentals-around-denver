import React from "react";
import "./Areas.css";
import PropTypes from "prop-types";
import Area from "../Area/Area";

const Areas = (props) => {
	const areaCards = props.areas.map((area, i) => {
		return <Area key={i} {...area}></Area>;
	});
	return <div className="areas">{areaCards}</div>;
};

Areas.propTypes = {
	areas: PropTypes.array.isRequired,
  };

export default Areas;
