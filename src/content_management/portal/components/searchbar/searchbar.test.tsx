import React from "react";
import Searchbar from "./searchbar";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../../assets/icons", () => ({
  searchIcon: "searchIcon",
}));

describe("Searchbar", () => {
  let component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(<Searchbar unfiltered={[]} filtered={mockHandler} />);
  });

  test("Must render the searchbar", () => {
    expect(
      component.getByPlaceholderText("Buscar contenido")
    ).toBeInTheDocument();
  });

  test("Must calls event handler once", () => {
    fireEvent.change(component.getByPlaceholderText("Buscar contenido"), {
      target: { value: "test" },
    });

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test("Must contain search icon", () => {
    expect(component.getByAltText("search-icon")).toBeInTheDocument();
  });
});
