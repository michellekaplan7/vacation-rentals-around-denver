import React from "react";
import App from "./App";
// import Areas from "./Areas";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("App", () => {
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
		it("should render Areas upon sign in from WelcomeForm", () => {
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

		// it("should render the listings page for an area upon clicking the link on the card", () => {
		// const history = createMemoryHistory();
		// 	const { getByText } = render(
		// 		<MemoryRouter>
		// 			<Area {...mockAreaInfo} />
		// 		</MemoryRouter>
		// 	);

		// 	const seeAreaListingsLink = getByText("See Rad Arvad Listings");

		// 	expect(seeAreaListingsLink).toBeInTheDocument();

		// 	fireEvent.click(seeAreaListingsLink);

		// });
	});
});
