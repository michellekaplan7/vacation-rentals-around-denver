import React from "react";
import Header from "./Header";
import { Router, BrowserRouter, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Header", () => {

  it("renders the correct information in the Header from the Welcome Form", () => {

    const { getByText } = render(
      <BrowserRouter>
        <Header
          userInfo={{
            name: "Michelle",
            purpose: "vacation",
          }}
        />
      </BrowserRouter>
    );

    const welcomeUserName = getByText("Welcome Michelle");
    const welcomeUserPurpose = getByText("Your purpose for booking with us is: vacation");

    expect(welcomeUserName).toBeInTheDocument();
    expect(welcomeUserPurpose).toBeInTheDocument();
  });

  it("goes back to the welcome form page when you click log out", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <BrowserRouter>
        <Header
          userInfo={{
            name: "Michelle",
            purpose: "vacation",
          }}
        />
      </BrowserRouter>
    );
    const signOutButton = getByText("Sign Out");

    expect(signOutButton).toBeInTheDocument();

    fireEvent.click(signOutButton)
    // expect(getByText("Please enter your name:")).toBeInTheDocument()
    expect(history.location.pathname).toBe('/');
  })

});


