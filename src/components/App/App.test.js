import React from "react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getAreas, fetchListingDetails } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockAreasData = [
	{
		about:
			"RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
		area: "RiNo",
		details: "/api/v1/areas/590",
		id: 590,
		listings: [
			"/api/v1/listings/3",
			"/api/v1/listings/44",
			"/api/v1/listings/221",
			"/api/v1/listings/744",
			"/api/v1/listings/90",
			"/api/v1/listings/310",
		],
		location: "North of Downtown Denver",
		name: "River North",
	},
	{
		about:
			"Park Hill features one of the best views of the downtown area and surrounding mountains. With easy access to City Park and the major highways, Park Hill also includes many unique styles of homes.",
		area: "Park Hill",
		details: "/api/v1/areas/751",
		id: 751,
		listings: [
			"/api/v1/listings/3921",
			"/api/v1/listings/56",
			"/api/v1/listings/21",
		],
		location: "East of Downtown Denver",
		name: "Park Hill",
	},
];

const mockListingsData = [
	{
		address: "2127 Clay St, 80207",
		baths: 3,
		beds: 2,
		cost_per_night: 185,
		features: [("spacious yard", "outdoor patio", "cool neighborhood")],
		listing_id: 3921,
		name: "Spacious New Build in Park Hill",
		superhost: false,
	},
	{
		address: "935 S Clarkson St, 80209",
		baths: 1,
		beds: 2,
		cost_per_night: 165,
		features: [("close to Wash Park", "cozy front porch")],
		listing_id: 56,
		name: "Updated Park Hill Duplex",
		superhost: true,
	},
];

fetchListingDetails.mockResolvedValue(mockListingsData);
getAreas.mockResolvedValue(mockAreasData);

describe("App", () => {
	getAreas.mockResolvedValue(mockAreasData);

	describe("Unit Tests", () => {
		it("should render the welcome form upon load", () => {
			const router = (
				<MemoryRouter initialEntries={["/"]}>
					<App />
				</MemoryRouter>
			);
			const { getByPlaceholderText } = render(router);
			const namePlaceholderText = getByPlaceholderText("Name");
			const emailPlaceholderText = getByPlaceholderText("Email");

			expect(namePlaceholderText).toBeInTheDocument();
			expect(emailPlaceholderText).toBeInTheDocument();
		});
	});

	describe("Integration Tests", () => {
		it("should render the user info in the Header", () => {
			const router = (
				<MemoryRouter initialEntries={["/"]}>
					<App />
				</MemoryRouter>
			);
			const { getByRole, getByText, getByPlaceholderText } = render(router);
			const signInLink = getByRole("button", { name: "Sign in" });
			const namePlaceholderText = getByPlaceholderText("Name");
			const emailPlaceholderText = getByPlaceholderText("Email");
			const purposeSelect = getByRole("combobox");

			expect(signInLink).toBeInTheDocument();

			fireEvent.change(namePlaceholderText, { target: { value: "Elliot" } });
			fireEvent.change(emailPlaceholderText, {
				target: { value: "Elliot@gmail.com" },
			});
			fireEvent.change(purposeSelect, { target: { value: "business" } });

			fireEvent.click(signInLink);

			expect(getByText("Welcome Elliot")).toBeInTheDocument();
			expect(
				getByText("Your purpose for booking with us is: business")
			).toBeInTheDocument();
		});

		it("should not render Areas if there is a field not filled out from WelcomeForm", () => {
			const router = (
				<MemoryRouter initialEntries={["/"]}>
					<App />
				</MemoryRouter>
			);
			const { getByRole, getByPlaceholderText } = render(router);
			const signInLink = getByRole("button", { name: "Sign in" });
			const namePlaceholderText = getByPlaceholderText("Name");
			const emailPlaceholderText = getByPlaceholderText("Email");
			const purposeSelect = getByRole("combobox");

			expect(signInLink).toBeInTheDocument();

			fireEvent.change(namePlaceholderText, { target: { value: "" } });
			fireEvent.change(emailPlaceholderText, {
				target: { value: "Elliot@gmail.com" },
			});
			fireEvent.change(purposeSelect, { target: { value: "business" } });

			fireEvent.click(signInLink);

			expect(namePlaceholderText).toBeInTheDocument();
		});

		it("should render the listings page for an area upon clicking the link on the card", async () => {
			const { getByText, debug } = render(
				<MemoryRouter initialEntries={["/", "/areas"]} initialIndex={1}>
					<App />
				</MemoryRouter>
			);

			const seeAreaListingsLink = await waitFor(() =>
				getByText("See Park Hill Listings")
			);

			expect(seeAreaListingsLink).toBeInTheDocument();

			fireEvent.click(seeAreaListingsLink);

			const listingName = await waitFor(() =>
				getByText("Spacious New Build in Park Hill")
			);

			expect(listingName).toBeInTheDocument();
		});

		it("should render the listings detail page when Location Details button is clicked", async () => {
			const { getByText, getAllByText, debug } = render(
				<MemoryRouter
					initialEntries={["/", "/areas", "/areas/590/listings"]}
					initialIndex={2}>
					<App />
				</MemoryRouter>
			);

			const listingName = await waitFor(() =>
				getByText("Spacious New Build in Park Hill")
			);

			expect(listingName).toBeInTheDocument();

			const locationDetailsBtn = getAllByText("Location details");

			fireEvent.click(locationDetailsBtn[0]);

			const featuresList = getByText("This property's features:", {
				exact: false,
			});
			expect(featuresList).toBeInTheDocument();

			debug();
		});
	});
});
