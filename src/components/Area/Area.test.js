import React from "react";
import Area from "./Area";
import App from "../App/App";
import Listings from "../Listings/Listings";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, getByAltText } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Area", () => {
  const mockAreaInfo = {
    area: "Rad Arvad",
    about: "Arvada is a rad little town just northwest of Denver.",
    id: 1,
    location: "Northwest of Downtown Denver",
    name: "Arvada",
  };

  // const mockListing = {
  //           name: "Olde Town Loft",
  //           img: "Olde Town Loft",
  //           cost_per_night: "250 a night",
  //       };

  it("displays correct information on the Area card", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Area {...mockAreaInfo} />
      </Router>
    );

    expect(getByText("Rad Arvad")).toBeInTheDocument();
    expect(getByText("Arvada is a rad little town just northwest of Denver.")).toBeInTheDocument();
    expect(getByText("Northwest of Downtown Denver")).toBeInTheDocument();
    expect(getByText("Arvada")).toBeInTheDocument();
    expect(getByText("See Rad Arvad Listings")).toBeInTheDocument();
  });

  it("should render the listings page for an area upon clicking the link on the card", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Area {...mockAreaInfo} />
      </Router>
    );

    const seeAreaListingsLink = getByText("See Rad Arvad Listings");

    expect(seeAreaListingsLink).toBeInTheDocument();

    fireEvent.click(seeAreaListingsLink);

    expect(history.location.pathname).toBe('/areas/1/listings');
  });
});
