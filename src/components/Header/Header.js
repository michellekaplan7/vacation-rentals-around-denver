import React from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = (props) => {
  console.log(props);
  return (
    <nav>

      <div className="sign-out-link-container">
      <Link 
      className="sign-out-button"
      to='/'>
        Sign Out
      </Link>
      </div>
      {/* <div className = "welcome-info-container"> */}
      <h2 className="welcome">Welcome {props.userInfo.name}</h2>
      <h3 className="welcome-purpose">Your purpose for booking with us is: {props.userInfo.purpose}</h3>
      {/* </div> */}
    </nav>
  );
};

export default Header;
