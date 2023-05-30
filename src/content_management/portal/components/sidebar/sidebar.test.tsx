import React from "react";
import { render } from "@testing-library/react";
import Sidebar from "./sidebar";

describe("Sidebar component", () => {
  it("renders correctly", () => {
    const { container } = render(<Sidebar />);
    expect(container).toBeInTheDocument();
  });

  it("applies the expected styles", () => {
    const { getByTestId } = render(<Sidebar data-testid="sidebar" />);
    const sidebarElement = getByTestId("sidebar");
    expect(sidebarElement).toHaveStyle(`
      width: 300px;
      height: 100vh;
      background-color: #F2F2F2;
      position: fixed;
      padding-top: 110px;
      box-sizing: border-box;
      padding-left: 20px;
    `);
  });

  it("overrides background color when customColor prop is passed", () => {
    const { getByTestId } = render(<Sidebar data-testid="sidebar" customColor="#000000" />);
    const sidebarElement = getByTestId("sidebar");
    expect(sidebarElement).toHaveStyleRule("background-color", "#000000");
  });
});
