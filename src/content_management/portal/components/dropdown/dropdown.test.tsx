import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./dropdown";

describe("Dropdown", () => {
  const content = [
    {
      CATEGORY: "Category 1",
      NAME: "Item 1",
      ID: "1",
    },
    {
      CATEGORY: "Category 2",
      NAME: "Item 2",
      ID: "2",
    },
    {
      CATEGORY: "Category 2",
      NAME: "Item 3",
      ID: "3",
    },
  ];

  it("renders the dropdown with categories and items", () => {
    render(<Dropdown content={content} />);
    const category1 = screen.getByText("Category 1");
    const category2 = screen.getByText("Category 2");
    const item1 = screen.getByText("Item 1");
    const item2 = screen.getByText("Item 2");
    const item3 = screen.getByText("Item 3");

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it("renders the dropdown with the correct number of categories and items", () => {
    render(<Dropdown content={content} />);
    const categories = screen.getAllByRole("radio");
    const categoryTabs = screen.getAllByRole("tab");

    expect(categories.length).toBe(2);
    expect(categoryTabs.length).toBe(2);

    const category1Items = screen.getAllByText("Item 1");
    const category2Items = screen.getAllByText(/Item [23]/);

    expect(category1Items.length).toBe(1);
    expect(category2Items.length).toBe(2);
  });

  it("renders the dropdown with the correct content for each category", () => {
    render(<Dropdown content={content} />);
    const category1Tab = screen.getByText("Category 1");
    const category2Tab = screen.getByText("Category 2");
    const category1Content = screen.getByText("Item 1");
    const category2Content1 = screen.getByText("Item 2");
    const category2Content2 = screen.getByText("Item 3");

    userEvent.click(category1Tab);
    expect(category1Content).toBeInTheDocument();

    userEvent.click(category2Tab);
    expect(category2Content1).toBeInTheDocument();
    expect(category2Content2).toBeInTheDocument();
  });
});
