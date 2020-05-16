import React from "react";
import App from "./App";
// import Areas from "./Areas";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
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
        it("should render Areas upon sign in from WelcomeForm", () => {
            const router = (
                <MemoryRouter initialEntries={["/"]}>
                    <App />
                </MemoryRouter>
            );
            const { getByRole } = render(router);
            const signInLink = getByRole("button", {name: "Sign in"});

            expect(signInLink).toBeInTheDocument();
        });

    })
})
