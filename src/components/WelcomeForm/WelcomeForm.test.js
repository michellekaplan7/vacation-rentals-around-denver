import React from "react";
import App from "../App/App"
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("WelcomeForm", () => {
  it("renders the correct information", () => {
    const router = (
      <MemoryRouter initialEntries={["/"]}>
          <App />
      </MemoryRouter>
  );
  const { getByText, getByLabelText, getByPlaceholderText } = render(router);

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
  });
});
