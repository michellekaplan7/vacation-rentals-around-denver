import React from "react";
import WelcomeForm from "./WelcomeForm";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("WelcomeForm", () => {
  it("renders the correct information", () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <Router history={history}>
        <WelcomeForm />
      </Router>
    );

    const nameLabel = getByLabelText("Please enter your name:");
    const emailLabel = getByLabelText("Please enter your email:");
    const purposeLabel = getByLabelText(
      "Please select your reason for visiting:"
    );
    const namePlaceholderText = getByPlaceholderText("Name");
    const emailPlaceholderText = getByPlaceholderText("Email");
    const signInButtonText = getByText("Sign in");
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(purposeLabel).toBeInTheDocument();
    expect(namePlaceholderText).toBeInTheDocument();
    expect(emailPlaceholderText).toBeInTheDocument();
    expect(signInButtonText).toBeInTheDocument();

    fireEvent.click(getByText("Sign in"));
  });
});
