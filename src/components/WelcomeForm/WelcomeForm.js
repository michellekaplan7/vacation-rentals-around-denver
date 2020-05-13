import React, { Component } from "react";
import "./WelcomeForm.css";
// import PropTypes from "prop-types";

class WelcomeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      purpose: "",
      error: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    // !this.state.name.length || !this.state.email.length || !this.state.purpose.length

    //something maybe passing in props??
    // this.showErrorMessage()
    // this.clearInputs();
  };

  // clearInputs = () => {
  //   this.setState({ name: "", email: "", value: "" });
  // };

  // showErrorMessage = () => {
  //   return !this.state.email && <h4 className="sign-in-error">Please fill out all fields.</h4>
  // }

  render() {
    return (
      <form>
        <h3 className="sign-in-title">
          Welcome to VRAD!
        </h3>
        <div className="sign-in-items">
          <label>
            Please enter your name:
            <input
              type="text"
              placeholder="Name"
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
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
          </label>
          <label>
            Please select your reason for visiting:
            <select
              name="purpose"
              value={this.state.purpose}
              onChange={(event) => this.handleChange(event)}
            >
              <option value="">--Select reason--</option>
              <option value="business">Business</option>
              <option value="vacation">Vacation</option>
              <option value="other">Other</option>
            </select>
          </label>
          <button
            type="submit"
            className="sign-in-button"
            onClick={(event) => this.handleSignIn(event)}
          >
            Sign in
          </button>
        </div>
      </form>
    );
  }
}

// WelcomeForm.propTypes = {

// };

export default WelcomeForm;
