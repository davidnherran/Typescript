import React from "react";
import Button from ".";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Button", () => {
  let component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Button onClick={mockHandler} className="test__aditional-class">
        Click!
      </Button>
    );
  });

  test("Must render the button", () => {
    expect(component.getByText("Click!")).toBeInTheDocument();
  });

  test("Must calls event handler once", () => {
    fireEvent.click(component.getByText("Click!"));

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test("Must have high specificity in CSS", () => {
    expect(component.getByText("Click!")).toHaveClass("cp");
  });

  test("Must receive text in the children prop", () => {
    expect(component.getByText("Click!")).toHaveTextContent("Click!");
  });
});
