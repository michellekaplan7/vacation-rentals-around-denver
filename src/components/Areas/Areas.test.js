import React from "react";
import Areas from "./Areas";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Areas", () => {
  const mockAreasData = [
    {
      area: "Rad Arvad",
      about: "Arvada is a rad little town just northwest of Denver.",
      id: 1,
      location: "Northwest of Downtown Denver",
      name: "Arvada",
    },
    {
      area: "Golden",
      about:
        "Golden is a city and former gold rush town at the foothills of the Rocky Mountains.",
      id: 2,
      location: "West of Downtown Denver",
      name: "Golden",
    },
  ];

  it("should render a list of areas ", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Areas areas={mockAreasData} />
      </Router>
    );

    const areaLocation1 = getByText("Northwest of Downtown Denver");
    const areaLocation2 = getByText("West of Downtown Denver");

    expect(areaLocation1).toBeInTheDocument();
    expect(areaLocation2).toBeInTheDocument();
  });
});
