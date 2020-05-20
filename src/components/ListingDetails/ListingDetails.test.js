import React from "react";
import ListingDetails from "./ListingDetails";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Listing", () => {
  it("should render a Listing card", () => {
    const mockListingDetailsData = {
      listing_id: 3,
      name: "The Playboy Mansion",
      cost_per_night: 10000,
      areaId: 590,
      address: "123 Yo Mama's House",
      features: ["sex dungeon", "cocaine", "strippers"],
      beds: 14,
      baths: 1,
      superhost: false,
    };

    const router = (
      <MemoryRouter>
        <ListingDetails {...mockListingDetailsData} />
      </MemoryRouter>
    );

    const { getByText } = render(router);

    expect(getByText("sex dungeon", { exact: false })).toBeInTheDocument();
  });
});
