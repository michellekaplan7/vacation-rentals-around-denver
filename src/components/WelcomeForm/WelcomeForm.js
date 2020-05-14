import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./WelcomeForm.css";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

class WelcomeForm extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			purpose: "",
			isLoggedIn: false,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSignIn = (event) => {
		event.preventDefault();
		this.setState({ isLoggedIn: true });
	};

	render() {
		if (this.state.isLoggedIn) {
			return <Redirect to="/areas" />;
		}

		return (
			<form onSubmit={(event) => this.handleSignIn(event)}>
				<h3 className="sign-in-title">Welcome to VRAD!</h3>
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
							required
						/>
					</label>
					<label>
						Please select your reason for visiting:
						<select
							name="purpose"
							value={this.state.purpose}
							onChange={(event) => this.handleChange(event)}
							required>
							<option value="">--Select reason--</option>
							<option value="business">Business</option>
							<option value="vacation">Vacation</option>
							<option value="other">Other</option>
						</select>
					</label>
					<button type="submit" className="sign-in-button">
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
