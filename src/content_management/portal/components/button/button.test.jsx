import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SButton, FButton } from "./Buttons";

describe("SButton", () => {
  it("renders correctly with custom color", () => {
    render(
      <SButton customColor="#ff0000" theme={{ button: { color: "#ffffff", background: "#000000" } }}>
        Click me
      </SButton>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveStyle("background-color: #ff0000");
  });

  it("renders correctly with default theme", () => {
    render(<SButton>Click me</SButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveStyle("background-color: #ffffff");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<SButton onClick={handleClick}>Click me</SButton>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("FButton", () => {
  it("renders correctly with default theme", () => {
    render(<FButton>Click me</FButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveStyle("background-color: #000000");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<FButton onClick={handleClick}>Click me</FButton>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
