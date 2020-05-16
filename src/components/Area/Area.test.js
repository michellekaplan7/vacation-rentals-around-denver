import React from "react";
import Area from "./Area";
import Listings from "../Listings/Listings";
import { Router } from "react-router-dom";
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

  it("displays correct information on the Area card", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Area {...mockAreaInfo} />
      </Router>
    );

    expect(getByText("Rad Arvad")).toBeInTheDocument();
    expect(
      getByText("Arvada is a rad little town just northwest of Denver.")
    ).toBeInTheDocument();
    expect(getByText("Northwest of Downtown Denver")).toBeInTheDocument();
    expect(getByText("Arvada")).toBeInTheDocument();
    expect(getByText("See Rad Arvad Listings")).toBeInTheDocument();

    fireEvent.click(getByText("See Rad Arvad Listings"));

    
});

// it("links to the listings page upon clicking the link", () => {
//     const mockListing = {
//         name: "Olde Town Loft",
//         img: "Olde Town Loft",
//         cost_per_night: "250 a night",
//     };
    
//     const history = createMemoryHistory();
//     const { getByText, getByAltText } = render(
//         <Router history={history}>
//         <Listings {...mockListing} />
//       </Router>
//     );

//     expect(getByText("Olde Town Loft")).toBeInTheDocument();
//     expect(getByAltText("Olde Town Loft")).toBeInTheDocument();
//   });
});
