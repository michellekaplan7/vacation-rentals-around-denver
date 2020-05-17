import React from "react";
import App from "./App";
// import Areas from "./Areas";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, getByDisplayValue } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("App", () => {
    // describe("Unit Tests", () => {
    //     it("should render the heading", () => {
    //         const router = (
    //             <BrowserRouter>
    //                 <App />
    //             </BrowserRouter>
    //         )
    //     })
    // })

    describe("Integration Tests", () => {
        it("should render Areas upon sign in from WelcomeForm", () =>  {
            

            const router = (
                <MemoryRouter initialEntries={["/"]}>
                    <App />
                </MemoryRouter>
            );
            const { getByRole, getByText, getByDisplayValue, getByPlaceholderText } = render(router);
            const signInLink = getByRole("button", {name: "Sign in"});
            const namePlaceholderText = getByPlaceholderText("Name");
            const emailPlaceholderText = getByPlaceholderText("Email");
            const purposeSelect = getByRole("option");
            

            expect(signInLink).toBeInTheDocument();
                console.log("purposeselect", purposeSelect)
            fireEvent.change(namePlaceholderText, {target: {value: "Elliot"}})
            fireEvent.change(emailPlaceholderText, {target: {value: "Elliot@gmail.com"}})
            fireEvent.change(purposeSelect, {target: {value: "business"}})

            fireEvent.click(signInLink);
            
            expect(getByText("Welcome Elliot")).toBeInTheDocument();
            expect(getByText("Your purpose for booking with us is: business")).toBeInTheDocument();
        });

    })
})
