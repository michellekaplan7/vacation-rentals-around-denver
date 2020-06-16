import React from "react";
import Listing from "./Listing";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Listing", () => {
  it("should render a Listing card", () => {
    const mockSelectListing = jest.fn();
    const mockListingData = {
      listing_id: 3,
      name: "The White House",
      cost_per_night: 10000,
      areaId: 590,
    };

    const router = (
      <MemoryRouter>
        <Listing {...mockListingData} selectListing={mockSelectListing} />
      </MemoryRouter>
    );

    const { getByText } = render(router);

    expect(getByText("The White House")).toBeInTheDocument();
  });
});
