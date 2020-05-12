import React, { Component } from "react";
import "./WelcomeForm.css";
// import PropTypes from "prop-types";

class WelcomeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      value: "",
    };
  }

  handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }

  handleSignIn = (event) => {
      event.preventDefault();

      //something maybe passiing in props??
      this.clearInputs();
  };

  clearInputs = () => {
      this.setState({name: "", email: "", value: ""});
  };

  render() {
    return (
      <form>
        <h3>Welcome to VRAD! Please enter your information below to sign in.</h3>
        <label>
          Please enter your name:
          <input
            type="text"
            placeholder="Please enter your name"
            name="name"
            value={this.state.name}
            onChange={(event) => this.handleChange(event)}
            required
          />
        </label>
        <label>
          Please enter your email:
          <input
            type="email"
            placeholder="Please enter your email address"
            name="email"
            value={this.state.email}
            onChange={(event) => this.handleChange(event)}
            required
          />
        </label>
        <label>
          Please select your reason for visiting:
          <select
            name="value"
            value={this.state.value}
            onChange={(event) => this.handleChange(event)}
            required
          >
            <option value="">--Please select your reason for visiting</option>
            <option value="business">Business</option>
            <option value="vacation">Vacation</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button
            className="sign-in-button"
            onClick={(event) => this.handleSignIn(event)}
        >
            Sign in
        </button>
      </form>
    );
  }
}

// WelcomeForm.propTypes = {
    
// };

export default WelcomeForm;
